const Discord = require("discord.js");

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

    // Basic embed visualization
    const embed = new Discord.RichEmbed()
        .setImage(result.heroCard.frontImage.low);

    if (client.faqByHeroes[result.id]) {
        client.faqByHeroes[result.id].forEach(qa => {
            const question = qa.title.replace(/<p>/g, "").replace(/<\/p>/g, "");
            const answer = qa.body.replace(/<p>/g, "").replace(/<\/p>/g, "");
            embed.addField(question, answer, false);
        });
    }

    message.channel.send({ embed });
    
    // TODO - Learn how RichEmbed works :S
}