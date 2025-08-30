// "use client"
import { useEffect , useRef } from "react";
import { initDraw } from "../draw";
import { Circle } from "../Icons/Circle";
import { Pencil } from "../Icons/Pencil";
import { Rect } from "../Icons/Rect";



export function Canvas( {
    roomId,
    socket,
}:{
        roomId : string,
        socket : WebSocket
       
}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
     useEffect(()=> {
         if(canvasRef.current) {
        initDraw(canvasRef.current , roomId , socket)


        } 
    },[]);    

    return (<div>
        <div className="flex fixed gap-2 place-items-center">
        <button className="bg-black w-fit h-fit rounded-2xl cursor-pointer border-1"><Circle/></button>
        <br />
        <button className="bg-black w-fit h-fit rounded-2xl cursor-pointer border-1"><Pencil/></button>
        <button className="bg-black w-fit h-fit rounded-2xl cursor-pointer border-1"><Rect/></button>
        </div>
        <canvas ref={canvasRef} width={1920} height={920} suppressHydrationWarning></canvas>
    </div>)
}

