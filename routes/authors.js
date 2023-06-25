const express = require("express");
const router = express.Router();

const authorsController = require("../controllers/authorsController");

router.get("/", authorsController.getAllAuthors);

router.get("/:id", authorsController.getAuthor);

router.post("/", authorsController.createAuthor);

router.patch("/:id", authorsController.updateAuthor);

router.delete("/:id", authorsController.deleteAuthor);

module.exports = router;
