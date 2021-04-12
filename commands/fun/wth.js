const { DiscordAPIError } = require("discord.js")

module.exports.run = async (bot,msg,args)=>{
    let canvacord = require("canvacord")
    let mss = msg.mentions.members.first() || msg.author
    if(mss !== msg.author){
        mss = mss.user
    }
    let Discord = require("discord.js")
    let avatar = mss.displayAvatarURL({dynamic: false, format: 'png'})
    let facepalm = await canvacord.Canvas.hitler(avatar)
    let attach = new Discord.MessageAttachment(facepalm, "facepalm.png")
    msg.channel.send(attach)
}
module.exports.conf ={
    name: "worsethanhitler",
    aliases: ["wth"],
    elevation: 0
}