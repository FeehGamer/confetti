module.exports.run = async(bot,msg,args)=>{
    let Discord = require("discord.js")
    let db = require("quick.db")
    let usrcclr = db.get(`${msg.guild.id}.${msg.author.id}.levelbackground`) || "#23272A"
    let embed = new Discord.MessageEmbed()
        .setTitle("LEVEL BACKGROUND")
        .setColor(db.get(`${msg.guild.id}.${msg.author.id}.levelcolor`) || "#ffdd00")
        .setDescription(bot.lang.get(bot.language, "rank", "bgTypeMessage", {background:usrcclr}))
    if(args.length < 1){
        return msg.channel.send(embed)
    } else {
        embed
        .setColor(db.get(`${msg.guild.id}.${msg.author.id}.levelcolor`) || "#ffdd00")
        .setDescription(bot.lang.get(bot.language, "rank", "bgSuccess", {bg:args[0]}))
        db.set(`${msg.guild.id}.${msg.author.id}.levelbackground`, args[0])
        return msg.channel.send(embed)
    }
}
module.exports.conf = {
    name: "levelbg",
    aliases: ["rankbg", "levelbackground", "lbackground", "lbg", "rbg", "rankbackground", "lvlbg"],
    elevation: 0,
    guildOnly: true
}