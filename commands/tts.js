const Discord = require("discord.js");

exports.run = (client, message, args) => {

  const embed = new Discord.RichEmbed()
    .setColor(0xFFFF00)
    .setTitle("TTS (Tabletop Simulator) deck spawn instructions.")

    .addField("**Build a deck**", "Use the deckbuilder at www.playskytear.com.")

    .addField("**Export your deck**", "Under *More Actions* in the deckbuilder, select *Tabletop Simulator*")

    .addField("**Save deck**", "Save that file to:\n— Win: Documents / My Games / Tabletop Simulator / Saves / Saved Objects\n— Mac: Library / Tabletop Simulator / Saves / Saved Objects")

    .addField("**Spawn deck into TTS**", "While in a TTS game: Under *Objects/Saved Objects*, click on desired deck to spawn bag. (requires **Promote**)")

    .addField("**Move deck bag**", "Move the deck bag to your side of the table, and drop it on the picture next to the spawn button.")

    .addField("**Spawn deck components**", "Click the button to spawn deck. (keep area infront of board clear of other objects)")

    .setFooter("SkyBot")

  message.channel.send({ embed });
}

exports.config = {
  name: "tts",
  aliases: []
}