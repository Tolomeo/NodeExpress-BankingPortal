const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const accountData = fs.readFileSync(path.resolve("src/json", "accounts.json"), {
  encoding: "utf8",
});
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync(path.resolve("src/json", "users.json"), { encoding: "utf8" });
const users = JSON.parse(userData);

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

  const accountsJSON = JSON.stringify(accounts, null, 4);
  fs.writeFileSync(path.join(__dirname, "json", "accounts.json"), accountsJSON, 'utf8');

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

  const accountsJSON = JSON.stringify(accounts, null, 4);
  fs.writeFileSync(path.join(__dirname, "json", "accounts.json"), accountsJSON, 'utf8');

  res.render("payment", { message: "Payment Successful", account: accounts.credit });
});

app.listen(3000, (err) => {
  console.log("PS Project Running on port 3000!");
});
