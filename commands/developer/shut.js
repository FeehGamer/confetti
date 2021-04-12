module.exports.run = async (bot,msg,ars) =>{
    let Discord = require("discord.js")
    let pm2 = require("pm2")
    let embed = new Discord.MessageEmbed()
        .setDescription(":white_check_mark: Stopping...")
        .setColor("GREEN")
        .setTimestamp()
    msg.channel.send(embed)
    pm2.stop("confetti")

}
module.exports.conf = {
    name: "shutdown",
    aliases: ["shut", "fuckoff"],
    elevation: 4
}