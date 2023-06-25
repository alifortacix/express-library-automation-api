const express = require("express");
const db = require("../database");

const getAllCategories = async (req, res, next) => {
  try {
    const query = "SELECT * FROM categories";
    const result = await db.query(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(200).json({ message: "Hiç kategori bulunamadı." });
    }
  } catch (err) {
    console.error(
      "Kategoriler listelenirken beklenmeyen bir hata oluştu. Hata mesajı: ",
      err.message
    );
    res.status(500).json({ message: err.message });
  }
};

const getCategory = async (req, res, next) => {
  try {
    query = "SELECT * FROM categories WHERE id = '" + req.params.id + "'";
    const result = await db.query(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(200).json({ message: "No category found" });
    }
  } catch (err) {
    console.error(
      "Kategori verileri listelenirken beklenmedik bir hata oluştu. Hata mesajı :",
      err.message
    );
    res
      .status(500)
      .json({ message: "Kategori verileri listelenirken bir hata oluştu." });
  }
};

const createCategory = async (req, res, newt) => {
  try {
    const query =
      "INSERT INTO categories (categoryName, categoryDescription) VALUES ($1, $2) RETURNING id, categoryName, categoryDescription";
    const result = await db.query(query, [
      req.body.categoryName,
      req.body.categoryDescription,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(500).json({ message: "Kategori oluşturulurken hata oluştu." });
    }
  } catch (err) {
    console.error("Kategori eklenirken bir hata oluştu. : ", err.message);
    res.status(500).send(err.message);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const query =
      "UPDATE categories SET categoryName = $1, categoryDescription = $2 WHERE id = $3 RETURNING id, categoryName, categoryDescription";
    const result = await db.query(query, [
      req.body.categoryName,
      req.body.categoryDescription,
      req.params.id,
    ]);
    if (result.rowCount > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(500).json({
        message: "Düzenleme sırasında beklenmeyen bir hata ile karşılaşıldı.",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const query =
      "DELETE FROM categories WHERE id = ' " + req.params.id + " ' ";
    const result = db.query(query);
    res.status(200).json({ message: `${req.body.id} ID li kategori silindi.` });
  } catch (err) {
    console.error(
      "Kategori oluşturulurken bir hata ile karşılaşıldı. : ",
      err.message
    );
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
