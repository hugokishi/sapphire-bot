module.exports = (client, msg) => {
  msg.reply(`Você pode utilizar estes comandos: :smile:

    s!play [URL] -> Comando para reproduzir música.
    s!stop -> Comando para parar a música atual.
    s!skip -> Comando para pular a música que está tocando agora.
    s!queue -> Comando para ver a fila de espera de música.
  `);
};
