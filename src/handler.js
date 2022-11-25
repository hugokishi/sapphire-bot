const fs = require("fs");
const { sep } = require("path");

module.exports = async (client, commandsPath, player) => {
  const commandsCollection = loadCommands(commandsPath);
  const commands = commandsCollection.map((cmd) => cmd.data.toJSON());

  client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
      const cmd = commandsCollection.find(
        (command) => command.data.name === interaction.commandName
      );

      await cmd.run(interaction, client, player);
    }
  });

  client.on("ready", () => {
    client.guilds.cache.forEach(async (gld) => {
      console.log(
        `sapphire Bot is setting the commands on the server: ${gld.name}, ${gld.id}`
      );

      const guild = client.guilds.cache.get(gld.id);

      if (guild) return guild.commands.set(commands);

      return client.application.commands.set(commands);
    });
  });
};

const loadCommands = (commandsPath) => {
  const commandFiles = fs.readdirSync(commandsPath);
  return commandFiles.map((file) => require(`${commandsPath}${sep}${file}`));
};
