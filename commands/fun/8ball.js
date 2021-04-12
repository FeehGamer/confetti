module.exports.run = async(bot,msg,args)=>{
    let d = require("discord.js")
    let axios = require("axios")
    axios.get('https://nekos.life/api/v2/8ball').then(resp =>{
        let Embed = new d.MessageEmbed()
        .setTitle(":8ball: 8BALL :8ball:")
        .addField("Question", args.join(" "), true)
        .setImage(resp.data.url)
        .setColor("BLUE")
        .setFooter(`${msg.author.id} | ${msg.author.tag}`, msg.author.displayAvatarURL({dynamic:true}))
        return msg.inlineReply("", {embed: Embed, allowedMentions: { repliedUser: false } })
    }).catch(console.error)
}
module.exports.conf = {
    name: "8ball",
    elevation: 0,
    argNeed:true
}