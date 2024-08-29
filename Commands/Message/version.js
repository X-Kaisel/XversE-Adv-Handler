const config = require("../../settings/config.js");

module.exports = {
  name: "version",
  description: "Check the current version of XversE-Adv-Handler",
  aliases: ["ver"],

  Xexecute: async (client, message) => {
    message.reply(`\`\`\`js\n🟢 Version :: ${config.XversE.version}\n\`\`\``);
    message.react("✅");
  },
};
