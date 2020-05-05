const Discord = require("discord.js");
const Helpers = require("../common/helpers.js");


exports.run = (client, message, args) => {

    if(args.length == 0) {

        // Shows victory cards list
        let list = "";

        client.victory.forEach(item => {
            list = list + item.title + `\n`;
        });

        // Basic embed visualization
        const embed = new Discord.RichEmbed()
            .setColor(0xFFFF00).addField("Victory cards list", list, false);

        return message.channel.send({ embed });
    }


    // Extract the search string
    let victoryToFind = args.join(" ");

    // Search the victory in the array
    var result = client.victory.find(item => {
        return item.title.toLowerCase().includes(victoryToFind.toLowerCase());
    })

    if (result == null) {
        // Error, victory not found
        return message.channel.send(`No results found for **${args.join(' ')}**.`);
    }

    // Show Image and FAQ
    Helpers.sendEmbed_CardImage(message, result.frontImage.low)
        .then(Helpers.sendEmbed_CardFAQ(message, client.faqByVictoryCards, result.id));
}

exports.config = {
    name: "victory",
    aliases: ["v"]
}