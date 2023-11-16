/*
This is a basic bot for discord to recite a random or specific rule of acquisition upon request.

As a discord user and star trek fan, I want to be able to hear rules of acquisition on command.

GIVEN a basic discord bot that knows the rules of acquisition
WHEN I type the command: !ruleRandom
THEN the discord bot recites a random official rule of acquisition in the format: "Rule of Acquisition number [number]: [rule]."
WHEN I type the command: !rule [number]
THEN the discord bot checks whether there is a known rule for that number.
WHEN there is a known official rule that the user has requested
THEN the bot recites the full rule in the format: "Rule of Acquisition number [number]: [rule]."
WHEN there is a known unofficial rule that the user has requested
THEN the bot produces the warning: "Records are incomplete, but most believe Rule of Acquisition number [number] to be: [rule]."
WHEN there is no known rule that the user has requested
THEN the bot produces the warning: "Unfortunately, this rule is for premium users only. Please deposit two slips of gold-pressed latinum to hear the rule."
*/
require('dotenv').config();
const { Client, GatewayIntentBits } = require("discord.js");
const AllRules = require("./rules.json");
const ParsedRules = JSON.parse(AllRules);

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    message.channel.send("pong!");
  }
  if (message.content === "!ruleRandom") {
    generateRandomRule();
    postRule();
  }
});

generateRandomRule = () => {
    let validRule = false;

    while(!validRule) {
    //generate a random number from 1 to 285
    testNumber = Math.floor((Math.random() * 285) + 1);
    
    //see whether the numbered rule is official

    //if the rule isn't official, repeat until a valid rule is found

    }
}


client.login(process.env.BOT_TOKEN);