const express = require("express");
const app = express();

const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// 設定路由
app.get("/", (req, res) => {
  res.send("hello world");
});

// 設定 express port 3000
app.listen(3000, () => {
  console.log(`App is running!`);
});
