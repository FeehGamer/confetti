module.exports.run = async(bot,msg,args)=>{
    let Discord = require("discord.js")
    let db = require("quick.db")
    let {Mess} = require("../../functions/messages")
    let {checkIfInWarns, makeid} = require("../../functions/util")

    if(args.length < 1){
        return msg.channel.send(new Mess("Usage: c.warn <user> [reason]", bot, null).errorMessage())
    }
    let mentioned = msg.guild.members.cache.get(args[0].replace("<@!", "").replace(">", ""))
    if(!mentioned){
        return msg.channel.send(new Mess("You have to mention someone!", bot, null).errorMessage())
    }
    if(msg.member.hasPermission("MANAGE_MESSAGES")){
    if(mentioned.hasPermission("BAN_MEMBERS" || "KICK_MEMBERS" || "ADMINISTRATOR" || "MANAGE_MESSAGES")){
        return msg.channel.send(new Mess("You can't warn this user!", bot, null).errorMessage())
    } else {
        try{
            let d = makeid(4);
            while(checkIfInWarns(d)){
                d = makeid(4)
            }
            let reason = args.slice(1).join(" ") || null

            db.push(`cases.warns.${msg.guild.id}.${d}.user`, mentioned.id)
            db.push(`cases.warns.${msg.guild.id}.${d}.warner`, msg.author.id)
            db.push(`cases.warns.${msg.guild.id}.${d}.server`, msg.guild.id)
            db.push(`cases.warns.${msg.guild.id}.${d}.date`, Date.now())
            db.push(`cases.warns.${msg.guild.id}.${d}.reason`, reason)

            let embed = new Discord.MessageEmbed()
                .setTitle("YOU WERE WARNED ON " + msg.guild.name)
                .addField("Reason", reason || "Not Specified")
                .addField("Warned by", msg.author.tag)
                .setColor("RED")
                .setTimestamp(db.get(`cases.warns.${d}.date`))
            
            mentioned.send(embed)
            mentioned = mentioned.user
            msg.channel.send(new Mess(`Successfully warned **${mentioned.tag}** (${mentioned.id})\nReason: ${reason || "Not Specified"}`, bot, null).successMessage())
        } catch(e){
			console.log(e)
        }
    }
    } else {
        return msg.channel.send(new Mess("You need permission `MANAGE_MESSAGES`", bot, null).errorMessage())
    }


}
module.exports.conf = {
    name: "warn",
    argNeed: true,
}