const appErr = require('./appErr')

module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send({message:"you're not logged in"})
    }
    next();
}