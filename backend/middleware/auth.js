const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer")) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

const authorityOnly = (req, res, next) => {
  if (req.user && req.user.role === "authority") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Authority only." });
  }
};

module.exports = { protect, authorityOnly };
