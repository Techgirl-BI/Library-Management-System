import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import httpStatus from 'http-status'
import colors from 'colors'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnect } from './config/db.js'
import userRouter from './routes/userRoutes.js'
import categoryRouter from './routes/categoryRoutes.js'
import bookRouter from './routes/bookRoutes.js'
const app = express()
const {NODE_ENV, PORT} = process.env
//app general use
app.use(cors())
app.use(express.json())
app.use(helmet())
if(NODE_ENV === "develpment"){
    app.use(morgan(dev))
}
//routes
app.use("/users", userRouter)
app.use("/categories", categoryRouter)
app.use("/books", bookRouter)
app.get('/', (req, res)=>{
    res.status(httpStatus.OK).send("Welcome to my app")
})
app.all('*', (req,res)=>{
    res.status(httpStatus.NOT_FOUND).send("Endpoint not found")
})

dbConnect().then((res)=> {
    console.log('Database is connected'.bgCyan);
    const port = NODE_ENV==="development"?PORT:7070
    app.listen(port, (err)=>{
        if(err){
            console.log(`server error`, err);
            return
        }
        console.log(`App is listening on port ${port} in ${NODE_ENV} mode`.bgRed)
    })
}).catch((err)=> {
    console.log(`Database error: ${err}`.blue);
})

