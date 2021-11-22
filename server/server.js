const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

//app
const app = express();

//db
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(`DB CONNEXION FAILED ${err}`));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10kb" }));
app.use(cors());

//routes middleware
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
