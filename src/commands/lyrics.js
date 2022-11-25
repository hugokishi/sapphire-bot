const { Player } = require("discord-player");
const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const { Lyrics } = require("@discord-player/extractor");
const lyricsClient = Lyrics.init("");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lyrics")
    .setDescription("Este comando mostra a letra da música atual."),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   * @param {Player} player
   */
  run: async (interaction, client, player) => {
    const queue = player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) return;

    const currentTrack = queue.current;

    const lyrics = await lyricsClient.search(currentTrack.title);

    if (!lyrics)
      return interaction.reply({
        content: "Letra não encontrada :(",
        ephemeral: true,
      });

    interaction.reply({
      content: "Aqui esta a letra da música",
      ephemeral: true,
    });

    return interaction.channel
      .send({
        embeds: [
          {
            title: `Letra da música - ${currentTrack.title}`,
            description: `${lyrics.lyrics}`,
            color: "#EBA6A9",
          },
        ],
      })
      .catch(console.error);
  },
};
