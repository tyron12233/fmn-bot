module.exports = {
    name: "tyron",
    description: "Reacts with TYRON on every message that contains this name",
    async execute(message) {
        if (message.content.toLowerCase().includes("tyron")) {
            message.react("🇹")
                .then(() => message.react("🇾"))
                .then(() => message.react("🇷"))
                .then(() => message.react("🇴"))
                .then(() => message.react("🇳"))
                .catch(console.log);
        }
    }
}