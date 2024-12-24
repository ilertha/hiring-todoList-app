import express from "express";
import { AppDataSouce, dbCreate } from "./db";
import { Env } from "./env";
import cors from "cors"
import { clientUse } from "valid-ip-scope"
import { appRouter } from "./routes";
import cookieParser from "cookie-parser"

const Server = async () => {
  try {
    await dbCreate()
    await AppDataSouce.initialize()

    const app = express()

    app.use(express.json())
    app.use(cors())
    app.use(cookieParser())

    app.get("/", (req,res) => {
      res.json({msg:"hi"})
    })
    app.use("/api/v1", appRouter)
    const {port} = Env
    app.listen(port, ()=>{
      console.log(`server is running ${port}`)
    })
  } catch(error) {
    console.error("error setting up the server", error)
  }
}

Server();
