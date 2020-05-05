const Helpers = require("../common/helpers.js");


exports.run = (client, message, args) => {
    // Extract the search string
    let heroToFind = args.join(" ");

    // Search the hero in the array
    var result = client.heroes.find(item => {
        return item.title.toLowerCase().includes(heroToFind.toLowerCase());
    })

    if (result == null) {
        // Error, hero not found
        return message.channel.send(`No results found for **${args.join(' ')}**.`);
    }

    // Show Image and FAQ
    Helpers.sendEmbed_CardImage(message, result.heroCard.frontImage.low)
        .then(Helpers.sendEmbed_CardFAQ(message, client.faqByHeroes, result.id));
}

exports.config = {
    name: "hero",
    aliases: ["h", "heroes"]
}