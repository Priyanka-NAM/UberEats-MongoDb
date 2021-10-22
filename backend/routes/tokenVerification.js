// /* eslint-disable dot-notation */
// const jwt = require("jsonwebtoken");

// const tokenKey = "jwtPrivateKey";

// const verifyToken = (req, res, next) => {
//   console.log("Request headers", req.headers);
//   const token =
//     req.body.token ||
//     req.query.token ||
//     req.headers["x-auth-token"] ||
//     req.headers.authorization;

//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const decoded = jwt.verify(token, tokenKey);
//     req.userDetails = decoded["_id"];
//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   return next();
// };

// module.exports = verifyToken;
