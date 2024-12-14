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
import User from './models/User.js';
import { v2 as cloudinary } from 'cloudinary';
import Complaint from './models/Complaint.js';
import Timeline from './models/Timeline.js';
import { userInfo } from 'os';

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
  origin: (origin, callback) => {
    const allowedOrigins = ['https://mess-monetering.vercel.app','http://localhost:5173'];
    if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app'))) {
        callback(null, true); 
    } else {
        callback(new Error('Not allowed by CORS')); 
    }
},    methods:["POST","GET","PUT","DELETE"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']

  }))

  app.use((req, res, next) => {
    req.setTimeout(60000); 
    next();
});

try{

mongoose.connect('mongodb+srv://messmonetering:'+process.env.DB_PASSWORD+'@cluster0.dtfkj.mongodb.net/mess', {
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


cloudinary.config({
  cloud_name: 'dvifawhjl',
  api_key: process.env.CLOUDNIR_API_KEY,
  api_secret: process.env.CLOUDNIR_API_SECRET,
});






app.get('/',(ree,res,next)=>{
    res.json("Beackend working");
})

app.post('/register',async (req,res,next)=>{


try{

const {name,email,password,role,img,destination,user_id}=req.body;

const user = await User.findOne({ email });

if (user) {
  next(new Error("user Already Found"));
}
else {
  const hashpassword = await bcrypt.hash(password, 10);

  const imgresult = await cloudinary.uploader.upload(req.files[0].path, {
    folder: 'users',
    public_id: name,
  });

  fs.unlinkSync(req.files[0].path);

  const result = await User.create({ name, email, password: hashpassword, role,destination,user_id,img:imgresult.secure_url })
res.json(result)

}

}
catch(err){
  next(err);
}



});




app.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });

    if (!user) {
      next(new Error("User Not Found"));
    }
    else{
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const accessToken = jwt.sign({ email }, process.env.KEY, { expiresIn: '7d' });

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'None',
        path: '/',

      });

      return res.status(200).json("logged in sucessfully");
    } else {
      return res.status(401).json({ message: "Password incorrect" });
    }

  }
  } catch (error) {
    next(error)
  }
});

app.post('/logout', (req, res) => {
  try {
      res.clearCookie('accessToken', {
          httpOnly: true,
          secure: true, 
          sameSite: 'None', 
          path: '/', 
      });
      return res.json({ message: "Logout successfully" });
  } catch (error) {
      next(error);
  }
});


app.post('/get-user', async (req, res, next) => {


  const accessToken = req.cookies.accessToken;
  console.log(accessToken)
  if (!accessToken){ next(new Error("jwt token not found"))}
  else{
  await jwt.verify(accessToken, process.env.KEY, async (err, decode) => {

    if (err) {
      console.log(err);

      next(err);
    }
    else {

      const email = decode.email;
      console.log(email);
      const user = await User.findOne({ email })
      res.json(user);
    }

  })

  }
})



app.post('/forget', async (req, res, next) => {

  try {

    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ email });

    if (!user) {
      next(new Error("User Not Found"));
    }
    else {


      const token = jwt.sign({ email }, process.env.KEY, { expiresIn: '5m' });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'messmonetering@gmail.com',
          pass: process.env.EMAIL_APPCODE
        }
      });

      const mailOptions = {
        from: 'messmonetering@gmail.com',
        to: email,
        subject: 'Forget Password',
        text: 'Your Password reset link is provided here and \n it will work only for 5 minuetes\n' + 'http://localhost:5173/forgot/' + token
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.sendStatus(200);

    }
  }
  catch (err) {

    next(err);

  }


})
app.post('/forget/verify', async (req, res, next) => {


  try {

    const token = req.body.token;
    await jwt.verify(token, process.env.KEY, (err, decode) => {

      if (err) {
        next(err);
      }
      else {
        res.json({ verified: true, email: decode.email });
        console.log(decode);

      }

    })
  }
  catch (err) {

    next(err);

  }

});


app.post('/passchange', async (req, res, next) => {

  console.log(req.body);
   const { token} = req.body;
   const pass=req.body.data.password;
 
   try {
  
     await jwt.verify(token, process.env.KEY, async (err, decode) => {
 
       if (err) {
         next(err)
       }
       else {
 
         const email = decode.email;
         const hashpassword=await bcrypt.hash(pass,10);
         console.log(hashpassword)
         const result = await User.findOneAndUpdate({ email }, { password: hashpassword }, { new: true, runValidators: true });
         res.status(200).json("Password changed");
 
       }
 
 
     })
   }
   catch (err) {
     next(err);
   }
 
 })



 app.post('/complaint',async (req,res,next)=>{


try{

const {from,issue,category,des,level}=req.body;

const arr=await Promise.all(
  req.files.map(async (each)=>{

    let imgresult = await cloudinary.uploader.upload(each.path, {
      folder: 'complaints',
      public_id: each.path,
    });
 return imgresult.secure_url;

  })
)

const result =await Complaint.create({from,issue,category,des,image_array:arr,level})
const time=await Timeline.create({complaint_id:result._id,status:"progress"})

res.json({result,time});


}
catch(err)
{
next(err);

}

 })



