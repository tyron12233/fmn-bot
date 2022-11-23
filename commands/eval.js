const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: "eval",
    anychannel: true,
    async execute(message, args) {
        if (!message.content.startsWith(`+${this.name}`)) {
            return;
        }

        if (!message.member.permissionsIn(message.channel).has(PermissionsBitField.Flags.Administrator)) {
            message.reply("You don't have enough permissions to execute this command.");
            return;
        }

        var start = message.content.indexOf("```");
        var end = message.content.lastIndexOf("```");

        var code = message.content.substring(start + 3, end);
        if (start == -1 || end == -1) {
            code = args[0];
        }

        console.log(code);

        if (code.startsWith("js")) {
            code = code.substring(2);
        } else if (code.startsWith("javascript")) {
            code = code.substring("javascript".length);
        }

        try {
            eval(code);
        } catch (error) {
            message.reply("Error evaluating code: \n```" + error + "```");
        }



    }
}