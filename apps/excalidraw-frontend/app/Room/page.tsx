"use client";
import { Input } from "@repo/ui/Input";
import axios, { AxiosHeaders } from "axios";
import { useEffect, useRef, useState } from "react";
import { HTTP_BACKEND, WS_BACKEND } from "../config";
import { Button } from "@repo/ui/button";
import { useRouter} from "next/navigation";
import { headers } from "next/headers";
import { JsonWebKeyInput } from "crypto";
import { data } from "react-router-dom";


export default function Room() {
  const router = useRouter();
  const roomIdRef = useRef<HTMLInputElement>(null);
  const [storedValue, setstoredValue] = useState<string | null>(null);
  // const roomId = roomIdRef.current?.value;

  useEffect(() => {
    if(typeof window !== undefined) {
      const token = sessionStorage.getItem("token")
      if(token) {
      setstoredValue(token)
    }
  }
  }, [storedValue]);

  console.log(storedValue);
  

   async function HandleRoom() {
   try{
    
    console.log(storedValue);
    
    await axios.post(`${HTTP_BACKEND}/RoomCreate`,{
      data :{
          name : `${roomIdRef.current?.value}`
      }
    } , {
      headers : {
          "authorization" : `${storedValue}` 
    }
  } 
    ) && router.push(`canvas/+roomId${roomIdRef.current?.value}/?token=${storedValue}`);}

    catch (err) {
      console.log("token is not provided" + storedValue);
      
    }
  }
  console.log(roomIdRef.current?.value);
  
  return (
    <div className="bg-black h-screen w-screen flex justify-center items-center">
      <div className=" bg-amber-300 place-content-center h-104 w-112 rounded-2xl p-16">
        <Input ref={roomIdRef} type="string" placeholder="Room ID" />
        <br />
        <span className="flex justify-center items-center">
          <Button text="Join Room" onClick={HandleRoom} />
        </span>
      </div>
    </div>
  );
}
