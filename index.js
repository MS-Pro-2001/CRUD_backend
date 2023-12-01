// MAIN BACKEND FILE FOR CRUD APP

import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express"
import cors from "cors"

import userRoute from "./routes/users.route.js"

const app = express();
dotenv.config();

app.use(express.json())
app.use(cors())
const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to Database")

    } catch (error) {
        throw error;

    }



}



// routes

app.use("/api/user",userRoute)


app.listen(process.env.PORT, () => {
    connect();
    console.log(`Server up and running on ${process.env.PORT}`)
})



