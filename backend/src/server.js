//package imports
import cors from "cors";
import dotenv from "dotenv"
import express from "express"

//local imports
import notesRoutes from "../routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

//const express = require("express");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001



//middleware
//order of middlewares is very important
//cors middleware must preceed rateLimiter because the latter needs to send a status code
//that is not allowed by default in CORS
//if rateLimiter is used after cors, the response will not be sent to the client
app.use(cors({
    origin: 'http://localhost:5173',
}
)); //CORS middleware to allow cross-origin requests
app.use(express.json()); //midleware parses JSON bodies, giving access to req.body
app.use(rateLimiter);

//custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT : ", PORT);
    });
});



//mongodb+srv://shawnfrancochristy:CRix9MAlEoFO0MnV@cluster0.rs08xic.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0