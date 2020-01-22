// Load up the discord.js library
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const fetch = require('node-fetch');


const client = new Discord.Client();
client.config = require("./config.json");
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix


// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.

const init = async () => {

  // Loads the Power Cards
  console.log(`\n### Attempting to load Power Cards`);
  const { data } = await fetch(process.env.URL_POWER_CARDS).then(response => response.json());
  client.powerCards = data;


  // Events
  console.log(`\n### Attempting to load Events`);
  fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });


  // Commands
  console.log(`\n### Attempting to load Commands`);
  client.commands = new Enmap();

  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`# Attempting to load command ${commandName}`);
      client.commands.set(commandName, props);
    });
  });


  // Here we login the client.
  client.login(process.env.BOT_TOKEN);

  // End top-level async/await function.
};

init();