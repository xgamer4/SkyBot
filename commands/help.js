const Discord = require("discord.js");

exports.run = (client, message, args) => {

  const embed = new Discord.RichEmbed()
    .setColor(0xFFFF00)
    .setTitle("Bot Commands")

    .addField("!help", "Shows this list of Bot commands.")

    .addField("!card <power name>", "Shows the Power Card image.")

    .addField("!hero <hero name>", "Shows the Hero Card image.")
    .addField("!ult <hero name>", "Shows the Ultimate Card image for that hero.")

    .setFooter("SkyBot")

  message.channel.send({ embed });
}