const jwt = require("jsonwebtoken");
const authMiddleware=(req,res,next)=>{
    try{
        const token=req.header("Authorization");
        if(!token){
            return res.status(401).json({
                message : "Acess denied"
            });
        } 
        const verified=jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user=verified;
        next();
    }catch(err){
        res.status(500).json({
            message : err.message
        });
    }
};

module.exports=authMiddleware;