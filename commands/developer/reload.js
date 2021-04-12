module.exports.run = async(bot,msg,args)=>{
    if(args.length < 2){
        return msg.channel.send("You need to specify two arguments!")
    } else {
        try {
            delete require.cache[require.resolve(`../${args[0]}/${args[1]}`)]
            let pull = require(`../${args[0]}/${args[1]}`)
            bot.commands.set(pull.conf.name, pull)
            if (pull.conf.aliases && Array.isArray(pull.conf.aliases)) pull.conf.aliases.forEach(alias => bot.aliases.set(alias, pull.conf.name));
        } catch (e){
            return msg.channel.send(`Unable to reload \`${args[1]}\` in category \`${args[0]}\`\n\`\`\`yaml\n${e}\`\`\``)
        }
        msg.channel.send(`Successfully reloaded command \`${args[1]}\` in category \`${args[0]}\``)
    }
}
module.exports.conf = {
    name: "reload",
    elevation: 4,
    argNeed: true
}