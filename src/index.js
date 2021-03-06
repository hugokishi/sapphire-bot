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

const player = new Player(client);

client.on("ready", () => {
  console.log(`Sapphire Bot is ready to go! ${client.user.tag}`);
  client.user.setActivity("Arctic Monkeys", { type: "LISTENING" });
});

player.on("trackStart", (queue, track) => {
  if (!queue) return;
  queue.metadata.channel.send(`🎶 | Tocando agora **${track.title}**!`);
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
  args.splice(0, 1);

  if (commands[command[0]])
    commands[command[0]]({ client, message, args, player });
});

client.login(process.env.BOT_TOKEN);
