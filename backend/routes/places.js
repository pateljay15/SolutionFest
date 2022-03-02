const express = require('express')
const router = express.Router()
const { workDoneOfPlace ,workDoneByNgo,createPlaces, linkPlaceWithNgo, getPlaceById, getPlacesByUserId, getPlacesByNgo, getPlace, getAllPlaces, photo } = require("../controllers/places")
const { getUserById, getUser, userUpdate, getNgoById } = require("../controllers/user")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")


router.param("userId", getUserById)

router.param("ngoId", getNgoById)

router.param("placeId", getPlaceById)

router.get("/place/:placeId", getPlace)
router.get("/place/photo/:placeId", photo)

router.get("/places", getAllPlaces)

router.post("/createPlace/:userId", isSignedIn, isAuthenticated, createPlaces)

router.post("/linkNgoWithPlace/:placeId/:ngoId", isSignedIn, isAuthenticated, linkPlaceWithNgo)

router.get("/getPlacesByNgo/:ngoId", isSignedIn, isAuthenticated, getPlacesByNgo)

router.get("/getPlacesByUserId/:userId", isSignedIn, isAuthenticated, getPlacesByUserId)

router.post("/workDoneByNgo/:placeId/:ngoId", isSignedIn, isAuthenticated, workDoneByNgo)

router.post("/workDoneOfPlace/:placeId/:userId", isSignedIn, isAuthenticated, workDoneOfPlace)



module.exports = router