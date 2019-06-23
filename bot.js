const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});
const config = require("./config.json");
const fs = require("fs");
client.commands = new Discord.Collection

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    
    
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return
    }  
    
    
    jsfile.forEach((f, i) => {
        
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`)
        client.commands.set(props.help.name, props);
    });
});
// date dont touch
var Variable = new Date()


const talkedRecently = new Set();
                          

client.on("ready", () => {
  // bot game updater to prefix
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`${config.activity}`);
});

    
    //Logs when bot joins/leaves server
client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

// console log on server leave or kick
client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});
    



    
//message handler!!!!!!!!!!!!!!!!!!!!!!!!!
client.on("message", async message => {
  if(message.author.bot) return;
  //if(message.content.indexOf(config.prefix) !== 0) return;
  if(message.channel.type === "dm") return;
    
//const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
//const command = args.shift().toLowerCase();
    
//splits message into command and the args of the message
let prefix = config.prefix;
let messageArray = message.content.split(" ");
let command = messageArray[0];
let args = messageArray.slice(1);
    
    
    

let commandfile = client.commands.get(command.slice(prefix.length));
if(commandfile) commandfile.run(client,message,args);
    
    
if (!message.channel.id === `430092135081967616`) {
if (message === `apply` || `beta` || `-apply` || `-beta`){
    message.delete()
    message.reply(`Please do commands in #bot-spam`)
}
}else return
});





//DO NOT TOUCH. GRABS TOKEN FROM CONFIG
client.login(config.token);