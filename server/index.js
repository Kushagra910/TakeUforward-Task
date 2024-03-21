import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from 'cors';
const client = new PrismaClient();
const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://takeuforward-frontend.vercel.app",
     " https://takeuforward-frontend-git-main-kushagra-mishras-projects.vercel.app",
     "https://takeuforward-frontend-i9y3xackd-kushagra-mishras-projects.vercel.app",
     "http://localhost:5173"
    ],
    credentials:true
  })
);


app.get("/api/v1/entries",async(req,res)=>{
  try{
    const entries = await client.user.findMany(); // Fetch all entries from the database
    return res.status(200).json({
      success: true,
      message: "Successfully fetched all entries",
      entries: entries
    });
  } catch(err){
    return res.status(500).json({
      success:false,
      message:"Internal Server Error (entries)"
    })
  }
})

app.post("/api/v1/submit",async(req,res)=>{
  try{
    const {username,language,stdInput,sourceCode} = req.body;
    if(!username || !language || !stdInput || !sourceCode) {
      return res.status(403).json({
        success:false,
        message:"All fields required"
      })
    }
    
    const newUser = await client.user.create({
      data:{
        username,
        sourceCode,
        stdInput,
        language
      }
    })
    return res.status(200).json({
      success:true,
      message:"Form data submitted successfully",
      newUser
    })
  } catch(err){
    console.log(err);
    return res.status(500).json({
      success:false,
      message:"Internal sever Error (submit)"
    })
  }
  
})

app.get("/",(req,res)=>{
  return  res.json({
    success:true,
    message:"Server is running"
  })
})
app.listen(port,()=>{
  console.log(`App is runing at port ${port}`)
})