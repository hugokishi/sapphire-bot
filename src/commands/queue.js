const { Player } = require("discord-player");
const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Este comando mostra a fila de música."),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   * @param {Player} player
   */
  run: async (interaction, client, player) => {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) return;

    const pageStart = 10 * (1 - 1);
    const pageEnd = pageStart + 10;
    const currentTrack = queue.current;

    const tracks = queue.tracks
      .slice(pageStart, pageEnd)
      .map((music, index) => {
        return `${index + pageStart + 1}. **${music.title}** - ${
          music.author
        })`;
      });

    return interaction.reply({
      embeds: [
        {
          title: "Fila",
          description: `${tracks.join("\n")}${
            queue.tracks.length > pageEnd
              ? `\n...${queue.tracks.length - pageEnd} músicas`
              : ""
          }`,
          fields: [
            {
              name: "Tocando Agora",
              value: `🎶 | **${currentTrack.title}** - ${currentTrack.author})`,
            },
          ],
        },
      ],
    });
  },
};
