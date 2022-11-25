const { Player } = require("discord-player");
const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const {
  SaveGuildConfig,
  GetByGuildId,
  UpdateLanguage,
} = require("../domain/repository/GuildConfig");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lang")
    .setDescription("Esse comando configura a linguagem.")
    .addStringOption((option) =>
      option
        .setName("language")
        .setDescription("Set the system language.")
        .setRequired(true)
        .addChoices(
          {
            name: "PT_BR",
            value: "PT_BR",
          },
          {
            name: "EN_US",
            value: "EN_US",
          }
        )
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   * @param {Player} player
   */
  run: async (interaction, client, player) => {
    const language = interaction.options.get("language");

    const savedGuildConfig = await GetByGuildId(interaction.guildId);

    if (savedGuildConfig) {
      await UpdateLanguage(interaction.guildId, language.value);

      return interaction.reply({
        content: "The preferred language has been updated!",
      });
    }

    await SaveGuildConfig({
      guildName: interaction.guild.name,
      guildId: interaction.guildId,
      language: language.value,
    });

    return interaction.reply({
      content: "The preferred language has been set!",
      ephemeral: true,
    });
  },
};
