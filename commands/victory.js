const Discord = require("discord.js");

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

    // Basic embed visualization
    const embed = new Discord.RichEmbed()
        .setImage(result.frontImage.low);

    if (client.faqByVictoryCards[result.id]) {
        client.faqByVictoryCards[result.id].forEach(qa => {
            const question = qa.title.replace(/<p>/g, "").replace(/<\/p>/g, "");
            const answer = qa.body.replace(/<p>/g, "").replace(/<\/p>/g, "");
            embed.addField(question, answer, false);
        });
    }

    message.channel.send({ embed });
}