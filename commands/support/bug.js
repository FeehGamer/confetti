module.exports.run = async(bot,msg,args)=>{
    let guild = bot.guilds.cache.get("756986958143553617")
    let g = guild.channels.cache.get("798909988360814635")
    let Discord = require("discord.js")
    let embed = new Discord.MessageEmbed()
        .setAuthor(`${msg.author.tag}`, msg.author.displayAvatarURL({dynamic:true}))
        .addField(`Bug`, `${args.join(" ")}`)
        .addField(`Server`, msg.guild.name)
        .setColor("#ffdd00")
        .setFooter(`${msg.author.id}`)
        .setTimestamp()
    let sent = await g.send(embed)
    msg.channel.send("Thank you for your bug!")
}
module.exports.conf = {
    name: "bug",
    elevation: 0,
    argNeed: true
}