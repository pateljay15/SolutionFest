const Ngo = require("../models/ngo")


exports.getNgo = (req, res) => {
    // TODO get back here for password
    req.profile.salt = undefined
    req.profile.encry_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    return res.json(req.profile)
}


exports.getNgos = (req, res) => {
    Ngo.find().exec((err, ngos) => {
        if(err || !ngos){
            return res.status(400).json({
                error: "No Ngos found"
            })
        }
        return res.json(ngos)
    })
}

