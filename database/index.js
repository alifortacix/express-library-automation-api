const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "",
  host: "localhost",
  port: 5432,
  database: "library",
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
