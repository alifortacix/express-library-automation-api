const express = require("express");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  port: 5432,
  database: "library",
});

const getAllAuthors = async (req, res, next) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM authors");
    client.release();

    res.json(result.rows);
  } catch (err) {
    console.error("veri çekme hatası :" + err);
    res.status(500).json({
      error: "veri çekerken beklenmeyen bir hata oluştu.",
    });
  }
};

const getAuthorById = async (req, res, next) => {
  try {
    const client = await pool.connect();
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM authors WHERE id = '" + id + "'"
    );
    client.release();
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("ilgili kullanıcıya erişirken bir hata oluştu. : ", err);
    res.status(500).json({
      error: "ilgili kullanıcıyı sorgulerken bir hata oluştu.",
    });
  }
};

const createAuthors = async (req, res, next) => {
  try {
    const client = await pool.connect();
    const { firstName, lastName, gender } = req.body;
    const result = await client.query(
      "INSERT INTO authors (firstname, lastname, gender) VALUES ($1, $2, $3)",
      [firstName, lastName, gender]
    );
    client.release();
    res.status(200).json({ result: "success", affected_rows: result.rowCount });
  } catch (err) {
    console.error("yazar oluşturulurken bir hata oluştu.", err);
    res.status(500).json({
      error: "yazar oluşturulurken beklenmedik bir hata oluştu",
    });
  }
};

const updateAuthors = async (req, res, next) => {
  try {
    const client = await pool.connect();
    const { id } = req.params;
    const { firstName, lastName, gender } = req.body;
    const result = await client.query(
      "UPDATE authors SET firstname = $1, lastname = $2, gender = $3 WHERE id = $4",
      [firstName, lastName, gender, id]
    );
    res.status(200).json(result.rowCount);
  } catch (err) {
    console.error("yazar güncelleme işlemi sırasında bir sorun oluştu. :", err);
    res.status(500).json({
      error: "Yazar güncelleme işlemi sırasında bir hata oluştu.",
    });
  }
};

const deleteAuthors = async (req, res, next) => {
  try {
    const client = await pool.connect();
    const { id } = req.params;
    const result = await client.query("DELETE FROM authors WHERE id = $1", [
      id,
    ]);
    client.release();
    res.status(200).json({ result: "success", affected_rows: result });
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
