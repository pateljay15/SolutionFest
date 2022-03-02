const express = require('express')
const router = express.Router()
const { check, validationResult} = require("express-validator")
const { signout, signup, signin, isSignedIn, ngosignup, ngosignin, ngosignout } = require("../controllers/auth")


router.post("/signup",[
    check("firstname", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
], signup)

router.post("/signin",[
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
], signin)

router.get("/signout", signout)

router.post("/ngosignup",[
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
], ngosignup)

router.post("/ngosignin",[
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
], ngosignin)

router.get("/ngosignout", ngosignout)

router.get("/test", isSignedIn, (req, res) => {
    console.log(req.auth)
    res.send("successful")
})

module.exports = router