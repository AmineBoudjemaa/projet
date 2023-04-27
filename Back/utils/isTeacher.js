module.exports = (req, res, next) => {
    if (!(req.user.role === 'teacher')) {
        res.status(401).send({message:'you are not a teacher'});
    }
    next();
};