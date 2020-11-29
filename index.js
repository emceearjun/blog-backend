const config = require("dotenv").config();
const WEB_PORT = process.env.PORT || process.env.WEB_PORT;
const connection = require("./models/connection");

const express = require("express");
const app = express();
const postsRoute = require("./routes/posts");

app.use(express.json());
app.use("/api/posts", postsRoute);
app.use(express.static('public'))

app.listen(WEB_PORT, () => {
  console.log(`Listening on port ${WEB_PORT}`);
});
