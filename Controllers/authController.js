const { authService } = require("../Services");

exports.SignUpUser = (async(req,res)=>{
    try{
     
       const response= await authService.SignUpUser(req.body);
       return res.send('success').json(response)
       
    }
    catch(e){
        console.log("e: ", e?.message);
        return res.status(e?.code || 500).json({message:e?.message || "Internal server error"})
    }
});

exports.LoginUser=async(req,res)=>{
    try{
    // const userid= req.user.iD
        const response= await authService.LoginUser(req.body);
        res.cookie('token', response?.token, { httpOnly: true });
       return res.status(200).json(response?.name)
    }
    catch(e){
        console.log("e: ", e?.message);
        return res.status(e?.code || 500).json({message:e?.message || "Internal server error"})
    }
};