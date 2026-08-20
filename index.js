require("dotenv").config();
const app = require("./app.js");
const connectDB = require("./db.js");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Failed to start the server:", error.message);
    process.exitCode = 1;
  });
}

module.exports = { app, startServer };
