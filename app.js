const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
require("dotenv").config();
app.use(bodyParser.json());
const routes = require("./routes");

app.use("/", routes);

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});
