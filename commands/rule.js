const Helpers = require("../common/helpers.js");
const Discord = require("discord.js");
const fs = require("fs");

exports.run = (client, message, args) => {
    // Extract the search string
    let ruleToFind = args.join(" ");


    if(args.length == 0) {

        // Shows victory cards list
        let list = "";

        client.rules.forEach(item => {
            list = list + item.rule_name.toUpperCase() + `\n`;
        });

        // Basic embed visualization
        const embed = new Discord.RichEmbed()
            .setColor(0xFFFF00).addField("Rule list", list, false);

        return message.channel.send({ embed });
    }
    
    // Search the card in the powers
    var result = client.rules.find(item => {
        return item.rule_name.toLowerCase().includes(ruleToFind.toLowerCase());
    })
	
    if (result == null) {
        // Error, card not found
        return message.channel.send(`No results found for **${args.join(' ')}**.`);
    }

    const embed = new Discord.RichEmbed()
    .setColor(0xFFFF00)
    .setTitle(result.rule_name.toUpperCase())

    .setDescription(result.rule_text)

    .setFooter("SkyBot")

  message.channel.send({ embed });
}