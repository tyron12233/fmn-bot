require('dotenv').config()
const { channel } = require("diagnostics_channel");
const { Client, Collection, Intents, GatewayIntentBits, Events, MembershipScreeningFieldType, MessageReaction } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { escapeRegex, snipeDB } = require("./utils");

const TOKEN = process.env['TOKEN'];

const client = new Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});
client.login(TOKEN);

client.reactionFunctions = new Collection();
client.functions = new Collection();
client.commands = new Collection();

/**
* Import all commands
*/
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

/**
* Import reaction functions
*/
const reactionFunctionFiles = readdirSync(join(__dirname, "reactionFunctions")).filter((file) => file.endsWith(".js"));
for (const file of reactionFunctionFiles) {
    const funct = require(join(__dirname, "reactionFunctions", `${file}`));
    client.reactionFunctions.set(funct.name.toLowerCase(), funct);
}

/**
 * Import message functions
 */
const funcFiles = readdirSync(join(__dirname, "functions")).filter((file) => file.endsWith(".js"));
for (const file of funcFiles) {
    const funct = require(join(__dirname, "functions", `${file}`));
    client.functions.set(funct.name.toLowerCase(), funct);
}





/**
 * Client events
 */
client.on('ready', () => {
    console.log(`${client.user.username} ready!`);

    // prefetch the rules message so its cached and will receive reaction events
    client.channels.fetch("1034680537891229726")
        .then(channel => channel.messages.fetch("1034815908650176513"))
})


client.on("messageCreate", async (message) => {
    if (message.author.id == client.user.id) return;
    if (!message.guild) return;
    if (message.webhookId) return;

    client.functions.forEach(func => {
        func.execute(message)
    });

    /**
     * Begin parsing if message is command
     */
    //This basically means prefix is '+'
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex("+")})\\s*`);
    if (!prefixRegex.test(message.content)) {
        return;
    }

    //TODO: Understand what this part does
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
        client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (command) {
        return command.execute(message, args);
    }
});

client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            console.error('Something went wrong when fetching the message:', error);
            return;
        }
    }

    client.reactionFunctions.forEach(func => {
        func.execute(reaction, user);
    });
});