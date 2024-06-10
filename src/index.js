const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*",
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);
mongoose
  .connect(`${process.env.Mongo_DB}`)
  .then(() => {
    console.log("Connect db success");
  })
  .catch((err) => {
    console.log("Connect db that bai");
    console.log(err);
  });

app.listen(port, () => {
  console.log("Server port: localhost:" + port);
});
