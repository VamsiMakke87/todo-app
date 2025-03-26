const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({
          message: "Access Denied!, no token provided!",
          isSuccessMessage: false,
        });
    }
    token= token.substring(7);

    try {
      const validToken = jwt.verify(token, process.env.JWT_SECRET);
      res.user = validToken;
      next();
    } catch (err) {
      res
        .status(403)
        .json({
          message: "Invalid or expired token! Please login again",
          isSuccessMessage: false,
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error! Please try again later!",
      isSuccessMessage: false,
    });
  }
};

module.exports = authJWT;
