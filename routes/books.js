const express = require("express");
const router = express.Router();

const booksController = require("../controllers/booksController");

router.get("/", booksController.getAllBooks);

router.get("/:id", booksController.getBook);

router.post("/", booksController.createBook);

router.patch("/:id", booksController.updateBook);

router.delete("/:id", booksController.deleteBook);

module.exports = router;
