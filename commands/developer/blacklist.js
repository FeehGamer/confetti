function typ(type){
    if(type == "g"){
        return "Guild"
    }
    if(type == "u"){
        return "User"
    } else {
        return "Unknown"
    }
}
module.exports.run = async(bot,msg,args) =>{
        let c = require("../../colors.json")
        let db = require("quick.db")
        let Discord = require("discord.js")
        let embed = new Discord.MessageEmbed()
        if(args.length < 2){
            return msg.channel.send(`You need to define atleast two arguments!`)
        }else {
        let reason = args.slice(2).join(" ") || false
        let type = args[1]
        let id = args[0]
        
        let e = db.get(`blacklist.${id}.valid`)
        if(e){
            let ed = db.get(`blacklist.${id}.type`)
            let d
            let de
            if(ed == "g"){
                d = bot.guilds.cache.get(`${id}`)
                de = d.name
            } else {
                d = bot.users.cache.get(`${id}`)
                de = d.tag
            }
            db.set(`blacklist.${id}.valid`, false)
            embed
                .setColor("#ff0000")
                .setTitle("Removed from blacklist")
                .setDescription(`${typ(ed)} ${de} was removed from blacklist`)
            return msg.channel.send(embed)
                
        }
        let embed_msg = "ID **»** `" + id + "`\nType **»** `" + typ(type) + "`"
        if(reason !== false){
            embed_msg += "\nReason **»** `" + reason + "`" 
        }
        embed
            .setTitle("Added on blacklist")
            .setColor(c.green_light)
            .setDescription(embed_msg)
        db.set(`blacklist.${id}.valid`, true)
        db.set(`blacklist.${id}.type`, type)
        if(reason !== false){
            db.set(`blacklist.${id}.reason`, reason)
        }
        return msg.channel.send(embed)
        
    }


}
module.exports.conf = {
    name:"blacklist",
    aliases:["bl"],
    elevation: 3
}