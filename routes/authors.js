const express = require("express");
const router = express.Router();

const authorsController = require("../controllers/authorsController");

router.get("/", authorsController.getAllAuthors);

router.get("/:id", authorsController.getAuthorById);

router.post("/", authorsController.createAuthors);

router.patch("/:id", authorsController.updateAuthors);

router.delete("/:id", authorsController.deleteAuthors);

module.exports = router;
