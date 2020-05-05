const Helpers = require("../common/helpers.js");


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

    Helpers.sendEmbed_CardImage(message, result.frontImage.low)
        .then(Helpers.sendEmbed_CardFAQ(message, client.faqByPowerCards, result.id));
}

exports.config = {
    name: "card",
    aliases: ["c", "cards"]
}