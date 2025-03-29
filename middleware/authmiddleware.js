const CustomError = require('../libs/error');
const jwt = require('jsonwebtoken');
exports.authenticateJWT = (req,res,next)=>{
    try{ 
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log('token', token)
    
    if(!token){
                   res.locals.isAuthenticated=false;
                     return  res.sendStatus(403).json('token not found');
    }
    jwt.verify(token, 'jwt-key',(err,user)=>{
        if(err){
            res.locals.isAuthenticated=false;
          return  res.sendStatus(403);
        }
        req.user=user;
        res.locals.isAuthenticated=true;
         next();
    });

    }
    catch(error){
      console.error("Error:", error);
      throw error
}
}