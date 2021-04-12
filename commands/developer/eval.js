module.exports.run = async(bot,msg,args)=>{
    const Discord = require("discord.js");
    const db = require('quick.db')
    const Enmap = require("enmap");
    const fs = require("fs");
    let node = require("nodeactyl");
    const application = node.Application;
    let HOST = "https://gp.feehgamer.eu"
    let x = '❌';
    const canvacord = require("canvacord");
    let utils = require('../../functions/util')
	const Pterodactyl = require('pterodactyl.js');
    console.log(process.env.API_KEY_PTERO)
	const pteroClient = new Pterodactyl.Builder()
    	.setURL(HOST)
    	.setAPIKey(process.env.API_KEY_PTERO)
    	.asAdmin();

    const clean = text => {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
        }
    try {
      const code = args.join(" ");
      let evaled = eval(code);
      if(!code) return msg.channel.send('Musíš zadat kód!');

        const success = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle('Eval')
            .addField('Type', `\`\`\`xl\n${typeof evaled}\`\`\``)
            .addField('Output', `\`\`\`xl\n${require("util").inspect(evaled)}\`\`\``)
            .setTimestamp()
      let sent = await msg.channel.send(success);
      sent.react(x);
      let filter = (reaction, user) => user.id === msg.author.id;
      const collector = sent.createReactionCollector(filter, { time: 86400000, max: 1 });

      collector.on('collect', r => {
          if(r.emoji.name !== x) return;
          sent.delete();
      })



    } catch (err) {
        const error = new Discord.MessageEmbed()
        .setColor("#ff0000")
        .setTitle('ERROR!')
        .setDescription(`\`\`\`xl\n${clean(err)}\n\`\`\``)
        let sent = await msg.channel.send(error);
        
        sent.react(x);
        let filter = (reaction, user) => user.id === msg.author.id;
        const collector = sent.createReactionCollector(filter, { time: 86400000, max: 1 });

        collector.on('collect', r => {
         if(r.emoji.name !== x) return;
         sent.delete();
        })
    }
}
module.exports.conf = {
    name: "eval",
    elevation: 4
}