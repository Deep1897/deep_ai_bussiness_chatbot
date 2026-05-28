require("dotenv").config();

const express = require("express");

const cors = require("cors");

const { connectDB, sequelize } = require("./config/db");

require("./models");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

/*
Routes
*/

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/chat", require("./routes/chatRoutes"));

app.use("/api/reports", require("./routes/reportRoutes"));

app.use("/api", require("./routes/tableRoutes"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Business Chatbot Running",
  });
});

const startServer = async () => {
  try {
    await sequelize.sync({
      alter: true,
    });

    console.log("Tables Synced");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
