const { QueryType } = require("discord-player");

module.exports = async ({ client, message, args, player }) => {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Para reproduzir você precisa estar em um canal de voz!"
    );

  const search_music = args.join(" ");

  if (!search_music)
    return message.channel.send(
      "Para reproduzir você precisa digitar o nome ou a url da música!"
    );

  const searchResult = await player
    .search(search_music, {
      requestedBy: message.author,
      searchEngine: QueryType.AUTO,
    })
    .catch(() => console.error);

  if (!searchResult || !searchResult.tracks.length)
    return message.reply(`Musíca ou playlist não encontrada :(`);

  const queue = await player.createQueue(message.guild.id, {
    ytdlOptions: {
      filter: "audioonly",
      highWaterMark: 1 << 30,
      dlChunkSize: 0,
    },
    metadata: {
      channel: message.channel,
    },
  });

  try {
    if (!queue.connection) await queue.connect(message.member.voice.channel);
  } catch (error) {
    queue.destroy();
    return await message.reply({
      content: "Não foi possível reproduzir a música :(",
      ephemeral: true,
    });
  }

  await message.reply({
    content: `⏱ | Carregando sua ${
      searchResult.playlist ? "playlist" : "música"
    }...`,
  });

  searchResult.playlist
    ? queue.addTracks(searchResult.tracks)
    : queue.addTrack(searchResult.tracks[0]);

  if (!queue.playing) await queue.play();
};
