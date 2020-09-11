const fs = require("fs");
const path = require("path");
const express = require("express");
const { accounts, users, writeJSON } = require('./data');

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Account Summary", accounts });
});

app.get("/savings", (req, res) => {
  res.render("account", { account: accounts.savings });
});

app.get("/checking", (req, res) => {
  res.render("account", { account: accounts.checking });
});

app.get("/credit", (req, res) => {
  res.render("account", { account: accounts.credit });
});

app.get("/profile", (req, res) => {
  res.render("profile", { user: users[0] });
});

app.get("/transfer", (req, res) => {
  res.render("transfer");
});

app.post("/transfer", (req, res) => {
  const { from, to } = req.body;
  let { amount } = req.body;

  amount = parseInt(amount);
  accounts[from].prior_balance = accounts[from].balance;
  accounts[from].balance -= amount;
  accounts[to].prior_balance = accounts[to].balance;
  accounts[to].balance += amount;

  writeJSON();

  res.render("transfer", { message: "Transfer Completed" });
});

app.get("/payment", (req, res) => {
  res.render("payment", { account: accounts.credit });
});

app.post("/payment", (req, res) => {
  let { amount } = req.body;

  amount = parseInt(amount);
  accounts.credit.balance -= amount;
  accounts.credit.available += amount;

  writeJSON();

  res.render("payment", { message: "Payment Successful", account: accounts.credit });
});

app.listen(3000, (err) => {
  console.log("PS Project Running on port 3000!");
});
