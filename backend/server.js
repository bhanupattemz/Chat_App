import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import connectToMongoDB from "./db/connectToMongoDB.js";
import userRoutes from "./routes/user.route.js"
import cookieParser from "cookie-parser";
import { app,server } from "./socket/socket.js";
import path from "path"
dotenv.config();
app.use(express.json());
app.use(cookieParser());
const PORT=5000;
const __dirname=path.resolve();

app.get("/",(req,res)=>{
    res.send("Welcome to chat app");
})

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/FrontEnd/dist")))


app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","FrontEnd","dist","index.html"))
})
server.listen(PORT,()=>{
    connectToMongoDB();
    console.log("server is listening in port 5000 for chat app");
})

