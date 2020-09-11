const express = require("express");
const { accounts, writeJSON } = require("../data");

const router = express.Router();

router.get("/transfer", (req, res) => {
  res.render("transfer");
});

router.post("/transfer", (req, res) => {
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

router.get("/payment", (req, res) => {
  res.render("payment", { account: accounts.credit });
});

router.post("/payment", (req, res) => {
  let { amount } = req.body;

  amount = parseInt(amount);
  accounts.credit.balance -= amount;
  accounts.credit.available += amount;

  writeJSON();

  res.render("payment", { message: "Payment Successful", account: accounts.credit });
});

module.exports = router;