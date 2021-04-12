'use-strict';
let Discord = require("discord.js")

module.exports.Mess = class Mess {
    constructor(message, bot, title){
        this.message = message
        this.bot = bot
        this.title = title
        this.embed = new Discord.MessageEmbed()
    }


    get helpMessage(){
        return this.helpmsg
    }

    get successMessage(){
        return this.succmsg
    }

    get infoMessage(){
        return this.infomsg
    }
    get errorMessage(){
        return this.errmsg
    }

    errmsg() {
        this.embed
            .setTitle(this.bot.lang.get(this.bot.language, "errors", "title"))
            .setDescription(this.message)
            .setColor("RED")
            .setTimestamp()
        return this.embed
    }
    helpmsg(){
        this.embed
            .setTitle("Help for " + this.title)
            .setDescription(this.message)
            .setColor("BLUE")
            .setTimestamp()
        return this.embed
    }
    succmsg(){
        this.embed
            .setTitle("SUCCESS")
            .setDescription(this.message)
            .setColor("GREEN")
            .setTimestamp()
        return this.embed
    }
    infomsg(){
        this.embed
            .setTitle(":information_source: INFO :information_source:")
            .setDescription(this.message)
            .setColor("BLUE")
            .setTimestamp()
        return this.embed
    }
}
