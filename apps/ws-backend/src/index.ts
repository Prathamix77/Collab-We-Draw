import{  WebSocket, WebSocketServer } from "ws"
import {JWT_SECRET} from "@repo/auth/auth"
import * as jwt from "jsonwebtoken"
import {prismaClient} from "@repo/db/client"

const wss = new WebSocketServer({port:8080})


interface User {
    ws : WebSocket
    rooms : String [],
    userId: String
}

const users: User [] = []

function checkUser(token: string) : string | null {
    
    const decoded = jwt.verify(token , JWT_SECRET)

    console.log("Token is valid :  " + JSON.stringify(decoded));

    if(typeof decoded === "string") {
        return null
    }

    if(!decoded || !decoded.userId) {
    return null
    }
    
    const userId = decoded.userId
    
    console.log(decoded.userId);
    

   return userId
}



wss.on("connection", function connection(ws , request: Request){

    const Url = request.url    
    if(!Url) {
        return;
    }
    const queryParams = new URLSearchParams(Url.split("?")[1])
    const token = queryParams.get('token')

    console.log(token);
    
    
    const userId =  checkUser(token as string);
    // const userId = "0eb31264-bbde-4d40-b26c-e012957dfeb5"
    console.log(userId);
    

if(!userId) {
    // ws.send(userId as string)
    ws.close()
    console.log("yaha dikkat hai");
    return null;
}

users.push({
    userId,
    rooms: [],
    ws
})

ws.on("message" , async function message(data) {

    const parsedData = JSON.parse(data as unknown as string)


    if(parsedData.type === "join_room") {
        const user = users.find(x => x.userId === userId);
        user?.rooms.push(parsedData.roomId)
        console.log(user);
        console.log("s");
        
        
    }
    if(parsedData.type == "leave-room") {
        const user = users.find(x=>x.userId === userId);
        if(!user) {
            return;
        }
        user.rooms = user.rooms.filter(x => x === parsedData.room);
    }

    console.log(parsedData);
    
    if (parsedData.type === "chat") {
        const roomId = parsedData.roomId;
        const message = parsedData.message;
        await prismaClient.chat.create({
            data: {
                userId,
                roomId,
                message
            }
        })
        users.forEach(user=> {
            if(user.rooms.includes(roomId)){
                user.ws.send(JSON.stringify({
                    type: "chat",
                    roomId : roomId,
                    message: message,
                }))
            }
        })

    }


})




})