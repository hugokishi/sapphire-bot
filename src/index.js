require("dotenv").config();
const { Client, Intents } = require("discord.js");

const config = require("../config.json");

const commands = require("./scripts/command")(config.prefix);

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client.on("ready", () => {
  console.log(`Sapphire Bot is ready to go! ${client.user.tag}`);
  client.user.setActivity("Arctic Monkeys", { type: "LISTENING" });
});

client.on("messageCreate", async (message) => {
  if (
    message.author.bot ||
    message.channel.type === "dm" ||
    !message.content.startsWith(config.prefix)
  )
    return;

  const args = message.content.split(" ");

  if (commands[args[0]]) commands[args[0]](client, message);
});

client.login(process.env.BOT_TOKEN);
