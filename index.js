// Load up the discord.js library
const Discord = require("discord.js");
// We also load the rest of the things we need in this file:
const Enmap = require("enmap");
const fs = require("fs");
const fetch = require('node-fetch');
const path = require("path");


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
if (!process.env.BOT_TOKEN)  process.env.BOT_TOKEN  = client.config.token;
if (!process.env.DEF_PREFIX) process.env.DEF_PREFIX = client.config.defaultSettings.prefix;
if (!process.env.URL_POWERS) process.env.URL_POWERS = client.config.URLs.powers;
if (!process.env.URL_HEROES) process.env.URL_HEROES = client.config.URLs.heroes;
if (!process.env.URL_FAQ) process.env.URL_FAQ = client.config.URLs.faq;
if (!process.env.URL_VICTORY) process.env.URL_VICTORY = client.config.URLs.victory;
if (!process.env.URL_OUTSIDERS) process.env.URL_OUTSIDERS = client.config.URLs.outsiders;
if (!process.env.URL_RULES) process.env.URL_RULES = client.config.URLs.rules;




// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.


const loadPowerCards = async () => {
  // Loads the Power Cards
  console.log(`\n### Attempting to load Power Cards`);
  const { data } = await fetch(process.env.URL_POWERS).then(response => response.json());
  client.powers = data;
};

const loadHeroes = async () => {
  // Loads the Heroes
  console.log(`\n### Attempting to load Heroes`);
  const { data } = await fetch(process.env.URL_HEROES).then(response => response.json());
  client.heroes = data;
  
  // Loads the Ultimates
  client.ultimates = new Array();
  data.forEach(element => {
    client.ultimates.push(element.ultimateCard);
  });
};

const loadFAQ = async () => {
  // Loads the FAQ
  console.log(`\n### Attempting to load FAQ`);
  const { data } = await fetch(process.env.URL_FAQ).then(response => response.json());
  client.faq = data;

  // Parse through FAQ to create indexes by Hero/Power/Victory/Outsider ID for easy references
  let indexByHeroes = {};
  let indexByPowerCards = {};
  let indexByVictoryCards = {};
  let indexByOutsiders = {};
  let indexByID = {};

  data.forEach(qa => {
    if (qa.relatedHeroes)
    {
      qa.relatedHeroes.forEach(h => {
        if (!indexByHeroes.hasOwnProperty(h))
        {
          indexByHeroes[h] = [];
        }
        indexByHeroes[h].push(qa);
      });
    }

    if (qa.relatedPowerCards)
    {
      qa.relatedPowerCards.forEach(p => {
        if (!indexByPowerCards.hasOwnProperty(p))
        {
          indexByPowerCards[p] = [];
        }
        indexByPowerCards[p].push(qa);
      });
    }

    if (qa.relatedVictoryCards)
    {
      qa.relatedVictoryCards.forEach(p => {
        if (!indexByVictoryCards.hasOwnProperty(p))
        {
          indexByVictoryCards[p] = [];
        }
        indexByVictoryCards[p].push(qa);
      });
    }

    if (qa.relatedOutsiders)
    {
      qa.relatedOutsiders.forEach(p => {
        if (!indexByOutsiders.hasOwnProperty(p))
        {
          indexByOutsiders[p] = [];
        }
        indexByOutsiders[p].push(qa);
      });
    }
  
    indexByID[qa.id] = qa
 
    
  });

  client.faqByHeroes = indexByHeroes;
  client.faqByPowerCards = indexByPowerCards;
  client.faqByVictoryCards = indexByVictoryCards;
  client.faqByOutsiders = indexByOutsiders;
  client.faqByID = indexByID;
}

const loadVictoryCards = async () => {
  // Loads the Victory Cards
  console.log(`\n### Attempting to load Victory Cards`);
  const { data } = await fetch(process.env.URL_VICTORY).then(response => response.json());
  client.victory = data;
};

const loadOutsiders = async () => {
  // Loads the Outsiders Cards
  console.log(`\n### Attempting to load Outsiders Cards`);
  const { data } = await fetch(process.env.URL_OUTSIDERS).then(response => response.json());
  client.outsiders = data;
};

const loadRules = async () => {
  // Loads the Rules
  console.log(`\n### Attempting to load Rules`);
  const { data } = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./rules.json"), 'utf8'));
  client.rules = data;
};



const init = async () => {

  // Loads Cards
  const restCalls = [
    loadPowerCards(),
    loadHeroes(),
    loadFAQ(),
    loadVictoryCards(),
    loadOutsiders(),
    loadRules()
  ];

  

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
  client.aliases = new Discord.Collection();

  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`# Attempting to load command ${commandName}`);
      client.commands.set(commandName, props);
      props.config.aliases.forEach(alias => {
        client.aliases.set(alias, props.config.name)
      })
    });
  });

  Promise.all(restCalls)
    .then(() => client.login(process.env.BOT_TOKEN))
    .catch(() => { 
      console.log("At least one REST call failed to populate. Closing bot."); 
      process.exit();
    });

 

  // Here we login the client.
  //client.login(process.env.BOT_TOKEN);

  // End top-level async/await function.

};

init();