const verifiedRoleId = "1043555475964309574"
const lilliesRoleId = "1034678784135278662"

const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: "verify",
    description: "Gives user a verified role",
    usage: "Send +verify {username}",
    async execute(message, args) {
        if (!message.content.startsWith(`+${this.name}`)) {
            return;
        }

        let user = message.mentions.users.first()
        if (user == undefined) {
            message.reply("Unable to find user.")
            return;
        }

        if (!message.member.permissionsIn(message.channel).has(PermissionsBitField.Flags.ManageRoles)) {
            message.reply("You don't have enough permissions to verify this user.");
            return;
        }

        message.guild.members.fetch(user.id)
            .then(member => {
                if (member) {
                    if (member.roles.cache.some(role => role.id == lilliesRoleId || role.id == verifiedRoleId)) {
                        message.reply("User is already verified.");

                        return;
                    }

                    message.guild.roles.fetch(verifiedRoleId).then(role => {
                        member.roles.add(role)

                        message.reply("Verified role has been added to <@" + user.id + ">");
                    });
                } else {
                    message.reply("Unable to find user.");
                }
            }).catch(console.log);


    }
}