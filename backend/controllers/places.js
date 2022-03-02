const User = require('../models/user')
const Ngo = require("../models/ngo")
const Places = require("../models/places")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

const { sendEmail } = require("../controllers/ses")


// const nodeMailer = require("nodemailer");
// const defaultEmailData = { from: "noreply@node-react.com" };

// const sendEmail = emailData => {
//     const transporter = nodeMailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         requireTLS: true,
//         auth: {
//             user: "cryptotracker15@gmail.com",
//             pass: "crypto_tracker_jsa_15"
//         }
//     });
//     return (
//         transporter
//             .sendMail(emailData)
//             .then(info => console.log(`Message sent: ${info.response}`))
//             .catch(err => console.log(`Problem sending email: ${err}`))
//     );
// };


exports.createPlaces = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error: "problem with image"
            })
        }

        //destructure the field
        const { name, description, address, uploadBy, peopleNeeded, ngoAssigned } = fields

        if(!name || !description || !address || !uploadBy || !peopleNeeded){
            return res.status(400).json({
                error: "Please include all fields"
            })
        }
        
        //TODO: restrictions on field
        let places = new Places(fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size too big!"
                })
            }
            places.photo.data = fs.readFileSync(file.photo.path)
            places.photo.contentType = file.photo.type
        }
        places.workDone = false
        places.workDoneByNgo = false
        //save to the DB
        places.save((err, place) => {
            if(err) {
                console.log(err)
                return res.status(400).json({
                    error: "Save place in DB failed"
                })
            }
            res.json(place)
        })
    })
}

exports.getPlaceById = (req, res, next, id) => {
    Places.findById(id)
    // .populate("category")
    .exec((err, place) => {
        if(err) {
            return res.status(400).json({
                error: "Place not found"
            })
        }
        req.place = place
        next()
    })
}

exports.getPlace = (req, res) => {
    req.place.photo = undefined
    return res.json(req.place)
}


exports.photo = (req, res, next) => {
    if(req.place.photo.data) {
        res.set("Content-Type", req.place.photo.contentType)
        return res.send(req.place.photo.data)
    }
    next()
}

exports.getAllPlaces = (req, res) => {
    Places.find()
    .select("-photo")
    .populate("uploadBy")
    .exec((err, places) => {
        if(err) {
            return res.status(400).json({
                error: "NO product FOUND"
            })
        }
        res.json(places)
    })
}


exports.getPlacesByNgo = (req, res) => {
    Places.find({ ngoAssigned: req.params.ngoId })
    .select("-photo")
    .populate("uploadBy")
    .exec((err, places) => {
        if(err) {
            return res.status(400).json({
                error: "NO product FOUND"
            })
        }
        res.json(places)
    })
}

exports.getPlacesByUserId = (req, res) => {
    Places.find({ uploadBy: req.params.userId })
    .select("-photo")
    .populate("uploadBy")
    .exec((err, places) => {
        if(err) {
            return res.status(400).json({
                error: "NO product FOUND"
            })
        }
        res.json(places)
    })
}




exports.linkPlaceWithNgo = (req, res) => {
    Places.findById(req.params.placeId).exec()
    .then(place => {
        place.ngoAssigned = req.profile._id

        return place.save()
    })
    .then(result => {
        return res.status(200).json({
            msg: "Ngo Linked with place"
        })
    }).catch(err => console.log(err))
}


exports.workDoneByNgo = (req, res) => {
    Places.findById(req.params.placeId).populate("uploadBy ngoAssigned").exec()
    .then(place => {
        // const emailData = {
        //     from: '"noreply@node-react.com" <cryptotracker15@gmail.com>',
        //     to: place.uploadBy.email,
        //     subject: 'NGO work Completed',
        //     text: `work at ${place.name} is completed by NGO ${place.ngoAssigned.name} `
        // };
        let emailData = {
            subject: 'NGO work Completed',
            text: `work at ${place.name} is completed by NGO ${place.ngoAssigned.name} `
        }

        sendEmail(emailData, place.uploadBy.email).then(data => console.log(data))
        .catch(err => console.log(err))
        
        place.workDoneByNgo = true
        return place.save()
    })
    .then(result => {
        return res.status(200).json({
            msg: "Email Sent"
        })
    }).catch(err => console.log(err))
}

exports.workDoneOfPlace = (req, res) => {
    Places.findById(req.params.placeId).populate("uploadBy ngoAssigned").exec()
    .then(place => {
        place.workDone = true
        return place.save()
    })
    .then(result => {
        return res.status(200).json({
            msg: "work completed"
        })
    }).catch(err => console.log(err))
}