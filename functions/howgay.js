const { EmbedBuilder } = require("discord.js");

function get_algorithomic_gay_count(input) {
  input = input.replace("<", "").replace(">", "").replace("@", "").replace("!", "").replace("&", "")

  if (input == "676730768432562186") {
    // special case for aeru bading
    return 100
  }

  // moy bading
  if (input == "745126492765290557") {
    return 169;
  }

  // won
  if (input == "961818313221111830") {
    return 1000000000000;
  }

  if (input.match(/^[0-9]+$/))
    return (input.substring(6, 9) * input.substring(4, 12)) % 101
  //not a mention, returning random
  return Math.floor(Math.random() * 101)
}

module.exports = {
  name: "howgay",
  description: "self-explanatory",
  usage: "Usage: " + `\`+%name% <@some g*h ppl>\``,
  async execute(message) {
    if (!message.content.startsWith(`+${this.name}`)) return;
    const args = message.content.slice(this.name.length + 1).trim().split(/ +/);

    let who = args[0];
    who = who ? who : `<@${message.author.id}>`;

    gay = get_algorithomic_gay_count(who)
    let description = `${who} is ${gay}% gay.`
    let embed = new EmbedBuilder()
      .setTitle("Gay Detector Machine")
      .setDescription(description)
      .setColor("#eb0fc6")
    await message.reply({ embeds: [embed] })
  }
};