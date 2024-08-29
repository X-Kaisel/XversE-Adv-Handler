const config = require("../settings/config.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = (client) => {
  client.on("messageCreate", async (message) => {
    let XprefiX = config.PREFIX;
    var XversEmention = `<@${client.user.id}>`

    let Github = new MessageActionRow().addComponents([
      new MessageButton()
      .setLabel("XversE-Adv-Handler (Github)")
      .setEmoji(config.Emoji.github)
      .setStyle("LINK")
      .setURL(config.XversE.XversE),
    ]);

    let row = new MessageActionRow().addComponents([
      new MessageButton()
        .setLabel("Invite me")
        .setEmoji(config.Emoji.inv)
        .setStyle("LINK")
        .setURL(config.XversE.inviteURL.replace("XversE", client.user.id)),

      new MessageButton()
        .setLabel("Support")
        .setEmoji(config.Emoji.support)
        .setStyle("LINK")
        .setURL(config.XversE.DiscordServer),

      new MessageButton()
        .setLabel("Jarvis")
        .setEmoji(config.Emoji.crown)
        .setStyle("LINK")
        .setURL(config.XversE.Jarvis),
    ]);

    if (message.content === XversEmention) {
      message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(config.Embed.color)
            .setAuthor({
              name: `${client.user.username} | Introduction`,
              iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setDescription(`${config.Emoji.hey} Hey ${message.author} I am ${client.user} a Advanced Discord XversE Command Handler Bot... ${config.Emoji.hey}\n\n${config.Emoji.dot} Prefix for in this Server is : **\`${XprefiX}\`**\n${config.Emoji.dot} Need help ? Regarding commands, Type \`/help\` or \`${XprefiX}help\``)
            .setImage(config.Images.Banner)
            .setFooter({
              text: config.Embed.footer,
              iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`,
            }),
        ],
        components: [row, Github],
      });
    }

    if (!message.content.startsWith(XprefiX) || message.author.bot) return;

    const args = message.content.slice(XprefiX.length).trim().split(/ +/);
    const XCommandName = args.shift().toLowerCase();

    const command = client.commands.get(XCommandName) || client.commands.find((cmds) => cmds.aliases && cmds.aliases.includes(XCommandName));;
    if (!command) return;

    try {
      command.Xexecute(client, message, args);
    } catch (error) {
      console.error(error);
      message.reply("There was an error executing this command!");
    }
  });
};