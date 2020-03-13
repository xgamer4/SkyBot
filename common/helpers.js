const Discord = require("discord.js");

exports.sendEmbed_CardImage = function(message, cardUrl) {

    //const cardText = card.text.replace(/\[.\]/g, "");

    // Text visualization (for reference)
    //const embed = new Discord.RichEmbed()
    //    .setTitle(card.title)
    //    .setThumbnail(card.frontImage.low)
    //    .addField('**Type**', card.timing.substring(0, 1).toUpperCase() + card.timing.substring(1), true)
    //    .addField('**Modifier**', card.modifier, true)
    //    .addField('**Mana**', card.mana, true)
    //    .addField('**Text**', cardText);

    // Image visualization
    const embed = new Discord.RichEmbed()
        .setImage(cardUrl);

    return message.channel.send({ embed });
}

exports.sendEmbed_CardText = function(message, card) {

    const cardText = card.text.replace(/\[.\]/g, "");

    // Text visualization
    const embed = new Discord.RichEmbed()
        .setTitle(card.title)
        .setThumbnail(card.frontImage.low)
        .addField('**Type**', card.timing.substring(0, 1).toUpperCase() + card.timing.substring(1), true)
        .addField('**Modifier**', card.modifier, true)
        .addField('**Mana**', card.mana, true)
        .addField('**Text**', cardText);

    return message.channel.send({ embed });
}

exports.sendEmbed_CardFAQ = function(message, FAQs, cardId) {

    if (FAQs[cardId]) {

        const embed = new Discord.RichEmbed()
            .setTitle('FAQ')

        FAQs[cardId].forEach(qa => {
            const question = qa.title.replace(/<p>/g, "").replace(/<\/p>/g, "");
            const answer = qa.body.replace(/<p>/g, "").replace(/<\/p>/g, "");
            embed.addField(question, answer, false);
        });

        message.channel.send({ embed });
    }
}