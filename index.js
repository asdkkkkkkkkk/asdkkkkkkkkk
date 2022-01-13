const { Client , Intents , Collection}  = require('discord.js')
const client = new Client({intents:32767})
const fs = require('fs')
const { prefix , token} = require(`./config.json`)
const mongoose = require("mongoose")
module.exports = client

client.once('ready',()=>{
  console.log("봇이 준비되었습니다")
});

mongoose.connect("mongodb+srv://1233424:1234@cluster0.a1bzj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
}).then(console.log("데이터베이스 연결 완료"))




client.commands = new Collection()

const commandsFile = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandsFile){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name , command)
}

client.on('messageCreate' , message=>{
    if(!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
    try{
        command.execute(message,args)
    } catch (error) {
        console.error(error)
    }
})

client.login("ODk4NzYwMzM3MDkwODM4NTI4.YWo5yg.3Vkah7LTT19vcOVA0WYSFGGq5UY")
