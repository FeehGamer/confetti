module.exports.run = async(bot,msg,args)=>{
	let {Mess} = require("../../functions/messages")
    let MessageBuild = new Mess("Developer of this bot is <@!385129957086461954>", null, null)
    return msg.channel.send(MessageBuild.infoMessage())

}
module.exports.conf = {
    name: "developer",
    aliases: ["dev"]
}