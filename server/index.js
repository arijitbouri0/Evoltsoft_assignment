import express from 'express'
import { connectDB } from './utils/connectDB.js';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

dotenv.config();

import UserRouter from './routes/user.routes.js'
import StationRouter from './routes/chargingStation.routes.js'
import { corsOptions } from './constants/config.js';

const PORT = process.env.PORT || 3000
const uri = process.env.MONGODB_URI
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(
  cors(corsOptions)
);

connectDB(uri)


app.get("/", (req, res) => {
  return res.send("Server is running!");
});

app.use('/api/user', UserRouter);
app.use('/api/station',StationRouter)




app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`)
});

