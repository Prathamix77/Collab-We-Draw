// "use client"
import { useEffect , useRef } from "react";
import { initDraw } from "../draw";



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
        <canvas ref={canvasRef} width={1920} height={920} suppressHydrationWarning></canvas>
    </div>)
}

