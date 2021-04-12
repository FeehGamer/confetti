module.exports.run = async(bot,msg,args)=>{
    const Discord = require("discord.js");
    const Kitsu = require("kitsu.js");
    const kitsu = new Kitsu();
    var search = msg.content.split(/\s+/g).slice(1).join(" ");
    var embed = new Discord.MessageEmbed()
    let sent = await msg.channel.send("Getting info from API...")
    if (!search) {
        embed.setColor(c.red_light)
        embed.setTitle(bot.lang.get(bot.language, "errors", "title"))
        embed.setDescription(bot.lang.get(bot.language, "errors", "noArgs"))
        sent.delete()
        return msg.channel.send(embed)

      } else {
      var search = msg.content.split(/\s+/g).slice(1).join(" ");

      kitsu.searchManga(search).then(result => {
          if (result.length === 0) {
            sent.delete()
              return msg.channel.send(bot.lang.get(bot.language, "jp", "noResultsFor", {search:search}));
          }

          var anime = result[0]
          embed
              .setColor('#FF9D6E')
              .setAuthor(`${anime.titles.english || anime.titles.romaji || search} `, anime.posterImage.original)
              .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
              .addField('❯\u2000\ ' + bot.lang.get(bot.language, "jp", "info"), `•\u2000\**${bot.lang.get(bot.language, "jp", "japaneseName")}:** ${anime.titles.romaji}\n\•\u2000\**${bot.lang.get(bot.language, "jp", "ageRating")}:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? `${bot.lang.get(bot.language, "jp", "yes")}` : `${bot.lang.get(bot.language, "jp", "no")}`}`, true)
              .addField('❯\u2000\ ' + bot.lang.get(bot.language, "jp", "stats"), `•\u2000\**${bot.lang.get(bot.language, "jp", "averageRating")}:** ${anime.averageRating}\n\•\u2000\**${bot.lang.get(bot.language, "jp", "ratingRank")}:** ${anime.ratingRank}\n\•\u2000\**${bot.lang.get(bot.language, "jp", "japaneseName")}:** ${anime.popularityRank}`, true)
              .setThumbnail(anime.posterImage.original);
              sent.delete()
          return msg.channel.send({ embed });
      }).catch(err => {
          console.log(err)
          sent.delete()
          return msg.channel.send(bot.lang.get(bot.language, "jp", "noResultsFor", {search:search}));
      });
          }
}
module.exports.conf ={
    name: "manga",
    argNeed: true
}