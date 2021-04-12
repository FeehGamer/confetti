let {Mess} = require("../functions/messages")
module.exports = async(msg, track) =>{
		let m = new Mess(`Now Playing: ${track.title}\`\`\`\nDuration: ${track.duration}\nAuthor: ${track.author}\nRequested by: ${track.requestedBy.tag}\n\`\`\``, null, null)
        msg.channel.send(m.infoMessage())
}