const inquirer = require("inquirer");
const Enmap = require("enmap");
const fs = require("fs");

let baseConfig = fs.readFileSync("./config_base.txt", "utf8");

let prompts = [
  {
    type: "input",
    name: "token",
    message: "Please enter the bot token from the application page."
  },
  {
    type: "input",
    name: "URL_Powers",
    message: "Please enter the Power Cards REST URL"
  },
  {
    type: "input",
    name: "URL_Heroes",
    message: "Please enter the Heroes REST URL"
  },
];

(async function () {
  console.log("Setting Up SkyBot Configuration...");

  const answers = await inquirer.prompt(prompts);

  baseConfig = baseConfig
        .replace("{{token}}", `"${answers.token}"`)
        .replace("{{URL_Powers}}", `"${answers.URL_Powers}"`)
        .replace("{{URL_Heroes}}", `"${answers.URL_Heroes}"`);

  fs.writeFileSync("./config.js", baseConfig);
  console.log("REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!");
  console.log("Configuration has been written, enjoy!");
}());