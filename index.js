
// const math = require('math')

// console.log(math.sqrt(100));

const fs = require('fs')
const data = require('./data/data.json')

const user = data.find(user => user.id === 1)
// console.log(user.name);
// fs.mkdir('data',err =>{ 
//    if(err){
//     console.log(err)
//    }
// })

// writing an text to an file
// fs.writeFile(`./data/${user.name.toLowerCase()}.txt`,
// `Hello,, My name is ${user.name}, I'm learning NodeJs in Cyberdude channel`,
// (err) => {
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log('File has been written successfully');

// })



// append an text to an file
// fs.appendFile(`./data/${user.name.toLowerCase()}.txt`,
// `
// I'm from Chennai
// `,
// (err)=>{
//     if(err){
//         console.log(err);
//     }
// })



// read an text from an file
// fs.readFile('data/firstFile.txt',(err)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log('File had been read successfully');
// })

// http

const http = require('http')
http.createServer((req,res)=>{
console.log('Server is running on port 3000');
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
res.write(JSON.stringify(data))

res.end()
}).listen(3000)
// let cors = require("cors");
// http.use(cors());