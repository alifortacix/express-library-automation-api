const jwt = require("jsonwebtoken");
const db = require("../database");

const secretKey = process.env.SECRET_KEY;

const login = async (req, res, next) => {
  const { username, password } = req.body;
  let isLoggedIn = false;
  const query = `SELECT COUNT(*) FROM users WHERE username = $1 AND password = $2`;
  try {
    const result = await db.query(query, [username, password]);
    if (result.rows[0].count > 0) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
      res.status(500).json({ message: "Username or Password is not correct" });
    }

    if (isLoggedIn) {
      const token = jwt.sign({ userId: result.rows[0].id }, secretKey, {
        expiresIn: "5m",
      });

      res.status(200).json({ token });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const authorize = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token Yok!" });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.userID = decodedToken.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Geçersiz Token" });
  }
};

module.exports = {
  login,
  authorize,
};
