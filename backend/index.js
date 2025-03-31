import express from "express"

import mongoose from "mongoose"
import routes from "./routes/UserRoutes.js"
import errorLogger from "./middlewares/errorHandling.js"
import bodyParser from "body-parser"

import dotenv from "dotenv"

import cookieParser from "cookie-parser";

import jwt from "jsonwebtoken"
import cors from "cors"
import eventRoutes from "./routes/EventRoutes.js"


dotenv.config()

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    
}));

app.use(bodyParser.json())
app.use(errorLogger)
app.use(cookieParser());
app.use("/user",routes)
app.use("/event",eventRoutes)


app.listen(5000,()=>{
    console.log("lisiting to port 4000")
})


mongoose.connect("mongodb+srv://nagaruthvik66:FMeaANGOQvSW7lFx@cluster0.s8gko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsAllowInvalidCertificates: true
}).then(()=>{
    console.log("conected to mongoDb")
})