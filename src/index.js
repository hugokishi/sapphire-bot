require("dotenv").config();
const { Client, Intents } = require("discord.js");

const prefix = "s!";

const commands = require("./scripts/command")(prefix);

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`Sapphire Bot is ready to go! ${client.user.tag}`);
});

client.login(process.env.BOT_TOKEN);
