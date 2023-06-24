const express = require("express");

const router = express.Router();

const authorsRoutes = require("./authors");

router.use("/authors", authorsRoutes);

module.exports = router;
