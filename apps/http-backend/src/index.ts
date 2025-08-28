import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import {prismaClient} from "@repo/db/client"
// import { Middleware } from "./middleware";
import {CreateRoomSchema , CreateUserSchema , SignInSchema} from "@repo/backend-common/types"
import {JWT_SECRET} from "@repo/auth/auth"

const app = express();

app.use(express.json())
app.use(cors())

app.post("/Signup" , async (req,res) => {

    const parsedData = CreateUserSchema.safeParse(req.body);
    console.log(parsedData);
    
    if(!parsedData.success) {
      res.json({
        message : "Incorrect Input"
      })
      return 
    }

    try {
    const user = await prismaClient.user.create({
        data:{
            username : parsedData.data.username,
            password : parsedData.data.password,
            email : parsedData.data.email,
        }
    })

    res.json({
        userId : user.id
    })
    
    } catch(e) {
    res.status(403).json({
        message : "Something went wrong"
    })
}})



app.post("/Signin" , async (req,res)=> {

    const parsedData  = SignInSchema.safeParse(req.body)
    console.log(parsedData);
    
    if(!parsedData.success) {
        res.json ({
            message : "Wrong Credentials"
        })
        return 
    }

   const user = await prismaClient.user.findFirst({
        where : {
            username: parsedData.data.username,
            password : parsedData.data.password
        }
    })

    if(!user) {
        res.status(403).json({
            message : "Not authorized"
        })
        return
    }

   const token =  jwt.sign({
        username : user.id,
    }, JWT_SECRET)
    
    

    res.json({
        token : token,
    })

})


app.post("/Room"  , async (req,res)=> {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success) {
        
      res.json({
        message : "Incorrect Input"
      })
      return 
    }

    // const userId = req.userId

    try{
    const room = await prismaClient.room.create({
        //@ts-ignore
        data :{
            slug: parsedData.data.name,
            AdminId : "Pratham",
            
        }
        
    })

    } catch(e) {
        res.status(403).json({
          message : "Room Exists"
        })
    }

})

app.get("/chats/:roomId", async (req, res) => {
    try {
        const roomId = req.params.roomId;
        console.log(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        });

        res.json({
            messages
        })
    } catch(e) {
        console.log(e);
        res.json({
            messages: []
        })
    }
    
})

app.listen(3009);