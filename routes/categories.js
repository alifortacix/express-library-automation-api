const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoriesController");

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategory);
router.post("/", categoryController.createCategory);
router.patch("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
