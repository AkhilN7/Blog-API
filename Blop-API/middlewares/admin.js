const jwt = require("jsonwebtoken");
const JWT_SECRET = "HARKIRAT SINGH";

function adminMiddleware(req, res, next) {
  let token = req.headers.authorization;
  let words = token.split(" ");
  const jwttoken = words[1];

  try {
    const decoded = jwt.verify(jwttoken, JWT_SECRET);
    if (decoded.username) {
      next();
    } else {
      res.status(403).json({
        msg: "Token invalid",
      });
    }
  } catch (err) {
    console.log(err);
    res.json("Invalid inputs");
  }
}

module.exports = adminMiddleware;
