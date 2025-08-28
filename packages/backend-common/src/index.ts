import z from "zod";


export const CreateUserSchema = z.object({
    username: z.string().min(4).max(20),
    password: z.string().max(10),
    email: z.string().min(4)
})

export const SignInSchema = z.object({
    username : z.string(),
    password : z.string()
})

export const CreateRoomSchema = z.object({
    name : z.string().max(20).min(6),
})