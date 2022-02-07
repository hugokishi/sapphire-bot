module.exports = async ({ client, message, args, player }) => {
  const queue = player.getQueue(message.guild.id);

  if (!queue || !queue.playing) return;

  const pageStart = 10 * (1 - 1);
  const pageEnd = pageStart + 10;
  const currentTrack = queue.current;

  const tracks = queue.tracks.slice(pageStart, pageEnd).map((music, index) => {
    return `${index + pageStart + 1}. **${music.title}** - ${music.author})`;
  });

  return message.channel
    .send({
      embeds: [
        {
          title: "Server Queue",
          description: `${tracks.join("\n")}${
            queue.tracks.length > pageEnd
              ? `\n...${queue.tracks.length - pageEnd} músicas`
              : ""
          }`,
          color: 0xff0000,
          fields: [
            {
              name: "Tocando Agora",
              value: `🎶 | **${currentTrack.title}** - ${currentTrack.author})`,
            },
          ],
        },
      ],
    })
    .catch(console.error);
};
