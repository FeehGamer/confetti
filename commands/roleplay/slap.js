module.exports.run = async(bot,msg,args) =>{
    let Discord = require("discord.js")
    let db = require("quick.db")
    let nekoslife = "https://nekos.life/api/v2/img/"
    let axios = require("axios")
    let mentions = msg.mentions.users.first();
    let author = msg.author
    let c = require("../../colors.json")
    if(!mentions) return msg.channel.send(bot.lang.get(bot.language, "errors", "noMention"))
    let embed = new Discord.MessageEmbed()
    axios.get(nekoslife + "slap").then((response) =>{
        embed
        .setTitle("SLAP")
        .setDescription(bot.lang.get(bot.language, "roleplay", "slap", {user: author.tag,mentioned: mentions.tag}))
        .setImage(response.data.url)
        .setColor(c.gold)
    msg.channel.send(embed)
    })
        

}
module.exports.conf ={
    name: "slap",
    elevation: 0,
    argNeed: false
}