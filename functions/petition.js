module.exports = {
    name: "Petition",
    description: "For holding petitions I guess",
    async execute(message) {
        if (message.content.length < 8) return;
        if (!message.content.match(/\b(petition)\b/i)) return;
        await message.react("<:pepeyes:1043691745839427605>").catch(console.error);
        await message.react('<:pepeno:1038125964909088929>').catch(console.error);
    }
};