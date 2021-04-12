function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var hours = Math.floor(seconds / 3600);
    
    var hDisplay = hours > 0 ? hours + (hours == 1 ? " hour, " : " hour, ") : "";
    return hDisplay;
    }
let axios = require("axios")
let Discord = require("discord.js")
let db = require("quick.db")
let c = require("../../colors.json")
let {Mess} = require("../../functions/messages")
let embed = new Discord.MessageEmbed()
module.exports.run = async(bot,msg,args)=>{
axios.get(`https://osu.ppy.sh/api/get_user?k=bd9a1dd71f896dfac5a1204c0937bcd0f3379740&u=${args[0]}`)
.then(response => {
    let json = response.data[0]
    embed
            .setTitle(args[0])
            .setColor(c.pink)
            //.setDescription(`**Join Date**\n${json.join_date}\n**Rank**\n${json.pp_rank}\n**Country**\n${json.country}\n**Country Rank**\n${json.pp_country_rank}\n**PP**\n${Math.floor(json.pp_raw)}\n**SS**\n${json.count_rank_ss}\n**Silver SS**\n${json.count_rank_ssh}\n**S**\n${json.count_rank_s}\n**Silver S**\n${json.count_rank_sh}\n**A**\n${json.count_rank_a}\n**User ID**\n${json.user_id}`)
            .addField("Join Date", json.join_date,true)
            .addField("Rank", json.pp_rank,true)
            .addField("Country", json.country,true)
            .addField("Country Rank", json.pp_country_rank,true)
            .addField("SS", json.count_rank_ss,true)
            .addField("Silver SS", json.count_rank_ssh,true)
            .addField("S", json.count_rank_s,true)
            .addField("Silver S", json.count_rank_sh,true)
            .addField("A", json.count_rank_a,true)
            .addField("Total Score", json.total_score,true)
            .addField("Accuracy", Math.floor(json.accuracy) + "%",true)
            msg.channel.send(embed).then(() =>{
                embed.spliceFields(0, embed.fields.length)
            })
}).catch(err => {
    let mess = new Mess("You need to enter valid username!", bot, null)
    return msg.channel.send(mess.errorMessage)
})
}
module.exports.conf = {
    name:"osu",
    argNeed:true,
    elevation:0
}