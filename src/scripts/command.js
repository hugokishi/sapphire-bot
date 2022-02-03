const fs = require("fs");
const { join } = require("path");
const dir = "../commands/";

module.exports = (prefix) => {
  var commands = {};

  const scripts = fs.readdirSync(join(__dirname, "..", "commands"));
  scripts.forEach((script) => {
    commands[prefix + script.split(".")[0]] = require(dir + script);
  });

  return commands;
};
