const Discord = require("discord.js");

exports.run = (client, message, args) => {
    // Extract the search string
    let cardToFind = args.join(" ");

    // Search the card in the powers
    var result = client.powers.find(item => {
        return item.title.toLowerCase().includes(cardToFind.toLowerCase());
    })
	
	if (result == null) {
        // Search the card in the ultimates
        result = client.ultimates.find(item => {
          return item.title.toLowerCase().includes(cardToFind.toLowerCase());
      })
    }

    if (result == null) {
        // Error, card not found
        return message.channel.send(`No results found for **${args.join(' ')}**.`);
    }

    // Basic embed visualization
    const embed = new Discord.RichEmbed()
        .setImage(result.frontImage.low);
        

    if (client.faqByPowerCards[result.id]) {
        client.faqByPowerCards[result.id].forEach(qa => {
            const question = qa.title.replace(/<p>/g, "").replace(/<\/p>/g, "");
            const answer = qa.body.replace(/<p>/g, "").replace(/<\/p>/g, "");
            embed.addField(question, answer, false);
        });
    }



    message.channel.send({ embed });
}