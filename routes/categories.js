const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategory);
router.post("/", categoryController.createCategory);
router.patch("/", categoryController.updateCategory);
router.delete("/", categoryController.deleteCategory);

module.exports = router;
