import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import http from 'http'
import { Server, Socket } from "socket.io"
import cors from "cors"

dotenv.config();

const app: Express = express();

app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    // methods: ["GET", "POST"]
  }
})

io.on("connection", (socket: Socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on("send_message", (data) => {
    console.log(data)
    socket.broadcast.emit("receive_message", data)
  })
})

server.listen(3001, () => {
  console.log("SERVER IS RUNNING")
})