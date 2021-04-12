module.exports.run = async(bot,msg,args)=>{
    let db = require("quick.db")
    let Discord = require("discord.js")
    let c = require("../../colors.json")
    let {random} = require("../../functions/util")
    let embed = new Discord.MessageEmbed()
        .setAuthor("PREFIX", msg.author.displayAvatarURL({dynamic:true}))
        .setDescription(`Successfully set prefix to \`${args[0]}\``)
        .setColor(random(c))
        .setTimestamp()
        .setFooter(`${msg.author.id}`)
    msg.channel.send(embed)
    db.set(`${msg.guild.id}.prefix`, args[0])

}
module.exports.conf = {
    name:"prefix",
    argNeed: true,
    aliases: ["prfx"],
    elevation: 2,
    guildOnly: true
}