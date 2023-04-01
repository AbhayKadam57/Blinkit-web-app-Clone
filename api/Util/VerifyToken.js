const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let authorize = req.headers.authorization;

  if (authorize) {
    const token = authorize.split(" ")[1];

    JWT.verify(token, process.env.JWT_SECERTE_KEY, (err, user) => {
      if (err) {
        return res.status(401).json("Invalid token...");
      }

      req.user = user;

      next();
    });
  } else {
    res.status(401).json("You are not authorize...");
  }
};

const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("You are not authorized..");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(401).json("You are not authorized..");
    }
  });
};

module.exports = { verifyTokenAndUser, verifyTokenAndAdmin };
