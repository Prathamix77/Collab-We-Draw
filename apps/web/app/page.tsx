"useClient"

import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import {useForm} from "react-hook-form"
import { isInternalThread } from "worker_threads";
import { useState } from "react";

interface FormData {
    roomName : String,
    roomId: number,
}

export default function Home() {

  
const {register , handleSubmit} = useForm<FormData>()
const [data, setData] = useState("");

  return <div>

    <form onSubmit={handleSubmit((data)=> setData(JSON.stringify(data) ))}>
    
    <input {...register("roomName")} placeholder="Room Name Here"/>
    <input {...register("roomId",{required: true})}/>
    <input type="submit" />
    </form>
   
  </div>
}
