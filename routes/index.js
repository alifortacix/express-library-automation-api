const express = require("express");

const router = express.Router();
const authController = require("../controllers/authController");
const authorsRoutes = require("./authors");
const categoriesRoutes = require("./categories");
const authRoutes = require("./authentication");

router.use("/authors", authController.authorize, authorsRoutes);
router.use("/categories", authController.authorize, categoriesRoutes);
router.use("/auth", authRoutes);

module.exports = router;
