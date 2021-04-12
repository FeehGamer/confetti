module.exports.run = async(bot,msg,args)=>{
    let Discord = require("discord.js")
    let c = require("../../colors.json")
    let db = require("quick.db")
    const filter = m => m.author.id === msg.author.id;
    let embed = new Discord.MessageEmbed()
        .setTitle(bot.lang.get(bot.language, "settings", "pleaseSelectLanguage"))
        .setColor("#ffdd00")
        .setDescription(bot.lang.get(bot.language, "settings", "validLanguages"))
    let sent = await msg.channel.send(embed)
    main()
    async function main(){
        const response = msg.channel.createMessageCollector(filter, { time: 360000000, max: 1 });
        response.on('collect', async m =>{
            if(m.content[0] == "1"){

                db.set(`${msg.author.id}.lang`, "en")
                embed
                    .setColor("GREEN")
                    .setTitle("SUCCESS")
                    .setDescription("Successfully changed language to: `en`")
                msg.delete()
                return sent.edit(embed)
            } else if(m.content[0] == "2"){
                db.set(`${msg.author.id}.lang`, "cz")
                embed
                    .setColor("GREEN")
                    .setTitle("ÚSPĚCH")
                    .setDescription("Úspěšně změnený jazyk na: `cz`")
                msg.delete()
                return sent.edit(embed)
            } else if(m.content[0] == "3"){
                db.set(`${msg.author.id}.lang`, "sk")
                embed
                    .setColor("GREEN")
                    .setTitle("ÚSPECH")
                    .setDescription("Úspešne zmenený jazyk na: `sk`")
                msg.delete()
                return sent.edit(embed)
            } else if(m.content[0] == "4"){
                db.delete(`${msg.author.id}.lang`)
                embed
                    .setColor("GREEN")
                    .setTitle("SUCCESS")
                    .setDescription("Language successfully reseted!")
                msg.delete()
                return sent.edit(embed)
            }
        })
    }
}
module.exports.conf = {
    name:"language",
    aliases: ["lang"],
    evalation: 0
}