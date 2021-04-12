const { DiscordAPIError } = require("discord.js");

module.exports = async (bot,msg) => {
    if (!msg.guild ) return;
    // Declarations
    let db = require("quick.db")
    let Discord = require("discord.js")
    let {queue} = require("../index")
    let prefix = db.get(`${msg.guild.id}.prefix`) || process.env.PREFIX ||"c.";
    let c = require("../colors.json")
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let command = bot.commands.get(cmd);
    let message = msg;
    let defLang = "en"
    const { I18n } = require("locale-parser");
    bot.lang = new I18n({
        defaultLocale: db.get(`${msg.author.id}.lang`) || defLang,
      });


    bot.language = db.get(`${msg.author.id}.lang`) || defLang;
    if (!command) command = bot.commands.get(bot.aliases.get(cmd));
    if (msg.author.bot) return;
    let lvlcooldown = 15000
    var lvl = await db.get(`${msg.guild.id}.${msg.author.id}.cooldowns.level`);
    let ms = require("parse-ms")
    async function s(){
        if(msg.author.bot) return;
        let level = db.get(`${msg.guild.id}.${msg.author.id}.level`) || 1
        let xp = db.get(`${msg.guild.id}.${msg.author.id}.xp`) || 0
        let nextLevel = 1000 * Math.round( level * (level + 1) / 2 );
        let adds = xp + 100
        if (lvl !== null && lvlcooldown - (Date.now() - lvl) > 0 ) {
            let time = ms(lvlcooldown - (Date.now() - lvl));
            return console.log(`${msg.author.tag} needs to wait ${time.seconds}s to get XP`)
        } else {
            db.set(`${msg.guild.id}.${msg.author.id}.xp`, adds)
            db.set(`${msg.guild.id}.${msg.author.id}.cooldowns.level`, Date.now())
        }
        if(xp == nextLevel){
            let add = level + 1
            msg.reply(`Congratulations! You leveled up to level ${add}!`)
            db.set(`${msg.guild.id}.${msg.author.id}.level`, add)
            db.set(`${msg.guild.id}.${msg.author.id}.xp`, 0)
        }
    }
    if(db.get(`${msg.guild.id}.leveldo`) !== false){
        s()
    }
    if (!msg.content.toLowerCase().startsWith(prefix)) return;
    if(db.get(`blacklist.${msg.author.id}.valid`)){
        let d = db.get(`blacklist.${msg.author.id}.reason`) || false
        let embed_msg = "Possible reasons: \n`You violated Discord ToS`\n`You violated Bot Rules`\n`Other not defined reason`";
        if(d){
            embed_msg = `Reason:\n\`${d}\``
        }
        let embed = new Discord.MessageEmbed()
            .setTitle("BLACKLIST")
            .setDescription(`Sorry, but you are on blacklist.\n\n${embed_msg}\n\nIf you think you are on blacklist without any good reason contact us on our [Support Server](https://discord.gg/W9s3hCk)`)
            .setFooter(`${msg.author.id}`, msg.author.displayAvatarURL({dynamic:true}))
            .setColor("#ff0000")
            .setTimestamp()
        return msg.channel.send(embed)
    }
        if(db.get(`blacklist.${msg.guild.id}.valid`)){
            let d = db.get(`blacklist.${msg.guild.id}.reason`) || false
            let embed_msg = "Possible reasons: \n`This server violated Discord ToS`\n`This server violated Bot Rules`\n`Other not defined reason`";
            if(d !== false){
                embed_msg= `Reason:\n\`${d}\``
            }
            let embed = new Discord.MessageEmbed()
                .setTitle("BLACKLIST")
                .setDescription(`Sorry, but this server is on blacklist.\n\n${embed_msg}\n\nIf you think this server is on blacklist without any good reason contact us on our [Support Server](https://discord.gg/W9s3hCk)`)
                .setFooter(`${msg.guild.id}`, msg.guild.iconURL({dynamic:true}))
                .setColor("#ff0000")
                .setTimestamp()
            return msg.channel.send(embed)
        }
        if (!msg.member) msg.member = await msg.guild.fetchMember(msg);
        let serverQueue = queue.get(msg.guild.id)
    let errEmbed = new Discord.MessageEmbed()
        .setTitle(bot.lang.get(bot.language, "errors", "title"))
        .setColor(c.red_light)
    if(command.conf.argNeed){
        if(args.length < 1){
            errEmbed.setDescription(bot.lang.get(bot.language, "errors", "noArgs"))
            return msg.channel.send(errEmbed)
        }
    }
    if(command.conf.permLevel){
        if(!msg.member.guild.me.hasPermission(permLevel)) {
            errEmbed.setDescription(bot.lang.get(bot.language, "errors", "noPerms"))
            return msg.channel.send(errEmbed)
        }
    }
    if(command.conf.elevation){
        let el = command.conf.elevation || 0
        if(el == 0 || el > 4){

        } else if(el == 1){
            if(db.get(`${msg.author.id}.premium`) !== true){
                if(db.get(`${msg.author.id}.bot_mod`) !== true){
                    if(db.get(`${msg.author.id}.developer`) !== true){
                        errEmbed.setDescription(bot.lang.get(bot.language, "errors", "invalidElevation", {elevation: el}))
                        return msg.channel.send(errEmbed)
                    }
                }
            }
        } else if(el == 2){
            if(msg.guild.owner.id !== msg.author.id){
                errEmbed.setDescription(bot.lang.get(bot.language, "errors", "invalidElevation", {elevation: el}))
                return msg.channel.send(errEmbed)
            }
        } else if(el == 3){
            if(db.get(`${msg.author.id}.bot_mod`) !== true){
                if(db.get(`${msg.author.id}.developer`) !== true){
                    errEmbed.setDescription(bot.lang.get(bot.language, "errors", "invalidElevation", {elevation: el}))
                    return msg.channel.send(errEmbed)
                }
            }
        } else if(el == 4){
            if(db.get(`${msg.author.id}.developer`) !== true){
                errEmbed.setDescription(bot.lang.get(bot.language, "errors", "invalidElevation", {elevation: el}))
                return msg.channel.send(errEmbed)
            }
        }
    }
    if(command.conf.requiredLevel){
        let reqLvl = command.conf.requiredLevel || 0
        if(reqLvl > 0){
            if(db.get(`${msg.author.id}.level` < reqLvl)){
                errEmbed.setDescription(bot.lang.get(bot.language, "errors", "requiredLevel", {level: reqLvl}))
                return msg.channel.send(errEmbed)
            }
        }
    }
    if(command.conf.nsfw){
        if(!msg.channel.nsfw){  
            errEmbed.setDescription(bot.lang.get(bot.language, "errors", "notNSFW"))
            return msg.channel.send(errEmbed)
        }
    }
    
    if (cmd.length === 0) return;

    if (command) 
        command.run(bot, msg, args, serverQueue).catch(e =>{
            let la = bot.guilds.cache.get("756986958143553617").channels.cache.get("822786165047820299")
            la.send(`<@!385129957086461954>\n Server: ${msg.guild.name} (${msg.guild.id})\n User: ${msg.author.tag} (${msg.author.id})\n\`\`\`js\n${e}\`\`\``)
            return msg.channel.send("An error occured and it was reported to the developers!")
        });
        console.log(`[${command.conf.name}] Requested by: ${msg.author.tag} on server ${msg.guild.name || "PMs"}`)
module.exports = {
    msg
}
}