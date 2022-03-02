const User = require('../models/user')
const Ngo = require("../models/ngo")
const Places = require("../models/places")
const cron = require('node-cron')

const { sendEmail } = require("../controllers/ses")
const places = require('../models/places')


cron.schedule("*/10 * * * * *", () => {
    // console.log("cron job")
    Places.find().exec()
    .then(places => {
        return places
    })
    .then(places => {
        Ngo.find().exec()
        .then(ngos => {
            places.forEach(place => {
                ngos.forEach(ngo => {
                    if(place.pincode == ngo.ngoDetails.pincode && place.peopleNeeded <= ngo.ngoDetails.noOfActiveMembers
                         && place.workDone == false) {
                            let emailData = {
                                subject: 'Places need to be revived around you',
                                text: `Place ${place.name} located at ${place.address} is under coverage of your NGO ${ngo.name} . So if you are interested in making it a better place again, you can accept that work by visiting the website. Thank you`
                            }
                        console.log(emailData)
                        sendEmail(emailData, ngo.email)
                        .then(data => console.log(data))
                        .catch(err => console.log(err))
                    }
                })
            });
        })
    }).catch(err => console.log(err))
})