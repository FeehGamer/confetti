module.exports.run = async(bot,msg,args)=>{
    let db = require("quick.db")
    let Discord = require("discord.js")
    let MessageBuilder = require("../../functions/messages")
    let mentioned = msg.mentions.members.first() || msg.author
    if(mentioned.id !== msg.author.id){
        mentioned = mentioned.user
    }
	let rank = db.get(`${msg.guild.id}.${mentioned.id}.level`) || 0
    let ship = db.get(`${mentioned.id}.ship`) || "Not shipped with anybody"
	let developer = db.get(`${mentioned.id}.developer`) ? "Yes" : "No"
    let premium = db.get(`${mentioned.id}.premium`) ? "Yes" : "No"
    let friend = db.get(`${mentioned.id}.friend`) ? "Yes" : "No"
    if(!isNaN(ship)){
        ship = `<@!${ship}>`
    }
    let Embed = new Discord.MessageEmbed()
    	.setTitle("Profile of " + mentioned.tag)
    	.setThumbnail(mentioned.displayAvatarURL({dynamic:true}))
    	.addField("Level", rank)
    	.addField("Ship", ship)
    	.addField("Developer", developer)
    	.addField("Premium", premium)
    	.setColor(0xffdd00)
    	.addField("Friend of developer", friend)
    	.setFooter(`${mentioned.id} | ${mentioned.tag}`, mentioned.displayAvatarURL({dynamic:true}))
   	return msg.channel.send(Embed)
}
module.exports.conf = {
    name: "profile",
    aliases: ["prfl"]
}