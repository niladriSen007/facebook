import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import UserDetails from "./model/userDetails.js";
import bodyParser from'body-parser';
import userRoutes from "./router/auth.js"
import postRoutes from "./router/post.js"
import fs from "fs"
import path from "path"
const __dirname = path.resolve();
import multer from 'multer';
import helmet from "helmet"
import morgan from "morgan"
dotenv.config({path:"./.env"})
const PORT = process.env.PORT || 4000;
const app=express();

//Database connection using mongoDbAtlas
import("./database/connection.js")




// //middleWare 
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(morgan("common"))
app.use("/",userRoutes)
app.use("/posts",postRoutes)
app.use("/images",express.static(path.join(__dirname,"public/images")))
// console.log(__dirname)


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage});
app.post("/upload",upload.single("file"),(req,res)=>{
    try
    {
        return res.status(200).json("File Uploaded Successfully")
    }
    catch(e)
    {
        console.log(e)
    }
})


//linking the auth.js file to app.js file
// app.use(auth)


  
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/tmp/my-uploads')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
  
//   const upload = multer({ storage: storage })
  
// var upload = multer({ storage: storage });


app.get('/', (req, res) => {
    res.send("Hi")
    // UserDetails.find({}, (err, items) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send('An error occurred', err);
    //     }
    //     else {
    //         res.render('imagesPage', { items: items });
    //     }
    // });
});

// upload.single('image'),
// app.post('/upload',  (req, res, next) => {
//     res.send("iI'm in post")
//     var obj = {
//         userName: req.body.userName,
//         email:req.body.password,
//         password:req.body.password,
//         confirmPassword:req.body.confirmPassword,
//         coverImg: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/cover' + req.file.filename)),
//             contentType: 'image/png'
//         },
//         profileImg: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/profile' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     }
//     UserDetails.create(obj, (err, item) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             // item.save();
//             res.redirect('/');
//         }
//     });
// });


app.listen(PORT,()=>{
    console.log("Server is running")
})