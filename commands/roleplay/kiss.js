module.exports.run = async(bot,msg,args) =>{
    let Discord = require("discord.js")
    let db = require("quick.db")
    let nekoslife = "https://nekos.life/api/v2/img/"
    let axios = require("axios")
    let mentions = msg.mentions.users.first();
    let author = msg.author
    let c = require("../../colors.json")
    if(!mentions) return msg.channel.send(bot.lang.get(bot.language, "errors", "noMention"))
    let kisses = db.get(`${msg.author.id}.kisses.${mentions.id}`) || 0
    let embed = new Discord.MessageEmbed()
    let firstKissEmbed = new Discord.MessageEmbed()
        .setTitle("ACHIEVEMENT UNLOCKED")
        .setColor(c.pink)
        .setDescription(`:tada: This is your first kiss with **${mentions.tag}** yaay :tada:`)
    if(kisses < 1){
        let adds = kisses + 1
        db.set(`${msg.author.id}.kisses.${mentions.id}`, adds)
        axios.get(nekoslife + "kiss").then((response) =>{
            embed
            .setTitle("KISS")
            .setDescription(bot.lang.get(bot.language, "roleplay", "kiss", {user: author.tag,mentioned: mentions.tag}))
            .setImage(response.data.url)
            .setFooter("That's 1 kiss!")
            .setColor(c.gold)
        msg.channel.send(embed)
        })
        return msg.channel.send(firstKissEmbed)
    }
    let adds = kisses + 1
    db.set(`${msg.author.id}.kisses.${mentions.id}`, adds)
    axios.get(nekoslife + "kiss").then((response) =>{
        embed
        .setTitle("KISS")
        .setDescription(bot.lang.get(bot.language, "roleplay", "kiss", {user: author.tag,mentioned: mentions.tag}))
        .setFooter(`That's ${adds} kisses!`)
        .setImage(response.data.url)
        .setColor(c.gold)
    msg.channel.send(embed)
    })
        

}
module.exports.conf ={
    name: "kiss",
    elevation: 0,
    argNeed: false
}