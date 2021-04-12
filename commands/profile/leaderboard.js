module.exports.run = async(bot,msg,args)=>{
    const leaderboard = new Array();
    const db = require("quick.db");
    const { MessageEmbed } = require("discord.js");
    await msg.guild.members.fetch();
    msg.guild.members.cache.forEach(member => {
      if(member.user.bot) return;
      // console.log(member.displayName);
      let xp = db.get(`${msg.guild.id}.${member.id}.level`) || 1;

      let xpl = db.get(`${msg.guild.id}.${member.id}.xp`) || 0;
        
        ((user,xp) => {
            if (!leaderboard[0]) return leaderboard.push([user,xp])
            if (xp >= leaderboard[0][1]) return leaderboard.splice(0,0,[user,xp]);
            if (!leaderboard[1]) return leaderboard.push([user,xp])
            if (xp >= leaderboard[1][1]) return leaderboard.splice(1,0,[user,xp]);
            if (!leaderboard[2]) return leaderboard.push([user,xp])
            if (xp >= leaderboard[2][1]) return leaderboard.splice(2,0,[user,xp]);
            if (!leaderboard[3]) return leaderboard.push([user,xp])
            if (xp >= leaderboard[3][1]) return leaderboard.splice(3,0,[user,xp]);
            if (!leaderboard[4]) return leaderboard.push([user,xp])
            if (xp >= leaderboard[4][1]) return leaderboard.splice(4,0,[user,xp]);
            if (!leaderboard[5]) return leaderboard.push([user,xp])
            if (xp >= leaderboard[5][1]) return leaderboard.splice(5,0,[user,xp]);
            if (!leaderboard[6]) return leaderboard.push([user,xp])
            if (xp >= leaderboard[6][1]) return leaderboard.splice(6,0,[user,xp]);
            if (!leaderboard[7]) return leaderboard.push([user,xp])
            if (xp >= leaderboard[7][1]) return leaderboard.splice(7,0,[user,xp]);
            if (!leaderboard[8]) return leaderboard.push([user,xp])
            if (xp >= leaderboard[8][1]) return leaderboard.splice(8,0,[user,xp]);
            if (!leaderboard[9]) return leaderboard.push([user,xp])
            if (xp >= leaderboard[9][1]) return leaderboard.splice(9,0,[user,xp]);
            })(member.id, xp)
        })

    const nl = [];
    for(var i = 0; i < 10; i++) {
        let name = leaderboard[i];
        let lvl = leaderboard[i];
        if(!name) name = "none"
        else name = `<@${name[0]}>`
        if(!lvl) lvl = "0"
        else lvl = lvl[1]
        nl.push(`${[i+1]}. ${name} **»** ${lvl}`)
    }

    // console.log(leaderboard);
    const em = new MessageEmbed()
    .setColor(db.get(`${msg.guild.id}.${msg.author.id}.levelcolor`) || "#ffdd00")
    .setDescription(nl.join("\n"))
    .setThumbnail(msg.author.displayAvatarURL());
    msg.channel.send(em);
}
module.exports.conf = {
    name:"leaderboard",
    aliases: ["lb"],
    guildOnly: true
}