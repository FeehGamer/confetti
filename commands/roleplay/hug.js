module.exports.run = async(bot,msg,args) =>{
    let Discord = require("discord.js")
    let db = require("quick.db")
    let nekoslife = "https://nekos.life/api/v2/img/"
    let axios = require("axios")
    let mentions = msg.mentions.users.first();
    let author = msg.author
    let c = require("../../colors.json")
    if(!mentions) return msg.channel.send(bot.lang.get(bot.language, "errors", "noMention"))
    let hugs = db.get(`${msg.author.id}.hugs.${mentions.id}`) || 0
    let embed = new Discord.MessageEmbed()
    let firstHugEmbed = new Discord.MessageEmbed()
        .setTitle("ACHIEVEMENT UNLOCKED")
        .setColor(c.pink)
        .setDescription(`:tada: This is your first hug with **${mentions.tag}** yaay :tada:`)
    if(hugs < 1){
        let adds = hugs + 1
        db.set(`${msg.author.id}.hugs.${mentions.id}`, adds)
        axios.get(nekoslife + "hug").then((response) =>{
            embed
            .setTitle("HUG")
            .setDescription(bot.lang.get(bot.language, "roleplay", "hug", {user: author.tag,mentioned: mentions.tag}))
            .setImage(response.data.url)
            .setFooter("That's 1 hug!")
            .setColor(c.gold)
        msg.channel.send(embed)
        })
        return msg.channel.send(firstHugEmbed)
    }
    let adds = hugs + 1
    db.set(`${msg.author.id}.hugs.${mentions.id}`, adds)
    axios.get(nekoslife + "hug").then((response) =>{
        embed
        .setTitle("HUG")
        .setDescription(bot.lang.get(bot.language, "roleplay", "hug", {user: author.tag,mentioned: mentions.tag}))
        .setFooter(`That's ${adds} hugs!`)
        .setImage(response.data.url)
        .setColor(c.gold)
    msg.channel.send(embed)
    })
        

}
module.exports.conf ={
    name: "hug",
    elevation: 0,
    argNeed: false
}