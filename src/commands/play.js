const { Player, QueryType } = require("discord-player");
const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Este comando permite tocar uma música.")
    .addStringOption((option) =>
      option
        .setName("musica")
        .setDescription("Inserir o nome da música que deseja tocar")
        .setRequired(true)
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   * @param {Player} player
   */
  run: async (interaction, client, player) => {
    const search_music = interaction.options.get("musica");

    const searchResult = await player
      .search(search_music.value, {
        requestedBy: interaction.user.username,
        searchEngine: QueryType.AUTO,
      })
      .catch(() => console.error);

    if (!searchResult || !searchResult.tracks.length)
      return interaction.reply({
        content: "Não foi possivel encontrar essa musica",
        ephemeral: true,
      });

    const queue = player.createQueue(interaction.guildId, {
      ytdlOptions: {
        filter: "audioonly",
        highWaterMark: 1 << 30,
        dlChunkSize: 0,
      },
      metadata: {
        channel: interaction.channel,
      },
    });

    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch (error) {
      queue.destroy();
      return await interaction.reply({
        content: "Não foi possível reproduzir a música :(",
        ephemeral: true,
      });
    }

    await interaction.reply({
      content: `⏱ | Carregando sua ${
        searchResult.playlist ? "playlist" : "música"
      }...`,
    });

    searchResult.playlist
      ? queue.addTracks(searchResult.tracks)
      : queue.addTrack(searchResult.tracks[0]);

    if (!queue.playing) await queue.play();
  },
};
