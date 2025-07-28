//package imports
import cors from "cors";
import dotenv from "dotenv"
import express from "express"
import path from "path";

//local imports
import notesRoutes from "../routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

//const express = require("express");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001
const __dirname = path.resolve(); //to get the current directory name



//middleware
//order of middlewares is very important
//cors middleware must preceed rateLimiter because the latter needs to send a status code
//that is not allowed by default in CORS
//if rateLimiter is used after cors, the response will not be sent to the client
if(process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: 'http://localhost:5173',
        }
    )); //CORS middleware to allow cross-origin requests
}    

app.use(express.json()); //midleware parses JSON bodies, giving access to req.body
app.use(rateLimiter);

//custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

if( process.env.NODE_ENV === "production" ) {
    app.use(express.static(path.join(__dirname, "../frontend/dist"))); //serving static files from frontend/dist

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    }); //to serve the index.html file for all other routes
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT : ", PORT);
    });
});
