const Discord = require("discord.js");

exports.run = (client, message, args) => {
    // Extract the search string
    let stringToFind = args.join(" ");

    // Search the hero in the array
    var result = client.heroes.find(item => {
        return item.title.toLowerCase().includes(stringToFind.toLowerCase());
    })
	
	if (result != null) {
		// Basic embed visualization
        const embed = new Discord.RichEmbed()
            .setImage(result.heroCard.ultimateCard.frontImage.low);

        message.channel.send({ embed });
		
		return;
	}

	
    // Search the card in the ultimates
    result = client.ultimates.find(item => {
        return item.title.toLowerCase().includes(stringToFind.toLowerCase());
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