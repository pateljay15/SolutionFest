require('dotenv').config()
// const realTimeNotify = require("./controllers/realTimeNotify")

const mongoose = require('mongoose')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
// const multer = require("multer")

// const { sendEmail } = require("./controller/ses")
app.use(cors())


// My Routes
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const placeRoutes = require("./routes/places")
const ngoRoutes = require("./routes/ngo")

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'files');
//     },
//     filename: (req, file, cb) => {
//       cb(null, new Date().getTime().toString() + '-' + file.originalname);
//     }
//   });


// app.use(multer({ storage: fileStorage }).single("uploadFile"))


// DB Connection
mongoose.connect("mongodb+srv://pateljay15:pateljay15@cluster0.n9rmr.mongodb.net/hackathon?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => {
    console.log("DB CONNECTED")
}).catch((error) => {
    console.log(error)
})

// Middleware
app.use(bodyParser.json())
app.use(cookieParser())

// My Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", placeRoutes)
app.use("/api", ngoRoutes)

// sendEmail()
// .then(data => {
//     console.log("success")
//     console.log(data)
// })
// .catch(err => {
//     console.log(err)
// })


// PORT
const port = process.env.PORT || 8000


// Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`)
})