module.exports = async ({ client, message, args, player }) => {
  const queue = player.getQueue(message.guild.id);

  if (!queue || !queue.playing) return;

  queue.destroy();
  return message.react(`👌`).catch(console.error);
};
