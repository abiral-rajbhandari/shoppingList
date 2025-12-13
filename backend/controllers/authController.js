const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

//************** Data in request.body *******************//
// {
//   "email": "abiralrajbhandari75@hmail.com",
//   "name": "Abiral",
//   "password": "123"
// }

//***************************** registerUser Middleware Function: **********************************//
const registerUser = async (request, response) => {
  // 1. Get client data from request.body
  const email = request.body.email;
  const name = request.body.name;
  const password = request.body.password;

  // 2. Find & Check if user already exist in the database.
  // When you write User.findOne({email: email}), you are passing a complete, valid JavaScript object into the findOne function.
  // A key-value pair inside the object.
  const userExists = await User.findOne({ email: email }); // Syntax: { <field_in_schema>: <value_from_client> }
  if (userExists) {
    response.status(409).json({ message: "User already exists." }); // We found a user. Respond immediately AND exit the function.
    return; // Stop execution of this function.
  } else {
    try {
      const salt = await bcrypt.genSalt(10); //
      const hashedPassword = await bcrypt.hash(password, salt); //
      const verificationToken = crypto.randomBytes(32).toString("hex"); //
      const newUser = await User.create({
        // User is a database model name used to perform database operation.
        email: email, // <schema_key>: <value_from_client>
        name: name,
        password: hashedPassword,
        verificationToken: verificationToken, //
      });

      const verificationLink = `http://localhost:3000/api/auth/verify-email?token=${verificationToken}`; // onClicking this link it will route to /api/auth/verify-email,
      // On verify-email route verifyEmail middleware function will execute and verifies the user.
      await sendEmail(
        email,
        "Verify your email",
        `<h2> Email Verification </h2>
        <p> Please click the link below to verify your email: </p>
        <a href="${verificationLink}">${verificationLink}</a>
        `
      );
      //   await newUser.save(); -> User.create() handles the creation and saving in one step.
      response.status(201).json({
        message:
          "Registration successful. Please check your email to verify your account.",
      });
      return;
    } catch (error) {
      console.error("Registration Error:", error); // Log the error for debugging purposes
      response
        .status(500)
        .json({ message: "Unable to register user, Please try again later." });
    }
  }
};

//**************** loginUser Middleware Function: *********************//
const loginUser = async (request, response) => {
  // 1. Get client data from request.body by destructuring email and password.
  const { email, password } = request.body;

  // 2. Check if the email exist in the database.
  const user = await User.findOne({ email });
  if (!user) {
    response.status(400).json({ message: "User doesn't exist." }); // User is not in the database.
    return;
  } else if (!user.isVerified) {
    response
      .status(403)
      .json({ message: "Please verify your email. Check your inbox." });
    return;
  } else {
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      // 3. Check if the password matches with the email.
      if (!isMatch) {
        return response.status(400).json({ message: "Incorrect Password." });
      } else {
        // 4. Generate JWT for the user.
        // Json Web Token Generation Syntax: jwt.sign(payload, secretKey, options)
        // The payload is a JavaScript object that contains the data you want to securely store inside the token.
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "7d",
        });
        return response
          .status(200)
          .json({ token, message: "Login successful." });
      }
    } catch (error) {
      console.error("Login Error:", error);
      response
        .status(500)
        .json({ message: "Unable to login user, Please try again later." });
    }
  }
};

//****************** verifyEmail Middleware Function: ************************//
const verifyEmail = async (request, response) => {
  // req.query is a built-in Express.js object that contains the query parameters sent in the URL.
  // Query parameters are the part of the URL after the ? symbol, typically used to send small pieces of data via GET requests.
  // Get the token from query parameters (?token=...)
  const token = request.query.token;

  if (!token) {
    response.status(400).send("Verification token is missing.");
    return;
  } else {
    // Find user with matching verification token on database.
    // In a MongoDB query with Mongoose, inside the .findOne() method,
    // you pass an object where each key is a field name in your database schema,
    // and each value is the value you want to match.
    const user = await User.findOne({ verificationToken: token }); // <database_key>: <value_to_match>
    if (!user) {
      response.status(400).send("Invalid verification link.");
      return;
    } else {
      // User found update verification status which is set to false by default on database schema.
      user.isVerified = true;
      user.verificationToken = undefined; // clear token in database since it is used.
      await user.save(); // use await cause it takes time so other operation wouldnt get blocked
      // Send success response with link to login page
      response.send(`
        <h2>Email Verified Successfully!</h2>
        <p>You can now login.</p>
        <a href="http://localhost:5173/signin">Go to Login</a>
      `);
    }
  }
};

//************************ forgotPassword MiddlewareFunction: ********************//
const forgotPassword = async (request, response) => {
  // extract email from req.body: sent from forgot-password page from client
  const email = request.body.email;

  // we can access database fields using user
  // check if the user exist
  const user = await User.findOne({ email: email });
  if (!user) {
    response.status(404).json({ message: "User not found." });
    return;
  } else {
    // generate reset token and save on database.
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // create a password-reset link which is sent to user via sendEmail
    // it routes to reset-password page of frontend
    // it contains: token which is extracted using useSearchParams() hook 
    // token and newPassword is posted to backend /reset-password route
    // where resetPassword middleware function is executed
    // 
    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
    await sendEmail(
      email,
      "Reset your password",
      `<h2>Password Reset</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link expires in 15 minutes.</p>`
    );
    response.json({
      message: "Password reset link has been sent to your email.",
    });
  }
};

//********************** resetPassword MiddlewareFunction: *************************//
const resetPassword = async (request, response) => {
  // extracts token and new password send from client side req.body
  const { token, newPassword } = request.body;
  // Checks if the token matches or not
  const user = await User.findOne({
    resetPasswordToken: token, // <db_field_name>: <value_to_match>
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    response.status(400).json({ message: "Invalid token." });
    return;
  } else {
    // if token is matched
    // generate salt
    // add salt to newPassword and update it in database password field
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // clear token and save user newPassword in database
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // send success message
    response.json({
      message: "Password reset successful. You can now sign in.",
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
