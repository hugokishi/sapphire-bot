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

  const queue = player.createQueue(message.guild.id, {
    metadata: {
      channel: message.channel,
    },
  });

  try {
    if (!queue.connection) await queue.connect(message.member.voice.channel);
  } catch (error) {
    queue.destroy();
    console.error(error);
    return await message.reply({
      content: "Não foi possivel reproduzir!",
      ephemeral: true,
    });
  }

  const song = await player
    .search(search_music, {
      requestedBy: message.author,
    })
    .then((x) => x.tracks[0]);
  client.user.setActivity(song.title, { type: "LISTENING" });
  if (!song)
    return message.reply(`Erro ao procurar música: ${search_music}!!!`);
  queue.play(song);

  message.channel.send({ content: `⏳ | Buscando... **${song.title}**!` });
};
