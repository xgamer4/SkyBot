const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let roleToFind = args.join(" ");
    console.log(roleToFind)
    let role = message.guild.roles.find(r => r.name.toLowerCase() === roleToFind.toLowerCase());
    if (role) {
        //console.log(role)
        //console.log(role.name)
        if (["nupten", "liothan", "taulot", "kurumo"].includes(role.name.toLowerCase())) {
            // Get array of member's roles except TEAM roles.
            roles = message.member.roles.filter(r => !(["nupten", "liothan", "taulot", "kurumo"].includes(r.name.toLowerCase()))).array()
            // Add desired TEAM to array
            roles.push(role)
            // Apply array of roles to member
            message.member.setRoles(roles);
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






