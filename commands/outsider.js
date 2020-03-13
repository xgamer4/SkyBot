const Discord = require("discord.js");
const Helpers = require("../common/helpers.js");

exports.run = (client, message, args) => {

    if(args.length == 0) {

        // Shows outsider cards list
        let list = "";

        client.outsiders.forEach(item => {
            list = list + item.title + `\n`;
        });

        // Basic embed visualization
        const embed = new Discord.RichEmbed()
            .setColor(0xFFFF00).addField("Outsiders list", list, false);

        return message.channel.send({ embed });
    }


    // Extract the search string
    let outsiderToFind = args.join(" ");

    // Search the outsider in the array
    var result = client.outsiders.find(item => {
        return item.title.toLowerCase().includes(outsiderToFind.toLowerCase());
    })

    if (result == null) {
        // Error, outsider not found
        return message.channel.send(`No results found for **${args.join(' ')}**.`);
    }

    // Show Image and FAQ
    Helpers.sendEmbed_CardImage(message, result.frontImage.low)
        .then(Helpers.sendEmbed_CardFAQ(message, client.faqByOutsiders, result.id));
}