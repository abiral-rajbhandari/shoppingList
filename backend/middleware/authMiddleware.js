const jwt = require("jsonwebtoken");

// Middleware to verify JWT token and protect routes
const verifyToken = (request, response, next) => {
  // Get token from request headers
  // Frontend sends: headers: { Authorization: "Bearer <token>" }
  const authHeader = request.headers.authorization;

  // Check if authorization header exists
  if (!authHeader) {
    return response.status(401).json({ message: "Access denied. No token provided." });
  }

  // Extract token from "Bearer <token>" format
  // Split by space and take the second part
  const token = authHeader.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "Access denied. Invalid token format." });
  }

  try {
    // Verify the token using the secret key
    // jwt.verify() decodes the token and checks if it's valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // request.userId is a variable we create
    // decoded.id comes from the payload we created during login: jwt.sign({ id: user._id }, ...)
    request.userId = decoded.id;
    
    // Call next() to pass control to the next middleware/route handler
    next();
  } catch (error) {
    // Token is invalid or expired
    return response.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
