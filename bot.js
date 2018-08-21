const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});

client.on('ready', Ryu => {
  client.user.setGame("Alpha Codes.", "https://www.twitch.tv/idk");
  console.log(`${client.username}, is fking ready ^,^`);
});




var temp = {

};
var prefix = "!";
client.on("message",(message) => {
    if (message.channel.type !== "text") return;
    if (!message.content.startsWith(prefix)) return;
    switch(message.content.split(" ")[0].slice(prefix.length)) {
        case "tempon" :
            if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("** You Don't Have Permission `Manage channels` To Do This Command");
            temp[message.guild.id] = {
                work : true,
                channel : "Not Yet"
            };
           message.guild.createChannel("اضغط لصنع روم مؤقت", 'voice').then(c => {
                temp[message.guild.id].channel = c.id
                message.channel.send("** Done.**");
            });
        break;
        case "tempof" :
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("** You Don't Have Permission `Manage channels` To Do This Command");
            temp[message.guild.id] = {
                work : false,
                channel : "Not Yet"
            };
        message.channel.send("** Done.**");
    };
});
client.on("voiceStateUpdate", (o,n) => {
    if (!temp[n.guild.id]) return;
    if (temp[n.guild.id].work == false) return;
    if (n.voiceChannelID == temp[n.guild.id].channel) {
        n.guild.createChannel(n.user.username, 'voice').then(c => {
            n.setVoiceChannel(c);
        })
    };
    if (o.voiceChannel.name == o.user.username) {
        o.voiceChannel.delete();
    };
})


client.login(process.env.BOT_TOKEN);
