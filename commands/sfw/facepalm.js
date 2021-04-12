const { DiscordAPIError } = require("discord.js")

module.exports.run = async (bot,msg,args)=>{
    let canvacord = require("canvacord")
    let Discord = require("discord.js")
    let avatar = msg.author.displayAvatarURL({dynamic: false, format: 'png'})
    let facepalm = await canvacord.Canvas.facepalm(avatar)
    let attach = new Discord.MessageAttachment(facepalm, "facepalm.png")
    msg.channel.send(attach)
}
module.exports.conf ={
    name: "facepalm",
    aliases: ["fp"],
    elevation: 0
}