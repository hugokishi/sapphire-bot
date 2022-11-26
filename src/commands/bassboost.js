const { Player } = require("discord-player");
const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bassboost")
    .setDescription("Este comando adiciona bass boost à música atual."),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   * @param {Player} player
   */
  run: async (interaction, client, player) => {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) return;

    await queue.setFilters({
      bassboost: !queue.getFiltersEnabled().includes("bassboost"),
      normalizer2: !queue.getFiltersEnabled().includes("bassboost"),
    });

    return interaction.reply({ content: "🔊 | Adicionando bass" });
  },
};
