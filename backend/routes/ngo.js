const express = require('express')
const router = express()


const { getUserById, getUser, getNgoById } = require("../controllers/user")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getNgo, getNgos } = require("../controllers/ngo")


router.param("ngoId", getNgoById)

router.get("/getNgo/:ngoId", getNgo)

router.get("/getNgos" , getNgos)

// router.get("/users",  getUsers)
module.exports = router