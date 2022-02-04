require("dotenv").config();
const { Client, Intents } = require("discord.js");
const { Player } = require("discord-player");

const config = require("../config.json");

const commands = require("./scripts/command")(config.prefix);

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

const player = new Player(client, {
  leaveOnEnd: true,
  leaveOnStop: true,
  leaveOnEmpty: true,
  leaveOnEmptyCooldown: 5000,
  autoSelfDeaf: true,
  initialVolume: 50,
  bufferingTimeout: 3000,
});

client.on("ready", () => {
  console.log(`Sapphire Bot is ready to go! ${client.user.tag}`);
  client.user.setActivity("Arctic Monkeys", { type: "LISTENING" });
});

player.on("trackStart", (queue, track) => {
  queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`);
});

client.on("messageCreate", async (message) => {
  if (
    message.author.bot ||
    message.channel.type === "dm" ||
    !message.content.startsWith(config.prefix)
  )
    return;

  const command = message.content.split(" ");

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

  if (commands[command[0]])
    commands[command[0]]({ client, message, args, player });
});

client.login(process.env.BOT_TOKEN);
