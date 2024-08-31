const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const XversE = require("../index");

/**
 * @param {XversE} client
 */
module.exports = async (client) => {
  // <!----- [ Registering Slash Commands (Globally) ] ----->
  try {
    let arrayOfcommands = [];
    const commandFiles = await globPromise(
      `${process.cwd()}/Commands/Slash/**/*.js`
    );
    commandFiles.map((value) => {
      const file = require(value);
      const splitted = value.split("/");
      const directory = splitted[splitted.length - 2];
      const properties = { directory, ...file };
      client.slashCommands.set(file.name, properties);
      arrayOfcommands.push(file);
    });

    client.on("ready", async () => {
      await client.application.commands.set(arrayOfcommands);
      console.log("[/] 🌐 | Successfully Registered Slash Commands <3...");
      setTimeout(() => {
        console.log(`[!] 🌐 | Node Connected [ 🟢 Node ${client.ws.ping} MS ]`);
      }, 5000);
      
    });

    console.log(`[>] ✅ | ${client.slashCommands.size} Slash Commands Loaded`);
  } catch (error) {
    console.log(error);
  }

  // <!----- [ Loading Message Commands ] ----->
  try {
    const MessageCommadsFiles = await globPromise(
      `${process.cwd()}/Commands/Message/**/*.js`
    );
    MessageCommadsFiles.map((value) => {
      const file = require(value);
      const splitted = value.split("/");
      const directory = splitted[splitted.length - 2];
      const properties = { directory, ...file };
      client.commands.set(file.name, properties);
      if (file.aliases && Array.isArray(file.aliases))
        file.aliases.forEach((a) => client.aliases.set(a, file.name));
    });

    console.log(`[>] ✅ | ${client.commands.size} Message Commands Loaded`);
  } catch (error) {
    console.log(error);
  }
  
  // <!----- [ Loading Events Files ] ----->
  try {
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));
    console.log(`[>] ✅ | ${eventFiles.length} Events Loaded`);
  } catch (error) {
    console.log(error);
  }
};
