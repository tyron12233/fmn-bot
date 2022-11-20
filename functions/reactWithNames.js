module.exports = {
    name: "reactWithNames",
    description: "Reacts with the name on every message that contains this name",
    async execute(message) {
        if (message.content.toLowerCase().includes("tyron")) {
            message.react("🇹")
                .then(() => message.react("🇾"))
                .then(() => message.react("🇷"))
                .then(() => message.react("🇴"))
                .then(() => message.react("🇳"))
                .catch(console.log);
        } else if (message.content.toLowerCase().includes("aeru")) {
            message.react("🇦")
                .then(() => message.react("🇪"))
                .then(() => message.react("🇷"))
                .then(() => message.react("🇺"));
        } else if (message.content.toLOwerCase().includes("sam")) {
            message.react("🇩")
                .then(() => message.react("🇦"))
                .then(() => message.react("🇩"))
                .then(() => message.react("🇩"))
                .then(() => message.react("🇾"));
        }
    }
}