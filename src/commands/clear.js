const { Player } = require("discord-player");
const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Este comando limpa a fila de música."),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   * @param {Player} player
   */
  run: async (interaction, client, player) => {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) return;

    queue.clear();
    return interaction.reply({ content: "Limpando a fila" });
  },
};
