module.exports.run = async(bot,msg,args)=>{
    let Discord = require("discord.js")
    let c = require("../../colors.json")
    let axios = require("axios")
    let embed2 = new Discord.MessageEmbed()
    let nekoslife = "https://nekos.life/api/v2/img/"
    let nekobot = "https://nekobot.xyz/api/image?type="
    let embed = new Discord.MessageEmbed()
    let {Mess} = require("../../functions/messages")
    if(!args || args.length == 0){
        axios.get(nekobot + "hentai").then((response)=>{
            embed2.setTitle("Hentai")
            embed2.setImage(response.data.message)
            embed2.setColor(c.purple_dark)
        return msg.channel.send(embed2)
        })
        return 
            
    }
    if(args[0] == "help") {
        return msg.channel.send(new Mess(bot.lang.get(bot.language, "errors", "hentaiCategories"), bot, "Hentai").helpMessage())
    }
    if(args[0] == "hololewd"){
        axios.get(nekoslife + "hololewd").then((response)=>{
            embed2.setTitle("Hololewd")
            embed2.setImage(response.data.url)
            embed2.setColor(c.purple_dark)
        return msg.channel.send(embed2)
        })
        return 
    }
    if(args[0] == "holoero"){
        axios.get(nekoslife + "holoero").then((response)=>{
            embed2.setTitle("Holoero")
            embed2.setImage(response.data.url)
            embed2.setColor(c.purple_dark)
        return msg.channel.send(embed2)
        })
        return 
    }
    if(args[0] == "midriff"){
        axios.get(nekobot + "hmidriff").then((response)=>{
            embed2.setTitle("Midriff")
            embed2.setImage(response.data.message)
            embed2.setColor(c.purple_dark)
        return msg.channel.send(embed2)
        })
        return 
    }

    if(args[0] == "thighs"){
        axios.get(nekobot + "hthigh").then((response)=>{
            embed2.setTitle("Thighs")
            embed2.setImage(response.data.message)
            embed2.setColor(c.purple_dark)
        return msg.channel.send(embed2)
        })
        return 
    }
    if(args[0] == "ass"){
        axios.get(nekobot + "hass").then((response)=>{
            embed2.setTitle("Ass")
            embed2.setImage(response.data.message)
            embed2.setColor(c.purple_dark)
        return msg.channel.send(embed2)
        })
        return 
    }
    if(args[0] == "trap"){
            axios.get(nekoslife + "trap").then((response)=>{
                embed2.setTitle("Trap")
                embed2.setImage(response.data.url)
                embed2.setColor(c.purple_dark)
            return msg.channel.send(embed2)
            })
            return 
    }
    if(args[0] == "neko"){
        axios.get(nekoslife + "lewd").then((response)=>{
            embed2.setTitle("Nya~")
            embed2.setImage(response.data.url)
            embed2.setColor(c.purple_dark)
        return msg.channel.send(embed2)
        })
        return 
    }
    if(args[0] == "solo"){
        axios.get(nekoslife + "solo").then((response)=>{
            embed2.setTitle("Solo")
            embed2.setImage(response.data.url)
            embed2.setColor(c.purple_dark)
        return msg.channel.send(embed2)
        })
        return 
    }
    if(args[0] == "kitsune"){
        axios.get(nekoslife + "fox_girl").then((response)=>{
            embed2.setTitle("Kitsune")
            embed2.setImage(response.data.url)
            embed2.setColor(c.purple_dark)
        return msg.channel.send(embed2)
        })
        return 
    }
    if(args[0] == "erokemo"){
        axios.get(nekoslife + "erokemo").then((response)=>{
            embed2.setTitle("Erokemo")
            embed2.setImage(response.data.url)
            embed2.setColor(c.purple_dark)
        return msg.channel.send(embed2)
        })
        return 
    }
    if(args[0] == "wallpaper"){
        axios.get(nekoslife + "wallpaper").then((response)=>{
            embed2.setTitle("Wallpaper")
            embed2.setImage(response.data.url)
            embed2.setColor(c.purple_dark)
        return msg.channel.send(embed2)
        })
        return 
    }
}

module.exports.conf ={
    name: "hentai",
    aliases: ["h"],
    nsfw:true,
    guildOnly: false,
    elevation: 0
}