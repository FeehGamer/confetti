module.exports.run = async(bot,msg,args)=>{
    let Discord = require("discord.js")
    let db = require("quick.db")
    let usrclr = db.get(`${msg.guild.id}.${msg.author.id}.levelcolor`) || "#ffdd00"
    let embed = new Discord.MessageEmbed()
        .setTitle("PROGRESS BAR COLOR")
        .setColor(usrclr)
        .setDescription(bot.lang.get(bot.language, "rank", "barColorMessage", {color:args}))
    if(!args || args.length < 1){
        return msg.channel.send(embed)
    } else {
        db.set(`${msg.guild.id}.${msg.author.id}.levelcolor`, args)
        embed
            .setDescription(bot.lang.get(bot.language, "rank", "barColorSuccess", {color:args}))
            .setColor(args[0])
        msg.channel.send(embed)
    }
}
module.exports.conf = {
    name: "barcolor",
    aliases: ["bcolor"],
    elevation: 0,
    guildOnly: true
}