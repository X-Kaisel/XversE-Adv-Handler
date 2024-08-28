module.exports = {
  name: "ping",
  description: "Ping!",
  aliases: ["latency"],

  Xexecute: async (client, message) => {
    message.reply(`Pong! ${client.ws.ping}`);
  },
};
