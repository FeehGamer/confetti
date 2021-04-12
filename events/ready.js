module.exports = async (bot, msg) => {
    console.log(`Hi, ${bot.user.username} is now online!`);
    const userCount = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
  
    var interval = setInterval(function () {
      var playing = [
        `on ${bot.guilds.cache.size} servers`,
        "c.help",
        `${userCount} users`,
      ];
      var game = Math.floor(Math.random() * playing.length + 0);
  
      bot.user.setPresence({
        activity: { name: playing[game] },
        status: "online",
      });
    }, 15 * 1000);
    let fetch = require("node-fetch");
    fetch(`https://voidbots.net/api/auth/stats/${bot.user.id}`, {
      method: "POST",
      headers: {
        Authorization: "ZKu4MHtMTXWlFuCs7mbv",
        "Content-Type": "application/json",
      },
  
      body: JSON.stringify({ server_count: bot.guilds.cache.size }),
    }).catch((err) => {
      owner1.send(`\`\`\`xl\n${err}\n\`\`\``);
      owner2.send(`\`\`\`xl\n${err}\n\`\`\``);
      console.error(err);
    });
}