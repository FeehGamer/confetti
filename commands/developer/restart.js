module.exports.run = async (bot,msg,ars) =>{
    let Discord = require("discord.js")
    let pm2 = require("pm2")
    let embed = new Discord.MessageEmbed()
        .setDescription(":white_check_mark: Restarting...")
        .setColor("GREEN")
        .setTimestamp()
    msg.channel.send(embed)
    pm2.restart("0")

}
module.exports.conf = {
    name: "restart",
    aliases: ["reboot"],
    elevation: 4
}