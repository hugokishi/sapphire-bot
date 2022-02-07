const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = ({ client, message }) => {
  let helpEmbed = new MessageEmbed()
    .setTitle(message.client.user.username)
    .setDescription("Comandos da Sapphire:")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/938978246702293014/940074030327820298/photo.jpg"
    )
    .setColor("#F8AA2A");

  config.commands.forEach((command) => {
    helpEmbed.addField(
      `**${command.name} (${command.aliases})**`,
      `${command.description}`,
      false
    );
  });

  helpEmbed.setTimestamp();

  return message.channel.send({ embeds: [helpEmbed] }).catch(console.error);
};
