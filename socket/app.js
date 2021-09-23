const express = require("express")
const app = express();
const http = require('http')
const server = http.createServer(app);
const { Server }= require("socket.io")

const io = new Server(server);

app.get("/",()=>{
    return "<h1>Hello world</h1>"
})

io.on('connection',(socket) =>{
    console.log("user connected",socket.id)
    // socket.on("testing",(data)=>{
    //     console.log(data);
    // })

    socket.on("mousedown",(data)=>{
        socket.broadcast.emit("md",data)
    })

    socket.on("mousemove",(data)=>{
        socket.broadcast.emit("mm",data)
    })

    socket.on('disconnect',()=>{
        console.log("user disconnected")
    })
})



server.listen(9000,function(){
    console.log("app listenening on 9000");
})