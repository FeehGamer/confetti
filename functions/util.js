let r = require("quick.db")
let Discord = require("discord.js")
function random(json){
    let ar = Object.values(json)
    return ar[parseInt(Math.random() * ar.length)]
}
let rembed = new Discord.MessageEmbed()
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
function checkIfInBans(server, string){
    return r.has(`cases.${server}.bans.${string}`)
}
function checkIfInWarns(server, string){
    return r.has(`cases.${server}.warns.${string}`)
}
module.exports = {
    random, makeid, checkIfInBans, checkIfInWarns
}