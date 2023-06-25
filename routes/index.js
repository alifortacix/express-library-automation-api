const express = require("express");

const router = express.Router();

const authorsRoutes = require("./authors");
const categoriesRoutes = require("./categories");

router.use("/authors", authorsRoutes);
router.use("/categories", categoriesRoutes);

module.exports = router;
