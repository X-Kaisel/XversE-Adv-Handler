const { PREFIX } = require("../settings/config");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = require("../index");
const config = require("../settings/config");

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild || !message.id) return;
  let Xprefix = PREFIX;
  var XversEmention = `<@${client.user.id}>`;
  
  const args = message.content.slice(Xprefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  
  if (message.content ===XversEmention) {
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

    message.reply({
      embeds: [
        new MessageEmbed()
          .setColor(config.Embed.color)
          .setAuthor({
            name: `${client.user.username} | Introduction`,
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setDescription(
            `${config.Emoji.hey} Hey ${message.author} I am ${client.user} a Advanced Discord XversE Command Handler Bot... ${config.Emoji.hey}\n\n${config.Emoji.dot} Prefix for in this Server is : **\`${Xprefix}\`**\n${config.Emoji.dot} Need help ? Regarding commands, Type \`/help\` or \`${Xprefix}help\``,
          )
          .setImage(config.Images.Banner)
          .setFooter({
            text: config.Embed.footer,
            iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`,
          }),
      ],
      components: [row, Github],
    });
  }
  const command =
    client.commands.get(cmd) ||
    client.commands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
  if (!command) return;
  if (command) {
    command.Xexecute(client, message, args);
  }
});