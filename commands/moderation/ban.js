module.exports.run = async(bot,msg,args)=>{
    let Discord = require("discord.js")
    let db = require("quick.db")
    let {Mess} = require("../../functions/messages")
    let {checkIfInBans, makeid} = require("../../functions/util")

    if(args.length < 1){
        return msg.channel.send(new Mess("Usage: c.ban <user> [reason]", bot, null).errorMessage())
    }
    let mentioned = msg.guild.members.cache.get(args[0].replace("<@!", "").replace(">", ""))
    if(!mentioned){
        return msg.channel.send(new Mess("You have to mention someone!", bot, null).errorMessage())
    }
    if(msg.member.hasPermission("BAN_MEMBERS")){
    if(mentioned.hasPermission("BAN_MEMBERS" || "KICK_MEMBERS" || "ADMINISTRATOR" || "MANAGE_MESSAGES")){
        return msg.channel.send(new Mess("You can't ban this user!", bot, null).errorMessage())
    } else {
        try{
            let d = makeid(4);
            while(checkIfInBans(d)){
                d = makeid(4)
            }
            let reason = args.slice(1).join(" ") || null

            db.push(`cases.bans.${msg.guild.id}.${d}.user`, mentioned.id)
            db.push(`cases.bans.${msg.guild.id}.${d}.banner`, msg.author.id)
            db.push(`cases.bans.${msg.guild.id}.${d}.server`, msg.guild.id)
            db.push(`cases.bans.${msg.guild.id}.${d}.date`, Date.now())
            db.push(`cases.bans.${msg.guild.id}.${d}.reason`, reason)

            let embed = new Discord.MessageEmbed()
                .setTitle("YOU WERE BANNED ON " + msg.guild.name)
                .addField("Reason", reason || "Not Specified")
                .addField("Banned by", msg.author.tag)
                .setColor("RED")
                .setTimestamp(db.get(`cases.bans.${d}.date`))
            
            mentioned.send(embed)
            msg.channel.send(new Mess(`Successfully banned **${mentioned.user.tag}** (${mentioned.user.id})\nReason: ${reason || "Not specified"}`, bot, null).successMessage())
            mentioned.ban({reason: reason || "undefined"})
        } catch(e){
			console.log(e)
        }
    }
    } else {
        return msg.channel.send(new Mess("You need permission `BAN_MEMBERS`", bot, null).errorMessage())
    }


}
module.exports.conf = {
    name: "ban",
    argNeed: true,
}