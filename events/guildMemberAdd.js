module.exports = async(bot,msg)=>{
    let Discord = require("discord.js")
	if(msg.guild.id == "756986958143553617"){
        let role = msg.guild.roles.cache.find(r => r.id === "756989418690314412");
        if(msg.user.bot) role = msg.guild.roles.cache.find(r => r.id === "800750061407305728")
        let member = msg.guild.members.cache.get(msg.id)
        member.roles.add(role)
        let Embed = new Discord.MessageEmbed()
        	.setTitle("Welcome!")
        	.setDescription("Welcome to Feeh's Kingdom!\nWe hope you'll like it here!\nDon't forget to read the rules in <#821936454505725972>")
        	.setColor("RANDOM")
        	.setThumbnail(msg.user.displayAvatarURL({dynamic:true}))
        	.setFooter(msg.id + " | " + msg.user.tag, msg.user.displayAvatarURL({dynamic:true}))
        msg.guild.channels.cache.get("821945123360210945").send("Oh hello there, " + `${msg}`, {embed: Embed})
        
    }
}