const Discord = require("discord.js");

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

    // Basic embed visualization
    const embed = new Discord.RichEmbed()
        .setImage(result.frontImage.low);

    if (client.faqByOutsiders[result.id]) {
        client.faqByOutsiders[result.id].forEach(qa => {
            const question = qa.title.replace(/<p>/g, "").replace(/<\/p>/g, "");
            const answer = qa.body.replace(/<p>/g, "").replace(/<\/p>/g, "");
            embed.addField(question, answer, false);
        });
    }

    message.channel.send({ embed });
}