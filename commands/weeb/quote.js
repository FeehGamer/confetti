module.exports.run = async(bot,msg,args)=>{
    let aq = require("animequote")
    let a = aq()
    msg.channel.send(`"${a.quotesentence}" - ${a.quotecharacter} (${a.quoteanime})`)
}
module.exports.conf = {
    name:"quote",
    aliases:["aq", "animequote"]
}