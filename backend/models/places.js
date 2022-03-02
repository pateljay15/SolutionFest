const mongoose = require('mongoose')

const placesSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    address: {
        type: String
    },
    uploadBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    peopleNeeded: {
        type: Number
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    ngoAssigned: {
        type: mongoose.Types.ObjectId,
        ref: "Ngo"
    },
    workDone: Boolean,
    workDoneByNgo: Boolean,
    State: String,
    City: String,
    pincode: Number
}, {timestamps: true} )


module.exports = mongoose.model("Places", placesSchema)