const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//* Data in request.body
// {
//   "email": "abiralrajbhandari75@hmail.com",
//   "name": "Abiral",
//   "password": "123"
// }

//* registerUser Middleware Function:
const registerUser = async (request, response) => {
  // 1. Get client data from request.body
  const email = request.body.email;
  const name = request.body.name;
  const password = request.body.password;

  // 2. Find & Check if user already exist in the database.
  // When you write User.findOne({email: email}), you are passing a complete, valid JavaScript object into the findOne function.
  // A key-value pair inside the object.
  const userExists = await User.findOne({ email: email }); // Syntax: { <field_in_schema>: <value_to_match> }
  if (userExists) {
    return response.status(409).json({ message: "User already exists." }); // We found a user. Respond immediately AND exit the function.
  } else {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({
        email: email,
        name: name,
        password: hashedPassword,
      });
      //   await newUser.save(); -> User.create() handles the creation and saving in one step.
      return response
        .status(201)
        .json({ message: "User registered successfully." });
    } catch (error) {
      console.error("Registration Error:", error); // Log the error for debugging purposes
      response
        .status(500)
        .json({ message: "Unable to register user, Please try again later." });
    }
  }
};

//* loginUser Middleware Function
const loginUser = async (request, response) => {
  // 1. Get client data from request.body by destructuring email and password.
  const { email, password } = request.body;

  // 2. Check if the email exist in the database.
  const user = await User.findOne({ email });
  if (!user) {
    return response.status(400).json({ message: "This email doesnot exist." }); // User is not in the database.
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

module.exports = {
  loginUser,
  registerUser,
};
