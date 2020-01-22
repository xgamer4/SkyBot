const Discord = require("discord.js");

exports.run = (client, message, args) => {
    // Extract the search string
    let cardToFind = args.join(" ");

    // Search the card in the array
    var result = client.powerCards.find(item => {
        return item.title.toLowerCase().includes(cardToFind.toLowerCase());
    })

    if (result == null) {
        // Error, card not found
        return message.channel.send(`No results found for **${args.join(' ')}**.`);
    }

    // Basic embed visualization
    const embed = new Discord.RichEmbed()
        .setImage(result.frontImage.low);

    message.channel.send({ embed });
}