import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors())

const port = process.env.PORT || 8080;

async function setup () {
    try {
         await mongoose.connect(process.env.MONGO_URI)
         console.log("db connected succesfully")

         app.listen(port,() => {
            console.log("port connected ")
         })

    }catch (error) {
        console.error("DB connection failed ")
    }
}
setup()

// routes 

app.get("/",(req,res) => {
    res.send("something good")
})