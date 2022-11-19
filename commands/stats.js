const { EmbedBuilder } = require("discord.js");
require("moment-duration-format");
const cpuStat = require("cpu-stat");
const moment = require("moment");

module.exports = {
    name: "stats",
    description: "Get information about the bot",
    usage: "Usage: " + `Send \`+stats\``,
    execute(message, args) {
        const client = message.client;
        const { version } = require("discord.js");

        cpuStat.usagePercent(async function (err, percent, seconds) {
            if (err) {
                return console.log(err);
            }

            const duration = moment
                .duration(message.client.uptime)
                .format(" D[d], H[h], m[m]");

            if (args[0]) {
                switch (args[0].toLowerCase()) {
                    case "ping":
                        return message.reply(`${Math.round(client.ws.ping)} ms`)
                    case "uptime":
                        return message.reply(duration)
                    case "memory":
                        return message.reply(`${(process.memoryUsage().heapUsed / 1000 / 1000).toFixed(
                            2
                        )} MB`)
                }
            }

            const embed = new EmbedBuilder();
            embed.setColor('#4287f5');
            embed.setTitle(`\`${client.user.username}\` Stats`);
            embed.addFields(
                {
                    name: "Ping",
                    value: `┕\`${Math.round(client.ws.ping)} ms\``,
                    inline: true,
                },
                {
                    name: "Uptime",
                    value: `┕\`${duration}\``,
                    inline: true,
                },
                {
                    name: "Memory",
                    value: `┕\`${(process.memoryUsage().heapUsed / 1000 / 1000).toFixed(
                        2
                    )} MB\``,
                    inline: true,
                }
            );
            embed.addFields(
                {
                    name: "API Latency",
                    value: `┕\`${message.client.ws.ping} ms\``,
                    inline: true,
                },
                {
                    name: "Discord.js",
                    value: `┕\`v${version}\``,
                    inline: true,
                },
                {
                    name: "Node.js",
                    value: `┕\`${process.version}\``,
                    inline: true,
                }
            );
            return await message.reply({ embeds: [embed] });
        });
    }
}