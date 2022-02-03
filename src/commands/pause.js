module.exports = async (client, message, args, player) => {
  try {
    const queue = player.getQueue(message.guild.id);
    queue.setPaused(true);
    message.channel.send(`Música pausada...`);
  } catch (err) {
    message.channel.send(`Não há nenhuma música para pausar...`);
  }
};
