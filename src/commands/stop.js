module.exports = async (client, message, args, player) => {
  const queue = player.getQueue(message.guild.id);
  queue.stop();
  message.channel.send(`Parado...`);
};
