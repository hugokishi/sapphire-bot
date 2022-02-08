module.exports = async ({ client, message, args, player }) => {
  const queue = player.getQueue(message.guild.id);

  if (!queue || !queue.playing) return;

  await queue.setFilters({
    bassboost: !queue.getFiltersEnabled().includes("bassboost"),
    normalizer2: !queue.getFiltersEnabled().includes("bassboost"), // because we need to toggle it with bass
  });
  message.react("👌").catch(console.error);
};
