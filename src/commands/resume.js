module.exports = async (client, message, args, player) => {
  try {
    const queue = player.getQueue(message.guild.id);
    queue.setPaused(false);
    message.channel.send(`Continuando a tocar...`);
  } catch (err) {
    message.channel.send(`Não há nenhuma música para tocar...`);
  }
};
