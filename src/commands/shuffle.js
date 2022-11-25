const { Player } = require("discord-player");
const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription(
      "Este comando embaralha a sua playlist, tornando-a aleatória."
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   * @param {Player} player
   */
  run: async (interaction, client, player) => {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) return;

    queue.shuffle();
    return interaction.reply({ content: "Embaralhando as musicas" });
  },
};
