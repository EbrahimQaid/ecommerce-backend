const express = require("express");
require("./db.js");
const app = express();

app.use(express.json());
app.listen(3000, () => {
  console.log("worked on 3000");
});

module.exports = app;
