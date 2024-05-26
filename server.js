require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const database_connection = require("./database/database_connection");
const userRoutes = require("./routing/routers");
const morganLogger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// database connection
const db = database_connection.connect_database();

app.use(cors());
app.use(morganLogger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/", userRoutes); // Register API routes

app.listen(port, () => {
  console.log(`project is running on this  http://localhost:${port}`);
});
