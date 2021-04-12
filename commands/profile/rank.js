module.exports.run = async(bot,msg,args) =>{
    let db = require("quick.db")
    let Discord = require("discord.js")
    let canvacord = require("canvacord")
    if(args.length > 0){
        args[0] = args[0].toString().replace("<@", "").replace(">", "").replace("!", "")
    }
    let mentioned = msg.guild.members.cache.get(args[0]) || msg.author
    if(mentioned !== msg.author){
        mentioned = mentioned.user
    }
    let level = db.get(`${msg.guild.id}.${mentioned.id}.level`) || 1
    let xp = db.get(`${msg.guild.id}.${mentioned.id}.xp`) || 0
    let usercolor = db.get(`${msg.guild.id}.${mentioned.id}.levelcolor`) || "#ffdd00"
    let background = db.get(`${msg.guild.id}.${mentioned.id}.levelbackground`) || "#23272A"
    let bgtype = "COLOR"

    let progressType = "GRADIENT"
    if(background.startsWith("https://") ||background.startsWith("http://")){
        bgtype = "IMAGE"
    }
    if(typeof usercolor == "string"){
        progressType = "COLOR"
    }
    let sent = await msg.channel.send("Loading Image...")
    if(mentioned.id == "523443329329922048"){
        usercolor = ["#932c2c", "#e173ff"]
        progressType = "GRADIENT"
    }
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
    if(mentioned.id == "690187298620571796"){
        usercolor = ["#26E795", "#07FCFC", "#0789FC", "#1D07FC"]
        shuffle(usercolor)
        progressType = "GRADIENT"
    }
    let nextLevel = 1000 * Math.round( level * (level + 1) / 2 );
    const rank = new canvacord.Rank()
        .setAvatar(mentioned.displayAvatarURL({dynamic:true, format: 'png'}))
        .setCurrentXP(xp)
        .setLevel(level)
        .setRank(0, `s`, false)
        .setBackground(bgtype, background)
        .setStatus(mentioned.presence.status)
        .setRequiredXP(nextLevel)
        .setProgressBar(usercolor, progressType)
        .setDiscriminator(mentioned.discriminator)
        .setUsername(mentioned.username)
    rank.build()
        .then(buffer => {
            const attachment = new Discord.MessageAttachment(buffer, "RankCard.png");
            sent.delete()
            msg.channel.send(attachment)
    }).catch(err =>{
        function clean(text) {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }
          if (typeof err !== "string")
            err = require("util").inspect(err);
        if(clean(err).startsWith("Error: Server responded with 403")){
            db.delete(`${msg.guild.id}.${mentioned.id}.levelbackground`)
            sent.edit("We don't have access to background of that user!")
        } else if(clean(err).startsWith("Error: getaddrinfo ENOTFOUND")){
            db.delete(`${msg.guild.id}.${mentioned.id}.levelbackground`)
            sent.edit("Background of that user doesn't exist!")
        } else if(clean(err).startsWith("Error: Unsupported image type")) {
            let h = db.get(`${msg.guild.id}.${mentioned.id}.levelbackground`)
            db.delete(`${msg.guild.id}.${mentioned.id}.levelbackground`)
            sent.edit("Image type of this user is not supported! (`" + h + "`)")
        } else {
            console.error(err)
            sent.edit("Some error occured! Error was sent to the developer of this bot!")
        }
    })
}
module.exports.conf = {
    name:"rank",
    aliases: ["level", "lvl"],
    guildOnly: true
}