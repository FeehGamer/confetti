const { DiscordAPIError } = require("discord.js")

module.exports.run = async (bot,msg,args)=>{
    let canvacord = require("canvacord")
    let Discord = require("discord.js")
    args = args.join(" ")
    let facepalm = await canvacord.Canvas.changemymind(args)
    let attach = new Discord.MessageAttachment(facepalm, "facepalm.png")
    msg.channel.send(attach)
}
module.exports.conf ={
    name: "changemymind",
    aliases: ["cmm"],
    elevation: 0,
    argNeed:true
}