"use client";
import { Input } from "@repo/ui/Input";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { HTTP_BACKEND, WS_BACKEND } from "../config";
import { Button } from "@repo/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function Room() {
  const router = useRouter();
  const roomIdRef = useRef<HTMLInputElement>(null);
  const [storedValue, setstoredValue] = useState<string | null>(null);
  const roomId = roomIdRef.current?.value;

  useEffect(() => {
    if(typeof window !== undefined) {
      const token = sessionStorage.getItem("token")
      if(token) {
      setstoredValue(token)
    }
  }
  }, [storedValue]);

   async function HandleRoom() {
   try{
    
    console.log(storedValue);
    await axios.post(`${HTTP_BACKEND}/Room`,{
       headers : storedValue
    } 
    ) && router.push(`canvas/roomId=${roomId}?token=${storedValue}`);}

    catch (err) {
      console.log("token is not provided" + storedValue);
      
    }
  }


  return (
    <div className="bg-black h-screen w-screen flex justify-center items-center">
      <div className=" bg-amber-300 place-content-center h-104 w-112 rounded-2xl p-16">
        <Input ref={roomIdRef} type="string" placeholder="Room ID" />
        <div className="bg-white w-20 h-20">{roomId}</div>
        <br />
        <span className="flex justify-center items-center">
          <Button text="Join Room" onClick={HandleRoom} />
        </span>
      </div>
    </div>
  );
}
