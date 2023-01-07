const emojiMap = {
    "a": "🇦",
    "b": "🇧",
    "c": "🇨",
    "d": "🇩",
    "e": "🇪",
    "f": "🇫",
    "g": "🇬",
    "h": "🇭",
    "i": "🇮",
    "j": "🇯",
    "k": "🇰",
    "l": "🇱",
    "m": "🇲",
    "n": "🇳",
    "o": "🇴",
    "p": "🇵",
    "q": "🇶",
    "r": "🇷",
    "s": "🇸",
    "t": "🇹",
    "u": "🇺",
    "v": "🇻",
    "w": "🇼",
    "x": "🇽",
    "y": "",
    "z": "🇿",
}

const reactionMap = new Object();

module.exports = {
    name: "reactWithNames",
    description: "Reacts with the name on every message that contains this name",
    async execute(message) {
        if (message.content.startsWith(`+setReact`)) {
            const args = message.content.slice('setReact'.length + 1).trim().split(/ +/);

            console.log(args);

            const key = args[0];
            const reactMessage = args[1];

            if (key && reactMessage) {
                if (hasRepeats(reactMessage)) {
                    message.reply("Reaction message cannot contain duplicate characters. (Discord does not allow the same emoji to appear more than once.");
                    return;
                }

                var reactions = []

                for (let i = 0; i < reactMessage.length; i++) {
                    let currentLetter = reactMessage.charAt(i);

                    let correspondingEmoji = emojiMap[currentLetter]
                    if (correspondingEmoji == null) {
                        message.reply("Reaction message must only contain A-Z characters.");
                        return;
                    }

                    reactions.push(correspondingEmoji);
                }

                reactionMap[key] = reactions;

                await message.reply("Reaction successfully set.");
                return;
            }
        }

        var toReact = reactionMap[message.content.toString()];
        if (toReact != null) {
            for (let i = 0; i < toReact.length; i++) {
                await message.react(toReact[i])
            }
            return;
        }

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
                .then(() => message.react("🇺"))
                .catch(console.log);
        } else if (message.content.toLowerCase().includes("won")) {
            message.react("🇼")
                .then(() => message.react("🇴"))
                .then(() => message.react("🇳"))
                .catch(console.log)
        } else if (message.content.toLowerCase().includes("moy")) {
            message.react("🇵")
                .then(() => message.react("🇺"))
                .then(() => message.react("🇩"))
                .then(() => message.react("🇦"))
                .then(() => message.react("🇦"))
                .then(() => message.react("🇾"))
                .catch(console.log);
        }
    }
}

function hasRepeats(str) {
    return /(.).*\1/.test(str);
}