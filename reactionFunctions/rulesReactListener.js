module.exports = {
    name: "rulesReactListner",
    description: "self explanatory",
    async execute(reaction, user) {
        if (reaction.message.id != "1034815908650176513") {
            return;
        }
        // check if the emoji is the one from the #rules if not then do nothing
        if (reaction.emoji.id != "1034782920948334705") {
            return;
        }

        const verifiedRole = await reaction.message.guild.roles.fetch("1043555475964309574") // verified role
        const lilliesRole = await reaction.message.guild.roles.fetch("1034678784135278662") // lillies role id

        // find the member using its id
        reaction.message.guild.members.fetch(user.id).then(member => {
            // remove the verified role
            member.roles.remove(verifiedRole).catch(console.error);
            // add the lillies role
            member.roles.add(lilliesRole).catch(console.error);
        });
    }
}