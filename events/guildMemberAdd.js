const Discord = require("discord.js");

module.exports = (client, member) => {
    const embed = new Discord.RichEmbed()
    .setColor(0xFFFF00)
    .setTitle("Welcome to Skytear Discord!")
    .setDescription("I'm the bot of the Skytear Discord server. You can type !help to know all my commands to look up heroes, cards, and rules. When I'm not useful, just ask a human instead, unlike the typical MOBA community, we are all friendly here :)\n\n    Some useful links:")

    .addField("Create your account and get weekly email updates", "https://community.playskytear.com/join")

    .addField("**How to play on Tabletop Simulator for free**", "https://www.youtube.com/watch?v=RckZ-XYqn3w")

    .addField("**Facebook Group **", "https://www.facebook.com/groups/skytear")

    .addField("**FAQ  and Errata**", "https://community.playskytear.com/faq\n(feel free to ask clarifications in the #rules channel)")

    .addField("That's all for now, happy gaming!", "PS.\nDon't forget to join your favorite faction with the !team <faction> command.")

    .setFooter("SkyBot")

    //message.author.send({ embed });
    member.send({ embed });
};