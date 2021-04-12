module.exports.run = async(bot,msg,args) =>{
    let Discord = require("discord.js")
    let db = require("quick.db")
    let nekoslife = "https://nekos.life/api/v2/img/"
    let axios = require("axios")
    let mentions = msg.mentions.users.first();
    let author = msg.author
    let c = require("../../colors.json")
    if(!mentions) return msg.channel.send(bot.lang.get(bot.language, "errors", "noMention"))
    let pats = db.get(`${msg.author.id}.pats.${mentions.id}`) || 0
    let embed = new Discord.MessageEmbed()
    let firstPatEmbed = new Discord.MessageEmbed()
        .setTitle("ACHIEVEMENT UNLOCKED")
        .setColor(c.pink)
        .setDescription(`:tada: This is your first pat with **${mentions.tag}** yaay :tada:`)
    if(pats < 1){
        let adds = pats + 1
        db.set(`${msg.author.id}.pats.${mentions.id}`, adds)
        axios.get(nekoslife + "pat").then((response) =>{
            embed
            .setTitle("PAT")
            .setDescription(bot.lang.get(bot.language, "roleplay", "pat", {user: author.tag,mentioned: mentions.tag}))
            .setImage(response.data.url)
            .setFooter("That's 1 pat!")
            .setColor(c.gold)
        msg.channel.send(embed)
        })
        return msg.channel.send(firstPatEmbed)
    }
    let adds = pats + 1
    db.set(`${msg.author.id}.pats.${mentions.id}`, adds)
    axios.get(nekoslife + "pat").then((response) =>{
        embed
        .setTitle("PAT")
        .setDescription(bot.lang.get(bot.language, "roleplay", "pat", {user: author.tag,mentioned: mentions.tag}))
        .setFooter(`That's ${adds} pats!`)
        .setImage(response.data.url)
        .setColor(c.gold)
    msg.channel.send(embed)
    })
        

}
module.exports.conf ={
    name: "pat",
    elevation: 0,
    argNeed: false
}