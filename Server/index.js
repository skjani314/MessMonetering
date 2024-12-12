import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';
import multer from 'multer';

import fs from 'fs';
import path from 'path';

dotenv.config();
const app = express();


const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'/tmp/');
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+path.extname(file.originalname));
  }

});

app.set("trust proxy",1);

const upload_file = multer({storage});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
    methods:["POST","GET","PUT","DELETE"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']

  }))

  app.use((req, res, next) => {
    req.setTimeout(60000); 
    next();
});

try{

mongoose.connect('mongodb+srv://pharmacyrgukt:' + 'kivsz3X0xwbs2zVW' + '@pharmacy.mgvnn.mongodb.net/pharmacy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("mongodb connected");
}
catch(err)
{
  console.log(err)
}


app.use(upload_file.array('img'));




app.get('/',(ree,res,next)=>{
    res.json("hi");
})






app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({ error: err });
  });
  
  
  
app.listen(process.env.PORT, () => { console.log("server is running") });