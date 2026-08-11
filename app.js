const express = require("express");
require("./db.js");
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
