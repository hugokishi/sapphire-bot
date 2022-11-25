require("dotenv").config();
const { Client } = require("discord.js");
const path = require("path");
const { Player } = require("discord-player");
const { default: mongoose } = require("mongoose");

const client = new Client({
  intents: ["Guilds", "GuildMembers", "GuildMessages", "GuildVoiceStates"],
});

const player = new Player(client);

client.on("ready", () => {
  console.log(`Sapphire Bot is ready to go! ${client.user.tag}`);
  client.user.setActivity({ name: "Arctic Monkeys", type: "LISTENING" });

  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log(`Sapphire Bot is connected in database!`))
    .catch((err) =>
      console.log(`Sapphire Bot is not connected in database! ${err.message}`)
    );
});

require("./handler")(client, path.join(__dirname, "commands"), player);
require("./player")(player);

client.login(process.env.BOT_TOKEN);
