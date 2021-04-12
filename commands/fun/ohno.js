const { DiscordAPIError } = require("discord.js")

module.exports.run = async (bot,msg,args)=>{
    let canvacord = require("canvacord")
    let mss = msg.mentions.members.first() || msg.author
    let Discord = require("discord.js")
    let avatar = args.join(" ")
    let facepalm = await canvacord.Canvas.ohno(avatar)
    let attach = new Discord.MessageAttachment(facepalm, "facepalm.png")
    msg.channel.send(attach)
}
module.exports.conf ={
    name: "ohno",
    elevation: 0,
    argNeed:true
}