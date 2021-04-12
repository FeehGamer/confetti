const { DiscordAPIError } = require("discord.js")

module.exports.run = async (bot,msg,args)=>{
    let canvacord = require("canvacord")
    let Discord = require("discord.js")
    args = args.join(" ")
    let facepalm = await canvacord.Canvas.clyde(args)
    let attach = new Discord.MessageAttachment(facepalm, "facepalm.png")
    msg.channel.send(attach)
}
module.exports.conf ={
    name: "clyde",
    elevation: 0,
    argNeed:true
}