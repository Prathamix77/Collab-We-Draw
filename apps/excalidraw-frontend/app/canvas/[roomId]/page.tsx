"use client"
import { RoomCanvas } from "@/app/components/RoomCanvas"
import { useParams, usePathname, useSearchParams } from "next/navigation"



export default function CanvasPage() {

   const searchParams = useSearchParams()
   const token = searchParams.get("token")
   const pathName = usePathname()
   const roomId  = pathName.split("+roomId")[1]

    console.log(roomId);
    console.log(roomId);
    console.log(roomId);
    console.log(roomId);

    

     return (
        <div>
        <RoomCanvas roomId={roomId as unknown as string} token={token as unknown as string} />
        </div>
     )
} 