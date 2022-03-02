const jwt = require("jsonwebtoken");
const config = require("../config/auth");
const User = require("../models/user");

exports.isAuntheticatedUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            message: "Please Login to access resource"
        })
    }

    const decodedData = jwt.verify(token, config.secret)

    req.user = await User.findById(decodedData.id);
    next();
}

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role: ${req.user.role} is not allowed to access this resource`
            })
           
        }
        next();
    }
}

exports.verifySignUp = (req, res, next) => {
    User.findOne({
        name: req.body.name
    }).exec((err, user) => {
        if (err) {
            return res.status(500).send({ message: err });
        }

        if (user) {
            return res.status(400).send({ message: "Failed! Name is already in use!" });
        }

        // Email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                return res.status(500).send({ message: err });
            }

            if (user) {
                return res.status(400).send({ message: "Failed! Email is already in use!" });
            }

            next();
        });
    });
}
