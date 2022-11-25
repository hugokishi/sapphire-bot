module.exports = async (player) => {
  player.on("trackStart", (queue, track) => {
    if (!queue) return;
    queue.metadata.channel.send(`🎶 | Tocando agora **${track.title}**!`);
  });
};
