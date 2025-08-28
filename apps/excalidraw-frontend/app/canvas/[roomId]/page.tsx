"use client"
import { RoomCanvas } from "@/app/components/RoomCanvas"
import { useSearchParams } from "next/navigation"



export default function CanvasPage() {
    const searchParams = useSearchParams();

    const roomId = searchParams.get("roomId")
    const token = searchParams.get("token")
    // console.log(token);
    // console.log("yaha se hai roomId wala jalklu");
    
    // console.log(roomId);
    
    

     return (
        <div>
        <RoomCanvas roomId={roomId as unknown as string} token={token as string} />
        </div>
     )
} 