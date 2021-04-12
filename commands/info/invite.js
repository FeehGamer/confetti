module.exports.run = async(bot,msg,args)=>{
    let Discord = require("discord.js")
    let Embed = new Discord.MessageEmbed()
    	.setTitle("INVITE")
    	.setColor("BLUE")
    	.setDescription("**[CLICK ME](https://discord.com/oauth2/authorize?client_id=594447325804363798&permissions=8&scope=bot)**")
    return msg.channel.send(Embed)
}
module.exports.conf = {
    name: "invite",
    aliases: ["inv"]
}