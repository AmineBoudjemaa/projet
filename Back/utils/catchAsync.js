module.exports = function catchAsync(f){
    return (req,res,next)=>{
        f(req,res,next).catch(err=>{
            res.status(500).send(err);
        });
    };
};

