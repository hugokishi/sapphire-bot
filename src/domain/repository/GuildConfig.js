const GuildConfig = require("../models/GuildConfig");

module.exports = {
  async SaveGuildConfig(guildConfig) {
    return GuildConfig.create(guildConfig);
  },

  async GetByGuildId(guildId) {
    return GuildConfig.findOne({
      guildId,
    });
  },

  async UpdateLanguage(guildId, language) {
    return GuildConfig.updateOne({ guildId }, { $set: { language } });
  },
};
