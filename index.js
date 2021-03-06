const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000);
