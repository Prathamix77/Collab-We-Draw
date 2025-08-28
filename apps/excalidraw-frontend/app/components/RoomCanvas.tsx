"use client"
import { useEffect, useRef, useState } from "react";
import { WS_BACKEND } from "../config";
import {Canvas} from "./Canvas";


interface RoomCanvasProps {
    roomId : string,
    token : string
}

export function RoomCanvas({roomId , token} : RoomCanvasProps) {

   const [socket,setSocket] = useState<WebSocket | null>(null)
  
    useEffect(()=> {
        const ws = new WebSocket(`${WS_BACKEND}?token=${token}`)
        ws.onopen = () =>{
            setSocket(ws)
            
            ws.send(JSON.stringify({
                type : "join_room",
                roomId : roomId,
            }))
        }

    },[])
    console.log(socket);
  
    if(!socket) {
        return <div>
            ...Connecting to Server
        </div>
    }
    

    return <div>
        <Canvas socket = {socket as WebSocket}  roomId = {roomId}/>
    </div>




} 