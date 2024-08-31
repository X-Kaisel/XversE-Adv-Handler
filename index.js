const { Client, Collection, Intents } = require("discord.js");
const fs = require("fs");
const config = require("./settings/config.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ["GUILD", "GUILD_MEMBER", "CHANNEL", "MESSAGE", "USER"],
  allowedMentions: {
    parse: ['everyone', 'users', 'roles'],
    repliedUser: false,
  },
});

module.exports = client;

// <!-- Global Variables -->
client.events = new Collection()
client.commands = new Collection()
client.slashCommands = new Collection()
client.aliases = new Collection()
client.MsgCategories = fs.readdirSync('./Commands/Message')
client.SlashCategories = fs.readdirSync('./Commands/Slash')
client.temp = new Collection()
client.config = require('./settings/config')

// <!-- Event Handler -->
client.on("ready", () => {
  client.user.setStatus("dnd");
  client.user.setActivity("XversE-Adv-Handler", { type: "WATCHING" });
  console.log(`[>] 🚀 | ${client.user.username} is Ready to use!`);

  client.channels.fetch(config.XversE.logChannelID).then((log) => {
    log.send(`\`\`\`xml\n🚀 I'm ready to use!\n🟢 Version :: ${config.XversE.version}\`\`\``);
  });
});;

require('./handlers/handler')(client)
client.login(config.TOKEN);