import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
const app = express()


// Imports from another files
import UserRoutes from './Routes/Users.js'
import RoomsRoutes from './Routes/Rooms.js'
import AuthRoutes from './Routes/Auth.js'
import NotFound from './Middleware/not-found.js'
import CustomErrorHandler from './Middleware/error-handler.js'
import autherization from './Middleware/autherization.js'

app.get('/', (req,res) => {
    res.send('<h1>Welcome to the Hotel server </h1>')
})
// Middlewares
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://stay-wise-frontend-fg2l.vercel.app/",
  })
);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api/authUser', AuthRoutes)
app.use('/api/user',autherization, UserRoutes )
app.use("/api/rooms", RoomsRoutes)

app.use(NotFound)
app.use(CustomErrorHandler)

const PORT = process.env.PORT || 4000

const start = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Database')
        app.listen(PORT, ()=> console.log(`Server is running on Port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()
