import{ WebSocket, WebSocketServer } from "ws"
import {JWT_SECRET} from "@repo/auth/auth"
import jwt from "jsonwebtoken"
import {prismaClient} from "@repo/db/client"

const wss = new WebSocketServer({port:8080})


interface User {
    ws : WebSocket
    rooms : String [],
    userId: String
}

const users: User [] = []

function checkUser(token: string):string | null {
    
    const decoded = jwt.verify(token,JWT_SECRET)
    if(typeof decoded === "string") {
        return null
    }

    if(!decoded || !decoded .userId) {
    return null
}
    return decoded.userId
    // return decoded.userId = "0eb31264-bbde-4d40-b26c-e012957dfeb5"
    
}



wss.on("connection", function connection(ws , request: Request){

    const Url = request.url
    
    if(!Url) {
        return;
    }
    const queryParams = new URLSearchParams(Url.split("?")[1])
    const token = queryParams.get('token')
    
    

    const userId =  checkUser(token as unknown as string);
    // const userId = "0eb31264-bbde-4d40-b26c-e012957dfeb5"

if(!userId) {
    ws.close()
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
        
    }
    if(parsedData.type == "leave-room") {
        const user = users.find(x=>x.userId === userId);
        if(!user) {
            return;
        }
        user.rooms = user.rooms.filter(x => x === parsedData.room);
    }

    if (parsedData.type === "chat") {
        const roomId = parsedData.roomId;
        const message = parsedData.message;
        await prismaClient.chat.create({
            data:{
                roomId,
                userId,
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