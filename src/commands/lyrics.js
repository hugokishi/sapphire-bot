const { Lyrics } = require("@discord-player/extractor");
const lyricsClient = Lyrics.init("");

module.exports = async ({ client, message, args, player }) => {
  const queue = player.getQueue(message.guild.id);

  if (!queue || !queue.playing) return;

  const currentTrack = queue.current;

  const lyrics = await lyricsClient.search(currentTrack.title);

  return message.channel
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
};
