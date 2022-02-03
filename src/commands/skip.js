module.exports = async (client, message, args, player) => {
  const queue = player.getQueue(message.guild.id);
  queue.skip();
  message.channel.send(`Proxima música...`);
};
