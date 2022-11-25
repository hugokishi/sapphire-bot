const mongoose = require("mongoose");

const GuildConfig = mongoose.model("GuildConfig", {
  guildName: String,
  guildId: Number,
  language: String,
});

module.exports = GuildConfig;
