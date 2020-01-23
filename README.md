# SkyBot
Skytear Discord Bot

### Usage
First time only:
- Run `npm install`
- Run `node setup.js` to generate a proper configuration file and settings.

To start the Bot:
- `node index.js`

### Config
`setup.js` generates the needed configuration file (`config.js`). It will contain:
- `token` - Discord Bot token
- `prefix` - Message Prefix to activate the Bot
- `URLs` - Skytear JSON Rest URLs

### Known Issues
- `Discord.js` SKD not working under HTTP proxy.