app.get('/complaint',async (req,res,next)=>{


try{

const {level,from}=req.query;

if(level)
  {

    const result =await Complaint.find({level});
    
    const data=await Promise.all(result.map( async (each)=>{

      const {_id}=each;

      const time=await Timeline.find({complaint_id:_id}).sort({date:-1});
      const user_details=await User.findOne({_id:each.from})
      console.log(user_details);
      return {...each,time,user_details}

    }))
    console.log(data)
    res.json(data);

  }
else if(from){

  const result =await Complaint.find({from});
    
  const data=await Promise.all(result.map( async (each)=>{

    const {_id}=each;

    const time=await Timeline.find({complaint_id:_id}).sort({date:-1});
    
    return {...each,time}

  }))
  res.json(data);
}
else{
  next(new Error("no data to fetch"));
}


}
catch(err)
{

  next(err)

}




})


app.put('/complaint',async (req,res,next)=>{


try{

const {complaint_id,status}=req.body

const result= await Timeline.create({complaint_id,status, date: new Date()}) 

res.json(result)

}
catch(err)
{
  next(err);
}



})



app.get('/dashboard',async (req,res,next)=>{


try{


  const monthlyRaisedCounts = await Timeline.aggregate([
    {
        $match: {
            status: "progress",
        },
    },
    {
        $group: {
            _id: {
                year: { $year: "$date" },  
                month: { $month: "$date" } 
            },
            count: { $sum: 1 } 
        },
    },
    {
        $sort: { "_id.year": 1, "_id.month": 1 } 
    },
]);


const currentMonthStart = new Date();
currentMonthStart.setDate(1); 
currentMonthStart.setHours(0, 0, 0, 0); 

const currentMonthEnd = new Date(currentMonthStart);
currentMonthEnd.setMonth(currentMonthStart.getMonth() + 1); 


const categoryWiseCounts = await Timeline.aggregate([
  {
      $match: {
          status: "progress", 
          date: { $gte: currentMonthStart, $lt: currentMonthEnd }, 
      },
  },
  {
      $lookup: {
          from: "complaints", 
          localField: "complaint_id", 
          foreignField: "_id", 
          as: "complaintDetails", 
      },
  },
  {
      $unwind: "$complaintDetails", 
  },
  {
      $group: {
          _id: "$complaintDetails.category", 
          count: { $sum: 1 }, 
      },
  },
  {
      $sort: { count: -1 }, 
  },
]);



res.json({monthlyRaisedCounts,categoryWiseCounts})



}
catch(err){
  next(err)
}


})




app.get('/admin-complaints',async (res,req,next)=>{


try{
const {role}=req.query;

const result =await Complaint.find({ level: { $gte: 2 } });
    
    const data=await Promise.all(result.map( async (each)=>{

      const {_id}=each;

      const time=await Timeline.find({complaint_id:_id}).sort({date:-1});
      const user_details=await User.findOne({_id:each.from})
      console.log(user_details);
      return {...each,time,user_details,role:user_details.role}

    }))
    if(role=='student')
      {
        const stu_data=data.filter(each=>each.role=="student");
        res.json(stu_data);
      }
      else{
        const rep_data=data.filter(each=>each.role=="coordinator");
        res.json(rep_data);
      }


}
catch(err){
  next(err);
}




})




async function updateComplaintLevels() {
  try {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2); 

      const unresolvedComplaints = await Timeline.aggregate([
          {
              $match: {
                  status: "progress", 
                  date: { $lte: twoDaysAgo } 
              }
          },
          {
              $lookup: {
                  from: "complaints",
                  localField: "complaint_id",
                  foreignField: "_id",
                  as: "complaintDetails"
              }
          },
          {
              $unwind: "$complaintDetails"
          },
          {
              $project: {
                  complaintId: "$complaintDetails._id",
                  level: "$complaintDetails.level"
              }
          }
      ]);

      for (let complaint of unresolvedComplaints) {
          const updatedLevel = complaint.level + 1;

          await Complaint.findByIdAndUpdate(complaint.complaintId, {
              $set: { level: updatedLevel }
          });

          console.log(`Complaint ${complaint.complaintId} updated to level ${updatedLevel}`);
      }
  } catch (err) {
      console.error("Error updating complaint levels:", err);
  }
}

setInterval(updateComplaintLevels, 24 * 60 * 60 * 1000); 





app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({ error: err });
  });
  
  
  
app.listen(process.env.PORT, () => { console.log("server is running") });