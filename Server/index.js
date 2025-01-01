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
import Dtoken from './models/Dtokens.js';
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import xlsx from 'xlsx'
import http from 'http'
import { Server } from 'socket.io';
import schedule from 'node-schedule';




const userSocketMap = {};


dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Decode the service account JSON from the environment variable
const serviceAccountJson = Buffer.from(process.env.SERVICE_ACCOUNT_JSON, 'base64').toString('utf-8');
const serviceAccount = JSON.parse(serviceAccountJson);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/tmp/');
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  }

});

app.set("trust proxy", 1);

const upload_file = multer({ storage });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://mess-monetering.vercel.app', 'http://localhost:5173'];
    if (origin && (allowedOrigins.includes(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
      // callback(null, true); 

    }
  }, methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']

}))

app.use((req, res, next) => {
  req.setTimeout(60000);
  next();
});

try {

  mongoose.connect('mongodb+srv://messmonetering:' + process.env.DB_PASSWORD + '@cluster0.dtfkj.mongodb.net/mess', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("mongodb connected");
}
catch (err) {
  console.log(err)
}


app.use(upload_file.array('img'));


cloudinary.config({
  cloud_name: 'dvifawhjl',
  api_key: process.env.CLOUDNIR_API_KEY,
  api_secret: process.env.CLOUDNIR_API_SECRET,
});


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_URL, // Replace with your frontend URL
  },
});

app.set('socketio', io);


io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);
  socket.on('register', (userId) => {
    
    if(!socket.userId){
      socket.userId=userId;
    if (userSocketMap[userId]) {
      userSocketMap[userId].push(socket.id);
    }
    else {
      userSocketMap[userId] = [socket.id]
    }
    console.log(`User registered: ${userId}, Socket ID: ${socket.id}`);

  }

  });

  socket.on('unregister', (userId) => {
    console.log(userSocketMap)

    if (userSocketMap[userId] && userSocketMap[userId].length > 1) {
      const updatedArr=userSocketMap[userId].filter((each)=>each!=socket.id)

    userSocketMap[userId]=updatedArr
     }
    else {

      delete userSocketMap[userId];
    }
    console.log(`User disconnected: ${userId}`);
    console.log(userSocketMap)

  })
  socket.on('disconnect', () => {

    console.log(userSocketMap)
 
    const userId=socket.userId;
    if (userSocketMap[userId] && userSocketMap[userId].length > 1) {
      const updatedArr=userSocketMap[userId].filter((each)=>each!=socket.id)

    userSocketMap[userId]=updatedArr
     }
    else {

      delete userSocketMap[userId];
    }
    console.log(`User disconnected: ${userId}`);
    console.log(userSocketMap)
  });
});




app.get('/', (req, res, next) => {
  res.json("Backend working");
})

// app.post('/register', async (req, res, next) => {


//   try {

//     const { email, password, role, img, designation, user_id, name } = req.body;

//     const user = await User.findOne({ email });

//     if (user) {
//       next(new Error("user Already Found"));
//     }
//     else {
//       const hashpassword = await bcrypt.hash(password, 10);

//       const imgresult = await cloudinary.uploader.upload(req.files[0].path, {
//         folder: 'users',
//         public_id: name,
//       });

//       fs.unlinkSync(req.files[0].path);

//       const result = await User.create({ name: name, email, password: hashpassword, role, designation, user_id, img: imgresult.secure_url })
//       res.json(result)

//     }

//   }
//   catch (err) {
//     next(err);
//   }



// });



app.post('/login', async (req, res, next) => {
  try {
    const { email, password, token } = req.body;


    const user = await User.findOne({ email });

    if (!user) {
      next(new Error("User Not Found"));
    }
    else {
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
        console.log("device token: " + token);
        if (token) {
          const record = await Dtoken.findOne({ user_id: user._id, token: token })
          if (!record) {
            const token_res = await Dtoken.create({ user_id: user._id, token: token })
            console.log(token_res);
          }
          console.log(record)
        }


        return res.status(200).json("logged in sucessfully");
      } else {
        return res.status(401).json({ message: "Password incorrect" });
      }

    }
  } catch (error) {
    next(error)
  }
});



