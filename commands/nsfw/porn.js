module.exports.run = async (bot,msg,args)=>{
    let Discord = require("discord.js")
    let c = require("../../colors.json")
    let axios = require("axios")    
    let embed = new Discord.MessageEmbed()
    let nekobot = "https://nekobot.xyz/api/image?type="
    if(!args || args.length == 0){
        embed
            .setTitle(bot.lang.get(bot.language, "errors", "title"))
            .setDescription(bot.lang.get(bot.language, "errors", "pornCategories"))
            .setColor(c.red_light)
        return msg.channel.send(embed)
            
    }
    if(args[0] == "4k"){
        axios.get(nekobot + "4k").then((response) =>{
            embed.setTitle("4k")
            embed.setImage(response.data.message)
            embed.setColor(c.purple_dark)
            return msg.channel.send(embed)
        })
        return
    }
    if(args[0] == "ass"){
        axios.get(nekobot + "ass").then((response) =>{
            embed.setTitle("Ass")
            embed.setImage(response.data.message)
            embed.setColor(c.purple_dark)
            return msg.channel.send(embed)
        })
        return
    }
    if(args[0] == "boobs"){
        axios.get(nekobot + "boobs").then((response) =>{
            embed.setTitle("Boobs")
            embed.setImage(response.data.message)
            embed.setColor(c.purple_dark)
            return msg.channel.send(embed)
        })
        return
    }
    if(args[0] == "thighs"){
        axios.get(nekobot + "thigh").then((response) =>{
            embed.setTitle("Thigh")
            embed.setImage(response.data.message)
            embed.setColor(c.purple_dark)
            return msg.channel.send(embed)
        })
        return
    }
    if(args[0] == "gif"){
        axios.get(nekobot + "pgif").then((response) =>{
            embed.setTitle("Gif")
            embed.setImage(response.data.message)
            embed.setColor(c.purple_dark)
            return msg.channel.send(embed)
        })
        return
    }
    if(args[0] == "anal"){
        axios.get(nekobot + "anal").then((response) =>{
            embed.setTitle("Anal")
            embed.setImage(response.data.message)
            embed.setColor(c.purple_dark)
            return msg.channel.send(embed)
        })
        return
    }
}
module.exports.conf = {
    name:"porn",
    nsfw:true,
    guildOnly: false,
    elevation: 0
}