const fs = require("fs");
const path = require("path");

const accountData = fs.readFileSync(path.resolve("src/json", "accounts.json"), {
  encoding: "utf8",
});
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(path.resolve("src/json", "users.json"), { encoding: "utf8" });
const users = JSON.parse(userData);

const writeJSON = () => {
  const accountsJSON = JSON.stringify(accounts, null, 4);
  fs.writeFileSync(path.join(__dirname, "json", "accounts.json"), accountsJSON, "utf8");
};

module.exports = {
  accounts,
  users,
  writeJSON,
};
