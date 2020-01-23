// Load up the discord.js library
const Discord = require("discord.js");
// We also load the rest of the things we need in this file:
const Enmap = require("enmap");
const fs = require("fs");
const fetch = require('node-fetch');


// This is your client.
const client = new Discord.Client();

try {
// Here we load the config file that contains our token and our prefix values.
client.config = require("./config.js");
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix
// client.config.URLs contains the Skytear REST URLs
} catch(e) {
  console.log('config.js not defined, hope the config is pushed in process.env')
}

// Overrides the Process Env if necessary
if (!process.env.BOT_TOKEN) process.env.BOT_TOKEN = client.config.token;
if (!process.env.DEF_PREFIX) process.env.DEF_PREFIX = client.config.defaultSettings.prefix;
if (!process.env.URL_POWER_CARDS) process.env.URL_POWER_CARDS = client.config.URLs.powerCards;
if (!process.env.URL_HEROES) process.env.URL_HEROES = client.config.URLs.heroes;



// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.


const loadPowerCards = async () => {
  // Loads the Power Cards
  console.log(`\n### Attempting to load Power Cards`);
  const { data } = await fetch(process.env.URL_POWER_CARDS).then(response => response.json());
  client.powerCards = data;
};

const loadHeroes = async () => {
  // Loads the Heroes
  console.log(`\n### Attempting to load Heroes`);
  const { data } = await fetch(process.env.URL_HEROES).then(response => response.json());
  client.heroes = data;
};

const init = async () => {

  // Loads Cards
  loadPowerCards();
  loadHeroes();


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