const Helpers = require("../common/helpers.js");


exports.run = (client, message, args) => {
    // Extract the search string
    let stringToFind = args.join(" ");

    // Search the hero in the array
    var result = client.heroes.find(item => {
        return item.title.toLowerCase().includes(stringToFind.toLowerCase());
    })
	
	if (result != null) {

        // Show Image and FAQ
        Helpers.sendEmbed_CardImage(message, result.ultimateCard.frontImage.low)
            .then(Helpers.sendEmbed_CardFAQ(message, client.faqByPowerCards, result.ultimateCard.id));

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

    // Show Image and FAQ
    Helpers.sendEmbed_CardImage(message, result.frontImage.low)
        .then(Helpers.sendEmbed_CardFAQ(message, client.faqByPowerCards, result.id));
}