app.post('/logout', async (req, res, next) => {
  try {
    const { user_id, token } = req.body;
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      path: '/',
    });
    console.log(user_id)
    const result = await Dtoken.deleteOne({ user_id, token })
    console.log(result);
    return res.json({ message: "Logout successfully" });
  } catch (error) {
    next(error);
  }
});


app.post('/get-user', async (req, res, next) => {


  const accessToken = req.cookies.accessToken;
  console.log(accessToken)
  console.log(req.cookies)
  if (!accessToken) { next(new Error("jwt token not found")) }
  else {
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
        text: 'Your Password reset link is provided here and \n it will work only for 5 minuetes\n' + 'https://mess-monetering.vercel.app/forgot/' + token
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
  const { token } = req.body;
  const pass = req.body.data.password;

  try {

    await jwt.verify(token, process.env.KEY, async (err, decode) => {

      if (err) {
        next(err)
      }
      else {

        const email = decode.email;
        const hashpassword = await bcrypt.hash(pass, 10);
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


const Studentauthenticate = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(accessToken, process.env.KEY);

    const user_details = await User.findOne({ email: decoded.email });
    if (user_details.role == 'student') {
      next();
    }
    else {
      next(new Error("unauthorized"))
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};



const StudentCoordinatorauthenticate = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(accessToken, process.env.KEY);

    const user_details = await User.findOne({ email: decoded.email });
    if (user_details.role == 'student' || user_details.role=='coordinator') {
      next();
    }
    else {
      next(new Error("unauthorized"))
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};


const Adminauthenticate = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(accessToken, process.env.KEY);

    const user_details = await User.findOne({ email: decoded.email });
    if (user_details.role == 'admin') {
      next();
    }
    else {
      next(new Error("unauthorized"))
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};


const Coordinatorauthenticate = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(accessToken, process.env.KEY);

    const user_details = await User.findOne({ email: decoded.email });
    if (user_details.role == 'coordinator') {
      next();
    }
    else {
      next(new Error("unauthorized"))
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

const CoordinatorAdminauthenticate = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(accessToken, process.env.KEY);

    const user_details = await User.findOne({ email: decoded.email });
    if (user_details.role == 'coordinator' || user_details.role=='admin') {
      next();
    }
    else {
      next(new Error("unauthorized"))
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

const Userauthenticate = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(accessToken, process.env.KEY);

    const user_details = await User.findOne({ email: decoded.email });
    if (user_details.role == 'student' || user_details.role=='coordinator' || user_details.role=='admin') {
      next();
    }
    else {
      next(new Error("unauthorized"))
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};



app.post('/complaint', StudentCoordinatorauthenticate,async (req, res, next) => {


  try {

    const { from, issue, category, des, level } = req.body;
    const io = req.app.get('socketio');

    const arr = await Promise.all(
      req.files.map(async (each) => {

        let imgresult = await cloudinary.uploader.upload(each.path, {
          folder: 'complaints',
          public_id: each.path,
        });
        return imgresult.secure_url;

      })
    )

    const result = await Complaint.create({ from, issue, category, des, image_array: arr, level, current_status: "progress" })
    const time = await Timeline.create({ complaint_id: result._id, status: "progress" })


    let user_ids = [];

    if (level == 1) {

      const representatives = await User.find({ role: "coordinator" })
      user_ids = representatives.map((each) => { return each._id })
    }
    else {
      const representatives = await User.find({ role: "admin" })
      user_ids = representatives.map((each) => { return each._id })
    }



const client_ids=user_ids.map(each=>{

  if(userSocketMap[each]){
  return userSocketMap[each];
  }else{return [];}

})
const flated_client_ids=client_ids.flat(Infinity)


flated_client_ids.map(each=>{
  if(each){
    io.to(each).emit('dataChanged')

  }
})



    const device_tokens = await Promise.all(user_ids.map(async (each) => {

      const token = await Dtoken.find({ user_id: each })
      return token;

    }))

    const flated_device_tokens = device_tokens.flat(Infinity);

    const responses = await Promise.all(flated_device_tokens.map(async (each) => {

      if (each) {

        const message = arr.length > 0 ? {
          notification: {
            title: issue,
            body: des.substring(0, 10),
            imageUrl: arr[0]
          },
          data: {
            title: issue,
            body: des.substring(0, 10),
            imageUrl: arr[0]
          },
          token: each.token,
        } :
          {
            notification: {
              title: issue,
              body: des.substring(0, 10),
            },
            data: {
              title: issue,
              body: des.substring(0, 10),
            },
            token: each.token, // FCM device token
          }
          ;
        console.log(message)
        const response = await admin.messaging().send(message)
          .then(respo => {
            return respo;
          })
          .catch(error => {
            console.error('Error sending message:', error);
          });
        return response;
      }
    }))

    console.log(responses)



    res.json({ result, time });


  }
  catch (err) {
    next(err);

  }

})



app.get('/complaint', Userauthenticate,async (req, res, next) => {


  try {

    const { level, from, status, category, start, end } = req.query;
    console.log(req.query);
    if (level) {

      let result = [];
      if (status == "Select a status" && category == "Select a category" && start == "" && end == "") {
        result = await Complaint.find({ level }).sort({ date: -1 }).limit(10)
      }
      else if (status != "Select a status" && category != "Select a category" && start != "" && end != "") {
        const startDate = new Date(start);
        const endDate = new Date(end + 'T23:59:59.999Z');

        result = await Complaint.find({ level, current_status: status, date: { $gte: startDate, $lte: endDate }, category }).sort({ date: -1 })

      }
      else if (status != "Select a status" && category != "Select a category" && start == "" && end == "") {

        result = await Complaint.find({ level, current_status: status, category }).sort({ date: -1 })
      }
      else if (status != "Select a status" && category == "Select a category" && start != "" && end != "") {

        const startDate = new Date(start);
        const endDate = new Date(end + 'T23:59:59.999Z');

        result = await Complaint.find({ level, current_status: status, date: { $gte: startDate, $lte: endDate } }).sort({ date: -1 })

      }
      else if (status == "Select a status" && category != "Select a category" && start != "" && end != "") {

        const startDate = new Date(start);
        const endDate = new Date(end + 'T23:59:59.999Z');

        result = await Complaint.find({ level, date: { $gte: startDate, $lte: endDate }, category }).sort({ date: -1 })

      }
      else if (start != "" && end != "") {
        const startDate = new Date(start);
        const endDate = new Date(end + 'T23:59:59.999Z');

        result = await Complaint.find({ level, date: { $gte: startDate, $lte: endDate } }).sort({ date: -1 })

      }
      else if (status != "Select a status") {
        result = await Complaint.find({ level, current_status: status }).sort({ date: -1 })

      }
      else if (category != "Select a category") {
        result = await Complaint.find({ level, category }).sort({ date: -1 })

      }
      else {
        result = await Complaint.find({ level }).sort({ date: -1 }).limit(10)
      }

      const data = await Promise.all(result.map(async (each) => {

        const { _id } = each;

        const time = await Timeline.find({ complaint_id: _id }).sort({ date: -1 });
        const user_details = await User.findOne({ _id: each.from })
        console.log(user_details);
        return { ...each, time, user_details }

      }))
      res.json(data);

    }
    else if (from) {

      let result = [];
      if (status == "Select a status" && category == "Select a category" && start == "" && end == "") {
        result = await Complaint.find({ from }).sort({ date: -1 }).limit(10)
      }
      else if (status != "Select a status" && category != "Select a category" && start != "" && end != "") {
        const startDate = new Date(start);
        const endDate = new Date(end + 'T23:59:59.999Z');

        result = await Complaint.find({ from, current_status: status, date: { $gte: startDate, $lte: endDate }, category }).sort({ date: -1 })

      }
      else if (status != "Select a status" && category != "Select a category" && start == "" && end == "") {

        result = await Complaint.find({ from, current_status: status, category }).sort({ date: -1 })
      }
      else if (status != "Select a status" && category == "Select a category" && start != "" && end != "") {

        const startDate = new Date(start);
        const endDate = new Date(end + 'T23:59:59.999Z');

        result = await Complaint.find({ from, current_status: status, date: { $gte: startDate, $lte: endDate } }).sort({ date: -1 })

      }
      else if (status == "Select a status" && category != "Select a category" && start != "" && end != "") {

        const startDate = new Date(start);
        const endDate = new Date(end + 'T23:59:59.999Z');

        result = await Complaint.find({ from, date: { $gte: startDate, $lte: endDate }, category }).sort({ date: -1 })

      }
      else if (start != "" && end != "") {
        const startDate = new Date(start);
        const endDate = new Date(end + 'T23:59:59.999Z');

        result = await Complaint.find({ from, date: { $gte: startDate, $lte: endDate } }).sort({ date: -1 })

      }
      else if (status != "Select a status") {
        result = await Complaint.find({ from, current_status: status }).sort({ date: -1 })

      }
      else if (category != "Select a category") {
        result = await Complaint.find({ from, category }).sort({ date: -1 })

      }
      else {
        result = await Complaint.find({ from }).sort({ date: -1 }).limit(10)
      }

      const data = await Promise.all(result.map(async (each) => {

        const { _id } = each;

        const time = await Timeline.find({ complaint_id: _id }).sort({ date: -1 });

        return { ...each, time }

      }))
      res.json(data);
    }
    else {
      next(new Error("no data to fetch"));
    }


  }
  catch (err) {

    next(err)

  }




})


app.put('/complaint',CoordinatorAdminauthenticate,async (req, res, next) => {


  try {

    const { complaint_id, status, user_id, des } = req.body
    const result = await Timeline.create({ complaint_id, status, date: new Date() })
    const update1 = await Complaint.findByIdAndUpdate(complaint_id, { current_status: status }, { new: true })
    const io = req.app.get('socketio');
    const socketId = userSocketMap[update1.from];
    if (socketId) {
      socketId.map((each)=>{
        io.to(each).emit('dataChanged')
      })
    }

    if (status == "resolved") {



      const arr = await Promise.all(
        req.files.map(async (each) => {

          let imgresult = await cloudinary.uploader.upload(each.path, {
            folder: 'responses',
            public_id: each.path,
          });
          return imgresult.secure_url;

        })
      )

      const update = await Complaint.findByIdAndUpdate(complaint_id, { resolved_by: user_id, current_status: status, res_des: des, res_array: arr }, { new: true })
      const result = await Dtoken.find({ user_id: update.from })

      const responses = await Promise.all(result.map(async (each) => {


        if (each) {

          const message = arr.length > 0 ? {
            notification: {
              title: "Your Complaint Resolved",
              body: des.substring(0, 10),
              imageUrl: arr[0]
            },
            data: {
              title: "Your Complaint Resolved",
              body: des.substring(0, 10),
              imageUrl: arr[0]
            },
            token: each.token, // FCM device token
          } :
            {
              notification: {
                title: "Your Complaint is Resolved",
                body: des.substring(0, 10),
              },
              data: {
                title: "Your Complaint Resolved",
                body: des.substring(0, 10),
              },
              token: each.token, // FCM device token
            }
            ;
          console.log(message)

          const response = await admin.messaging().send(message)
            .then(respo => {
              return respo;
            })
            .catch(error => {
              console.error('Error sending message:', error);
            });
          return response;
        }
      }))


    }
    else {

      console.log(update1)
      const result = await Dtoken.find({ user_id: update1.from })
      console.log(result)
      const responses = await Promise.all(result.map(async (each) => {

        if (each) {

          const message = update1.image_array.length > 0 ? {
            notification: {
              title: "Your Complaint is Acknowledged",
              body: update1.issue,
              imageUrl: update1.image_array[0]
            },
            data: {
              title: "Your Complaint is Acknowledged",
              body: update1.issue,
              imageUrl: update1.image_array[0]
            },
            token: each.token, // FCM device token
          } :
            {
              notification: {
                title: "Your Complaint is Acknowledged",
                body: update1.issue,
              },
              data: {
                title: "Your Complaint is Acknowledged",
                body: update1.issue,
              },
              token: each.token, // FCM device token
            }
            ;
          console.log(message)

          const response = await admin.messaging().send(message)
            .then(respo => {
              return respo;
            })
            .catch(error => {
              console.error('Error sending message:', error);
            });
          return response;
        }
      }))
      console.log(responses)

    }

   

    res.json({ result, update1 })


  }
  catch (err) {
    next(err);
  }



})



app.get('/dashboard', CoordinatorAdminauthenticate,async (req, res, next) => {


  try {


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


    const repeatedComplaints = await Complaint.aggregate([
      {
        $match: {
          date: { $gte: currentMonthStart, $lte: currentMonthEnd }, // Filter by current month
        },
      },
      {
        $group: {
          _id: "$issue", // Group by issue
          count: { $sum: 1 }, // Count the number of occurrences
          anyComplaint: { $first: "$$ROOT" }, // Capture any one complaint
        },
      },
      {
        $match: {
          count: { $gt: 10 }, // Filter issues repeated more than 10 times
        },
      },
      {
        $project: {
          _id: 0, // Exclude the group ID
          issue: "$_id", // Rename _id to issue
          complaint: "$anyComplaint", // Include the captured complaint
        },
      },
    ]);
 
    const data = await Promise.all(repeatedComplaints.map(async (each) => {

      const { _id } = each.complaint;
     
      const time = await Timeline.find({ complaint_id: _id }).sort({ date: -1 });
      const user_details=await User.findOne({_id:each.complaint.from})
      return { ...each.complaint, time ,user_details}

    }))
  
    res.json({ monthlyRaisedCounts, categoryWiseCounts,data })



  }
  catch (err) {
    next(err)
  }


})




app.get('/admin-complaints', Adminauthenticate,async (req, res, next) => {


  try {

    const { role } = req.query;
    const { status, category, start, end } = req.query;
    let result = [];
    if (status == "Select a status" && category == "Select a category" && start == "" && end == "") {
      result = await Complaint.find({ level: { $gte: 2 } }).sort({ date: -1 }).limit(10)
    }
    else if (status != "Select a status" && category != "Select a category" && start != "" && end != "") {
      const startDate = new Date(start);
      const endDate = new Date(end + 'T23:59:59.999Z');

      result = await Complaint.find({ level: { $gte: 2 }, current_status: status, date: { $gte: startDate, $lte: endDate }, category }).sort({ date: -1 })

    }
    else if (status != "Select a status" && category != "Select a category" && start == "" && end == "") {

      result = await Complaint.find({ level: { $gte: 2 }, current_status: status, category }).sort({ date: -1 })
    }
    else if (status != "Select a status" && category == "Select a category" && start != "" && end != "") {

      const startDate = new Date(start);
      const endDate = new Date(end + 'T23:59:59.999Z');

      result = await Complaint.find({ level: { $gte: 2 }, current_status: status, date: { $gte: startDate, $lte: endDate } }).sort({ date: -1 })

    }
    else if (status == "Select a status" && category != "Select a category" && start != "" && end != "") {

      const startDate = new Date(start);
      const endDate = new Date(end + 'T23:59:59.999Z');

      result = await Complaint.find({ level: { $gte: 2 }, date: { $gte: startDate, $lte: endDate }, category }).sort({ date: -1 })

    }
    else if (start != "" && end != "") {
      const startDate = new Date(start);
      const endDate = new Date(end + 'T23:59:59.999Z');

      result = await Complaint.find({ level: { $gte: 2 }, date: { $gte: startDate, $lte: endDate } }).sort({ date: -1 })

    }
    else if (status != "Select a status") {
      result = await Complaint.find({ level: { $gte: 2 }, current_status: status }).sort({ date: -1 })

    }
    else if (category != "Select a category") {
      result = await Complaint.find({ level: { $gte: 2 }, category }).sort({ date: -1 })

    }
    else {
      result = await Complaint.find({ level: { $gte: 2 } }).sort({ date: -1 }).limit(10)
    }


    const data = await Promise.all(result.map(async (each) => {

      const { _id } = each;

      const time = await Timeline.find({ complaint_id: _id }).sort({ date: -1 });
      const user_details = await User.findOne({ _id: each.from })
      console.log(user_details);
      return { ...each, time, user_details, role: user_details.role }

    }))
    if (role == 'student') {
      const stu_data = data.filter(each => each.role == "student");
      res.json(stu_data);
    }
    else {
      const rep_data = data.filter(each => each.role == "coordinator");
      res.json(rep_data);
    }


  }
  catch (err) {
    next(err);
  }




})


app.get('/user', Userauthenticate,async (req, res, next) => {


  try {
    const { id, stu_id } = req.query;
    if (id) {

      const data = await User.findOne({ _id: id })
      res.json(data)
    }
    else if (stu_id) {
      const data = await User.findOne({ user_id: stu_id })
      res.json(data)

    }

  }
  catch (err) {
    next(err);

  }


})


app.post('/student', Adminauthenticate,async (req, res, next) => {


  try {


    const files = req.files;
    const { user_id, name, email, role, designation } = req.body;

    if (files.length <= 0) {

      if (user_id && name && email && role && designation) {
        const hashpassword = await bcrypt.hash('skjani314@A', 10);

        const result = await User.create({ user_id, name, email, designation, role, password: hashpassword });
        return res.json(result);
      }
      else {
        next(new Error("no file or data found to upload"));
      }
    } else {
      const workbook = xlsx.readFile(files[0].path);
      const hashpassword = await bcrypt.hash('skjani314@A', 10);

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(worksheet);
      fs.unlinkSync(files[0].path);
      const stu_data = data.map(each => { return { ...each, password: hashpassword } })
      console.log(stu_data)
      const response = await User.insertMany(stu_data);
      console.log(response)
      res.json("success");
    }
  }
  catch (err) {
    next(err);
  }



})


app.delete('/student', Adminauthenticate,async (req, res, next) => {

  try {

    const { batch, id, flag } = req.query;
    if (flag) {
      console.log(id)
      const result = await User.deleteOne({ _id: id });
      const com = await Complaint.find({ from: id });
      const comp_ids = com.map((each) => { return each._id })
      await Timeline.deleteMany({ complaint_id: { $in: comp_ids } })
      await Complaint.deleteMany({ from: id });

      res.json(result);

    }
    else {
      if (!batch || batch.length < 4 || batch[0] != 'O') next(new Error("batch is empty"));
      else {

        const studentsToDelete = await User.find({ user_id: { $regex: new RegExp(`^.*${batch}.*$`, 'i') } });
        console.log(batch)

        const studentIds = studentsToDelete.map(student => student._id);
        const stu_ro_ids = studentsToDelete.map(student => student.user_id);
        const com = await Complaint.find({ from: { $in: studentIds } });
        const comp_ids = com.map((each) => { return each._id })
        await Timeline.deleteMany({ complaint_id: { $in: comp_ids } })
        const trans_res = await Complaint.deleteMany({ user_id: { $in: stu_ro_ids } });

        const stu_res = await User.deleteMany({ _id: { $in: studentIds } });
        res.json({ stu_res, trans_res });
      }
    }
  }
  catch (err) {
    next(err);
  }

})


app.put('/student',Adminauthenticate, async (req, res, next) => {


  try {
    const { id, role } = req.body;
    console.log(req.body)
    if (id && role && role != "Select a Role") {

      const result = await User.findOneAndUpdate({ _id: id }, { role }, { new: true })
      console.log(result)
      res.json(result)
    }
    else {
      next(new Error("Unable to update"))
    }

  }
  catch (err) {

    next(err)
  }


})


app.get('/student', Adminauthenticate,async (req, res, next) => {

  try {
    const { user_id } = req.query;

    const response = await User.find({ user_id: { $regex: new RegExp(user_id, 'i') } });
    console.log(response)
    res.json(response);
  }
  catch (err) {
    next(err);
  }
})








async function updateComplaintLevels() {
  try {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 0);
    const startOfDay = new Date(twoDaysAgo);
    startOfDay.setHours(0, 0, 0, 0); // Start of the day
    const endOfDay = new Date(twoDaysAgo);
    endOfDay.setHours(23, 59, 59, 999); // End of the day

    const unresolvedComplaints = await Complaint.find({
      current_status: { $ne: 'resolved' },
      date: { $gte: startOfDay, $lte: endOfDay },
      level:1,
    });
    console.log(unresolvedComplaints)

    const update = await Promise.all(unresolvedComplaints.map(async (each) => {


      const result = await Complaint.findByIdAndUpdate(each._id, { level: 2 }, { new: true })
      return result;

    })
    )
    console.log(update)


  } catch (err) {
    console.error("Error updating complaint levels:", err);
  }
}

// setInterval(updateComplaintLevels, 24 * 60 * 60 * 1000);

const job = schedule.scheduleJob('0 0 * * *',{tz: 'Asia/Kolkata'}, updateComplaintLevels);




app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({ error: err });
});



server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
