module.exports.run = async(bot,msg,args)=>{
    let Discord = require("discord.js")
    let db = require("quick.db")
    let {Mess} = require("../../functions/messages")

    if(args.length < 1){
        return msg.channel.send(new Mess("Usage: c.kick <user> [reason]", bot, null).errorMessage())
    }
    let mentioned = msg.guild.members.cache.get(args[0].replace("<@!", "").replace(">", ""))
    if(!mentioned){
        return msg.channel.send(new Mess("You have to mention someone!", bot, null).errorMessage())
    }
    if(msg.member.hasPermission("KICK_MEMBERS")){
    if(mentioned.hasPermission("BAN_MEMBERS" || "KICK_MEMBERS" || "ADMINISTRATOR" || "MANAGE_MESSAGES")){
        return msg.channel.send(new Mess("You can't kick this user!", bot, null).errorMessage())
    } else {
        try{
            let reason = args.slice(1).join(" ") || null

            let embed = new Discord.MessageEmbed()
                .setTitle("YOU WERE KICKED ON " + msg.guild.name)
                .addField("Reason", reason || "Not Specified")
                .addField("Kicked by", msg.author.tag)
                .setColor("RED")
                .setTimestamp(Date.now())
            
            mentioned.send(embed)
            msg.channel.send(new Mess(`Successfully kicked **${mentioned.tag}**\nReason: ${reason || "Not Specified"}`, bot, null).successMessage())
            mentioned.kick({reason: reason || "undefined"})
        } catch(e){
			console.log(e)
        }
    }
    } else {
        return msg.channel.send(new Mess("You need permission `KICK_MEMBERS`", bot, null).errorMessage())
    }


}
module.exports.conf = {
    name: "kick",
    argNeed: true,
}