const express = require("express");
const db = require("../database");

const getAllAuthors = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM authors");
    const updatedAuthors = result.rows.map((row) => {
      row.gender = row.gender == 0 ? "Kadın" : "Erkek";
      return row;
    });
    res.status(200).json(updatedAuthors);
  } catch (err) {
    console.error("veri çekme hatası :" + err);
    res.status(500).json({
      error: "veri çekerken beklenmeyen bir hata oluştu.",
    });
  }
};

const getAuthorById = async (req, res, next) => {
  try {
    const result = await db.query(
      "SELECT * FROM authors WHERE id = '" + id + "'"
    );
    const updatedAuthors = result.rows.map((row) => {
      row.gender = row.gender == 0 ? "Kadın" : "Erkek";
      return row;
    });
    res.status(200).json(updatedAuthors);
  } catch (err) {
    console.error("ilgili kullanıcıya erişirken bir hata oluştu. : ", err);
    res.status(500).json({
      error: "ilgili kullanıcıyı sorgulerken bir hata oluştu.",
    });
  }
};

const createAuthors = async (req, res, next) => {
  try {
    const { firstName, lastName, gender } = req.body;
    const result = await db.query(
      "INSERT INTO authors (firstname, lastname, gender) VALUES ($1, $2, $3) RETURNING id, firstname, lastname, gender",
      [firstName, lastName, gender]
    );

    const createdAuthor = result.rows[0];
    console.log(createdAuthor);
    res.status(200).json({ createdAuthor });
  } catch (err) {
    console.error("yazar oluşturulurken bir hata oluştu.", err);
    res.status(500).json({
      error: "yazar oluşturulurken beklenmedik bir hata oluştu",
    });
  }
};

const updateAuthors = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, gender } = req.body;
    const result = await db.query(
      "UPDATE authors SET firstname = $1, lastname = $2, gender = $3 WHERE id = $4 RETURNING id, firstname, lastname, gender",
      [firstName, lastName, gender, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("yazar güncelleme işlemi sırasında bir sorun oluştu. :", err);
    res.status(500).json({
      error: "Yazar güncelleme işlemi sırasında bir hata oluştu.",
    });
  }
};

const deleteAuthors = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query("DELETE FROM authors WHERE id = $1", [id]);
    res.status(200).json({ result: "success", affected_rows: result.row });
  } catch (err) {
    console.error("yazar silinirken bir hata oluştu.", err);
    res.status(500).json({ error: "yazar silinirken hata oluştu." });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthors,
  updateAuthors,
  deleteAuthors,
};
