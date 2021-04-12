const { profile } = require("console");

module.exports.run = async (bot, msg, args,lang) => {
        const {red_light} = require("../../colors.json")
        const { MessageEmbed } = require("discord.js");
        const path = require('path');
        const { readdirSync } = require("fs");
        let directory = [];
        let info = [];
        let economy = [];
        let fun = [];
        let roleplay = [];
        let moderation = [];
        let sfw = [];
        let weeb = [];
        let nsfw = [];
        let secret = []
        let profile = []

	    readdirSync("./commands/").forEach(dir => {
	    	directory.push(dir);
	        // Filter so we only have .js command files
	        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
	    
	        // Loop over the commands, and add all of them to a collection
	        // If there's no name found, prevent it from returning an error,
	        // By using a cross in the table we made.
	        for (let file of commands) {
                let pull = require(`../${dir}/${file}`);
	            if(dir === "info") info.push(pull.conf.name);
                if(dir === "weeb") weeb.push(pull.conf.name)
                if(dir === "profile") profile.push(pull.conf.name)
	            if(dir === "economy") economy.push(pull.conf.name);
	            if(dir === "fun") fun.push(pull.conf.name);
                if(dir === "moderation") moderation.push(pull.conf.name)
                if(dir === "sfw") sfw.push(pull.conf.name);
                if(dir === "nsfw") nsfw.push(pull.conf.name);
                if(dir === "developer") secret.push(pull.conf.name)
                if(dir === "roleplay") roleplay.push(pull.conf.name)
                

	        }
        });
        let e = new MessageEmbed()
        .setColor(red_light)
        .setAuthor(bot.lang.get(bot.language, "help", "title", {bot: bot.user.tag}), bot.user.displayAvatarURL())
        .setDescription("\n \n")
	    .addField("Info", "`" + info.join(", ") + "`", false)
        .addField("Profile", "`" + profile.join(", ") + "`", false)
        .addField("NSFW", `\`${nsfw.join(", ")}\``, false)
        .addField("Weeb", `\`${weeb.join(", ")}\``, false)
        .addField("Fun", `\`${fun.join(", ")}\``, false)
        .addField("SFW", `\`${sfw.join(", ")}\``, false)
        .addField("Moderation", `\`${moderation.join(", ")}\``, false)
        .addField("Roleplay", `\`${roleplay.join(", ")}\``, false)
        .addField("Developer", `\`${secret.join(", ")}\``, false)
        .setFooter(`${msg.author.id} • ` + bot.lang.get(bot.language, "help", "commandCount", {count:bot.commands.size}))

        msg.channel.send(e);
	}
module.exports.conf = {
    name:"help"
}