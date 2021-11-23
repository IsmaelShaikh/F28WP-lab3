const express = require("express");
const session = require("express-session");

// Create app
const app = express();

// Send an HTTP response when receiving HTTP GET /
// Handling static HTML and EJS templates
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index"); // No need to include ejs extension
});

// Using encoded middleware w/ JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For unique session
app.use(
  session({
    secret: "cat cat cat",
    resave: true,
    saveUninitialized: true,
  })
);

// For shopping cart
app.get("/cart", (req, res) => {
  res.render("cart");
});

// For website contact
app.get("/contacts", (req, res) => {
  res.render("contacts");
});

// For website register
app.get("/register", (req, res) => {
  res.render("register");
});

// For website login
app.get("/login", (req, res) => {
  res.render("login");
});

// Middleware route
const router = require("./apis/routes");
app.use(router);

// Make the app listen on port
const port = process.argv[2] || process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Cart app listening at http://localhost:${port}`);
});
