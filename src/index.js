require("dotenv").config();
const { Client } = require("discord.js");
const path = require("path");
const { Player } = require("discord-player");

const client = new Client({
  intents: ["Guilds", "GuildMembers", "GuildMessages", "GuildVoiceStates"],
});

const player = new Player(client);

client.on("ready", () => {
  console.log(`Sapphire Bot is ready to go! ${client.user.tag}`);
  client.user.setActivity({ name: "Arctic Monkeys", type: "LISTENING" });
});

require("./handler")(client, path.join(__dirname, "commands"), player);
require("./player")(player);

client.login(process.env.BOT_TOKEN);
