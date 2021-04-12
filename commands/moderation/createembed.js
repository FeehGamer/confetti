module.exports.run = async(bot,msg,args)=>{
    let {Mess} = require("../../functions/messages")
	if(msg.member.hasPermission("MANAGE_MESSAGES") || msg.author.id == "385129957086461954"){
                const filter = m => m.author.id === msg.author.id;
        const Discord = require("discord.js")
        const embed = new Discord.MessageEmbed()
        const mainembed = new Discord.MessageEmbed()
            .setTitle("EMBED")
            .setDescription("What should be title?")
            .setColor("#ffdd00")
        let sent = await msg.channel.send(mainembed)
        title();
        async function title(){
            const title = msg.channel.createMessageCollector(filter, { time: 3600000, max: 1 });
            title.on('collect', async m => {
            await embed.setTitle(m.content)
            m.delete()
            mainembed.setDescription("What should be description?")
            sent.edit(mainembed)
            return desc();
            })
        }
        async function desc(){
            const desc = msg.channel.createMessageCollector(filter, {time: 3600000, max: 1});
            desc.on('collect', async m =>{
                await embed.setDescription(m.content)
                console.log(m.content)
                m.delete()
                mainembed.setDescription("What should be footer?")
                sent.edit(mainembed)
                return footer();
            });
        }
        async function footer(){
            const desc = msg.channel.createMessageCollector(filter, {time: 3600000, max: 1});
            desc.on('collect', async m =>{
                await embed.setFooter(m.content)
                m.delete()                
                mainembed.setDescription("Do you want to mention everyone? (Y/N)")
                sent.edit(mainembed)
                return everyone();
            });
        }
        let everynyan = null;
        async function everyone(){
            const desc = msg.channel.createMessageCollector(filter, {time: 3600000, max: 1});
            desc.on('collect', async m =>{
                let content = await m.content[0];
                if(content.toUpperCase() == "Y"){
                    everynyan = true;
                } else {
                    everynyan = null;
                }
                m.delete();
                mainembed.setDescription("What color should the embed be? (HEX Color)")
                sent.edit(mainembed)
                return color();
            });
        }
        async function color(){
            const color = msg.channel.createMessageCollector(filter, {time: 3600000, max: 1})
            color.on('collect', async m =>{
                await embed.setColor(m.content)
                m.delete()
                msg.channel.send(embed).then(m => {
                    if(everynyan == true){
                        return msg.channel.send("@everyone")
                    } else {
                        return;
                    }
                })
                sent.delete()
                msg.delete();
            })
        }
    } else {
        let m = new Mess("You don't have permission `MANAGE_MESSAGES` to use this command!", bot, null)
        return msg.channel.send(m.errorMessage())
    }
}
module.exports.conf = {
    name: "createembed",
    aliases: ["cembed", "ce", "smsg", "createmessage", "cm"]
}