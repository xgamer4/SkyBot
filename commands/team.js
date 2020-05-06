const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let roleToFind = args.join(" ");
    console.log(roleToFind)
    if (!message.guild) {
        return message.channel.send(`This command not available via PM.`)
    }
    let role = message.guild.roles.find(r => r.name.toLowerCase() === roleToFind.toLowerCase());
    if (role) {
        //console.log(role)
        //console.log(role.name)

        

        const member = message.member || guild.members.get(message.author.id);
        if (!member) return; // Check if the member isn't in the guild at all.

        if (["nupten", "liothan", "taulot", "kurumo"].includes(role.name.toLowerCase())) {
            // Get array of member's roles except TEAM roles.
            roles = member.roles.filter(r => !(["nupten", "liothan", "taulot", "kurumo"].includes(r.name.toLowerCase()))).array()
            // Add desired TEAM to array
            roles.push(role)
            // Apply array of roles to member
            member.setRoles(roles);
            return message.channel.send(`Welcome to team **${args.join(' ')}**.`);
        }
        else {
            return message.channel.send(`**${args.join(' ')}** is not a valid team.`);
        }
        
    }
    return message.channel.send(`Please select a **Team**. Example *"!team nupten"*`);
}

exports.config = {
    name: "team",
    aliases: ["t"]
}






