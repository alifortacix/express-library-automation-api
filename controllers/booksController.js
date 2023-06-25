const express = require("express");
const db = require("../database");

const createBook = async (req, res, next) => {
  try {
    const query =
      "INSERT INTO books (bookName, bookDescription, authorId, categoryId, numberOfPages) VALUES ($1, $2, $3, $4, $5) RETURNING id, bookName, bookDescription, authorId, categoryId, numberOfPages";
    const values = [
      req.body.bookName,
      req.body.bookDescription,
      req.body.authorId,
      req.body.categoryId,
      req.body.numberOfPages,
    ];
    const result = await db.query(query, values);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    console.error(
      "Kitap kaydı eklenirken bir hata oluştu. Hata mesajı : ",
      err.message
    );
    res.status(500).json({ error: "Kitap kaydı eklenirken bir hata oluştu." });
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    const query = "SELECT * FROM books";
    const result = await db.query(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(201).json({ message: "Hiç kitap yok." });
    }
  } catch (err) {
    console.error(
      "Kitap listeleme sırasında bir hata oluştu. Hata mesajı : ",
      err.message
    );
    res
      .status(500)
      .json({ error: "Kitap listeleme sırasında bir hata oluştu." });
  }
};

const getBook = async (req, res, next) => {
  try {
    const query = "SELECT * FROM books WHERE id = ' " + req.params.id + "'";
    const result = await db.query(query);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res.status(201).json({ message: "İlgili kitap bulunamadı." });
    }
  } catch (err) {
    console.error(
      "Kitap listelenirken bir hata oluştu. Hata mesajı : ",
      err.message
    );
    res.status(500).json({ error: "Kitap listelenirken bir hata oluştu." });
  }
};

const updateBook = async (req, res, next) => {
  try {
    const query =
      "UPDATE books SET bookName = $1, bookDescription = $2, categoryId = $3, authorId = $4, numberOfPages = $5 WHERE id = $6 RETURNING id,bookName, bookDescription,categoryId, authorId, numberOfPages";
    const values = [
      req.body.bookName,
      req.body.bookDescription,
      req.body.categoryId,
      req.body.authorId,
      req.body.numberOfPages,
      req.params.id,
    ];
    const result = await db.query(query, values);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    }
  } catch (err) {
    console.error(
      "Kitap güncelleme sırasıdna bir hata oluştu. Hata mesajı : ",
      err.message
    );
    res
      .status(500)
      .json({ error: "Kitap güncelleme sırasında bir hata oluştu." });
  }
};

const deleteBook = async function (req, res, next) {
  try {
    const query = "DELETE FROM books WHERE id = '" + req.params.id + "'";
    const result = await db.query(query);
    res.status(200).json({ message: "Başarılı bir şekilde veri silindi." });
  } catch (err) {
    console.error(
      "Kitap silinirken bir hata oluştu. Hata mesajı : ",
      err.message
    );
    res.status(500).json({
      error: "Kitap silinirken bir hata oluştu.",
    });
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
