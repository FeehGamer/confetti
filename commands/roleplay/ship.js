module.exports.run = async(bot,msg,args)=>{
    let db = require("quick.db")
    let c = require("../../colors.json")
    let Discord = require("discord.js")
    let i = db.get(`${msg.author.id}.ship`) || null
    let embed = new Discord.MessageEmbed()
    if(args.length == 0){
        if(i == null){
            return msg.channel.send("You are not shipped with anybody! Use `c.ship <user>` to ship with someone")
        } else {
            let j = bot.users.cache.get(i)
            let k = db.get(`${msg.author.id}.hugs.${j.id}`) || 0
            let l = db.get(`${j.id}.hugs.${msg.author.id}`) || 0
            let m = db.get(`${msg.author.id}.pats.${j.id}`) || 0
            let n = db.get(`${j.id}.pats.${msg.author.id}`) || 0
           	let o = db.get(`${msg.author.id}.kisses.${j.id}`) || 0
            let p = db.get(`${j.id}.kisses.${msg.author.id}`) || 0
            embed
                .setColor(c.pink)
                .setDescription(`${msg.author} loves, and is loved by ${j}!\n\u200B`)
            	.addField("**HUGS :heart:**", k+l, true)
            	.addField("**PATS :dog:**", m+n, true)
            	.addField("**KISSES :heartpulse: **", o+p, true)
                .setTitle(`SHIP`)
            return msg.channel.send(embed)
        }
    } else {
        if(args[0] == "sink"){
            let d = db.get(`${msg.author.id}.ship`)
            if(!d){
                return msg.channel.send("You are not shipped with anyone!")
            }
            let j = db.get(`${d}.ship`)
            db.delete(`${msg.author.id}.ship`)
            db.delete(`${d}.ship`)
            return msg.channel.send(`<@${d}>, ${msg.author} sank your ship :broken_heart:`)
        }
        if(args.length > 0){
            args[0] = args[0].toString().replace("<@", "").replace(">", "").replace("!", "")
        }
        let mentioned = msg.guild.members.cache.get(args[0]) || msg.author
        if(mentioned !== msg.author){
            mentioned = mentioned.user
        }
        let ll = db.get(`${mentioned.id}.ship`) || null
            if(i !== null){
                let b = bot.users.cache.get(i)
                return msg.reply("You are already shipped with <@" + b + ">\nUse `c.ship sink` to sink your ship!")
            }
         else if(ll !== null){
            let b = bot.users.cache.get(ll)
            return msg.reply(`${mentioned} is already with <@${ll}>!`)
        }  else 
        {
            msg.channel.send(`${mentioned}, type \`accept\` to accept ${msg.author}'s proposal\nType \`deny\` to deny ${msg.author}'s proposal`)
            let filter = m => m.author.id === mentioned.id
            const response = msg.channel.createMessageCollector(filter, { time: 3600000, max: 1 });
            response.on('collect', async m =>{
                if(m.content === "accept".toLowerCase()){
                    db.set(`${msg.author.id}.ship`, mentioned.id)
                    db.set(`${mentioned.id}.ship`, msg.author.id)
                    return msg.reply(`${mentioned} accepted your proposal!`)
                }
                if(m.content === "deny".toLowerCase()) return msg.reply(`${mentioned} denied your proposal :( Better luck next time`)
            })
        }
    }
}
module.exports.conf = {
    name:"ship",
    aliases:["marry"],
    guildOnly: true
}