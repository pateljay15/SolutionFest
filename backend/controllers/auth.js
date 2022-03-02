const User = require('../models/user')
const Ngo = require("../models/ngo")
const { check, validationResult} = require("express-validator")
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


exports.signup = (req, res) => {

    // all the errors if raised in validation part will be binded into the req part
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        })
    }

    const user = new User(req.body)
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: "NOT able to save user in DB"
            })
        }
        res.json({
            firstname: user.firstname,
            email: user.email,
            id: user._id
        })
    })
}


exports.ngosignup = (req, res) => {

    // all the errors if raised in validation part will be binded into the req part
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        })
    }

    const ngo = new Ngo(req.body)
    ngo.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: "NOT able to save user in DB"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
}


exports.signin = (req, res) => {
    const { email, password} = req.body

    // all the errors if raised in validation part will be binded into the req part
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        })
    }

    User.findOne({ email }, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "USER email does not exists"
            })
        }

        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        //create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        //put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999})

        //send response to front end
        const {_id, firstname, email, role} = user
        return res.json({token, user: {_id, firstname, email, role}})
    })
}


exports.ngosignin = (req, res) => {
    const { email, password} = req.body

    // all the errors if raised in validation part will be binded into the req part
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        })
    }

    Ngo.findOne({ email }, (err, ngo) => {
        if(err || !ngo) {
            return res.status(400).json({
                error: "USER email does not exists"
            })
        }

        if(!ngo.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }

        //create token
        const token = jwt.sign({_id: ngo._id}, process.env.SECRET)
        //put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999})

        //send response to front end
        const {_id, name, email, role} = ngo
        return res.json({token, user: {_id, name, email, role}})
    })
}

exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "user signout successful"
    })
}

exports.ngosignout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "ngo signout successful"
    })
}


// protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
    // requestProperty: "auth"
})


// custom middlewares
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        // console.log("no token")
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }
    next()
}



exports.isAuthorizedToAccessFile = (req, res, next) => {
    let id = req.params.fileId
    let found = 0;
    console.log(id)
    File.findById(id).exec().then(data => {
        console.log(data)
        data.accessList.forEach(u_id => {
            console.log(u_id)
            console.log(req.params.userId)
            if(u_id == req.params.userId) {
                console.log("succed")
                found = 1
                next()
            }
        })
        if(found == 0) {
            console.log("sorry")
            return res.status(403).json({
                error: "ACCESS DENIED"
            })
        }
    }).catch(err => {
        console.log(err)
    })
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "You are not ADMIN, Access denied"
        })
    }
    next()
}


