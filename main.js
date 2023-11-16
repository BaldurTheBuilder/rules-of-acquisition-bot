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
require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const AllRules = require("./rules.json");
const StringifiedRules = JSON.stringify(AllRules);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("I am ready!");
//   console.log(AllRules);
});

client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    message.channel.send("pong!");
  }
  else if (message.content === "!ruleRandom") {
    let ourRule = generateRandomRule();
    message.channel.send(`Rule of Acquisition number ${ourRule.Number}: ${ourRule.Rule}`);
  }
  else if(message.content.startsWith("!rule ")) {
    let findTheNumberExpression = /\d+/;
    let ourNumber = Number(message.content.match(findTheNumberExpression));
    let testedRule = AllRules.find(n=>n.Number === ourNumber);

    console.log(`ourNumber is: ${ourNumber} with a typeof of: ${typeof ourNumber}`);

    //detect if the text after "!rule " is not a number.
    //if so, give an error message.
    if(!ourNumber) {
        message.channel.send(`Apologies, but by our tabulations, you have not given us a number. A fee of one strip gold pressed latinum has been billed to your account.`);
    }

    //detect if it's a number over 285, under 1, or not an integer.
    //If so, respond that Ferengi refuse to do business with Starfleet's Department of Temporal Investigations.
    else if(ourNumber > 285 || ourNumber < 1 || !Number.isInteger(ourNumber)){
        message.channel.send(`Ferengi refuse to do business with Starfleet's Department of Temporal Investigations.`);
    }

    //detect if it's an unknown rule.
    // if so, respond that the rule is for premium users only.
    else if(!testedRule) {
        message.channel.send(`Unfortunately, this rule is for premium users only. Please deposit two slips of gold-pressed latinum to hear the rule.`);
    }

    //detect if the number is official. If so post without reservation.
    else if(testedRule.Official) {
        message.channel.send(`Rule of Acquisition number ${testedRule.Number}: ${testedRule.Rule}`);
    }

    //detect if the number is unofficial. If so post with reservation.    
    else {
        message.channel.send(`Records are incomplete, but most believe Rule of Acquisition number ${testedRule.Number} to be: ${testedRule.Rule}`);
    }
  }

});

generateRandomRule = () => {
  let validRule = false;
  let testNumber = 0;
  let testedRule = {};

  while (!validRule) {
    //if the rule isn't official, repeat until a valid rule is found

    //generate a random number from 1 to 285
    testNumber = Math.floor(Math.random() * 285 + 1);
    console.log(`Generated number: ${testNumber}`);

    //identify the object with that number
    testedRule = AllRules.find(n=>n.Number === testNumber);
    console.log(`Identified a rule as: ${JSON.stringify(testedRule)}`);

    //see whether the numbered rule both exists and is official
    // if it is, return the rule.
    if (testedRule && testedRule.Official) {
        return testedRule;
    }
  }
};

client.login(process.env.BOT_TOKEN);
