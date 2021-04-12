//Define required modules to run bot
let Discord = require("discord.js")
let db = require("quick.db")
let {config} = require("dotenv")

let bot = new Discord.Client();
let fs = require("fs")
let Enmap = require("enmap")

const {promisify} = require("util");
const readdir = promisify(require("fs").readdir);
let queue = new Map();

const {I18n} = require("locale-parser");
const {Player} = require('discord-player');

bot.player = new Player(bot);
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");

const init = async () => {

	config({path: __dirname + "/.env",});

	// Run the command loader
	["command"].forEach((handler) => {require(`./handlers/${handler}`)(bot);});

	const plrFiles = await readdir("./player/");
	console.log(`Loading a total of ${plrFiles.length} player events.`);

	plrFiles.forEach(file => {
		const eventName = file.split(".")[0];
		console.log(`Loading Event: ${eventName}`);
		const event = require(`./player/${file}`);
        
		bot.player.on(eventName, event.bind(null, bot));
	});

	const evtFiles = await readdir("./events/");
	console.log(`Loading a total of ${evtFiles.length} events.`);

	evtFiles.forEach(file => {
		const eventName = file.split(".")[0];
		console.log(`Loading Event: ${eventName}`);
		const event = require(`./events/${file}`);

		bot.on(eventName, event.bind(null, bot));
	});

	bot.login(process.env.TOKEN)
}

init()

module.exports = {queue,bot}