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
    console.error(
      "Yazarların listesini alırken beklenmedik bir hata oluştu. Hata mesajı :" +
        err
    );
    res.status(500).json({
      error: "Yazarların listesini alırken beklenmedik bir hata oluştu.",
    });
  }
};

const getAuthor = async (req, res, next) => {
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
    console.error(
      `${req.params.id}'ye sahip yazarın bilgilerini listelerken bir sorun oluştu.`,
      err.message
    );
    res.status(500).json({
      error: `${req.params.id}'ye sahip yazarın bilgilerini listelerken bir sorun oluştu.`,
    });
  }
};

const createAuthor = async (req, res, next) => {
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
    console.error(
      "Yazar veritabanına eklenirken beklenmedik bir hata oluştu. Hata mesajı :",
      err.message
    );
    res.status(500).json({
      error: "Yazar veritabanına eklenirken beklenmedik bir hata oluştu.",
    });
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, gender } = req.body;
    const result = await db.query(
      "UPDATE authors SET firstname = $1, lastname = $2, gender = $3 WHERE id = $4 RETURNING id, firstname, lastname, gender",
      [firstName, lastName, gender, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(
      "İlgili yazarı güncelleme işlemi sırasında bir hata oluştu. Hata mesajı : ",
      err
    );
    res.status(500).json({
      error: "İlgili yazarı güncelleme işlemi sırasında bir hata oluştu.",
    });
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query("DELETE FROM authors WHERE id = $1", [id]);
    res.status(200).json({ result: "success", affected_rows: result.row });
  } catch (err) {
    console.error(
      "Yazar veritabanından silinirken bir hata oluştu. Hata mesajı : ",
      err
    );
    res
      .status(500)
      .json({ error: "Yazar veritabanından silinirken bir hata oluştu." });
  }
};

module.exports = {
  getAllAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
