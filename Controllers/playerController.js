const { playerService } = require("../Services");
const CustomError = require("../libs/error");
const User = require('../Models/Signup');

exports.addingPlayer = (async(req,res)=>{
    try{
        if(!res.locals.isAuthenticated){
            throw new CustomError("user not authorized" , 401)
        }
       const userID=req.user.ID;
       console.log('userID: ', userID);
       const userDATA = await User.findById(userID)
       console.log('user: ', userDATA);
       if (userDATA.role !== 'admin') throw new CustomError('You dont have permission', 401)

       const response= await playerService.addingPlayer(req.body,userID);
       return res.status(200).json(response)
       
    }
    catch(e){
        console.log("e: ", e?.message);
        return res.status(e?.code || 500).json({message:e?.message || "Internal server error"})
    }
});

exports.alladdedPlayer = (async(req,res)=>{
    try{
     
        const response= await playerService.alladdedPlayer();
        return res.json(response)
        
     }
     catch(e){
         console.log("e: ", e?.message);
         return res.status(e?.code || 500).json({message:e?.message || "Internal server error"})
     }
})

exports.PlayerById = (async(req,res)=>{
    try{
        if(!res.locals.isAuthenticated){
            throw new CustomError("user not authorized" , 401)
        }
         const userID=req.user.ID;
     
        const response= await playerService.PlayerById(userID);
        return res.send('success').json(response)
        
     }
     catch(e){
         console.log("e: ", e?.message);
         return res.status(e?.code || 500).json({message:e?.message || "Internal server error"})
     }
})

exports.UpdatingPlayer = (async(req,res)=>{
    try{
        if(!res.locals.isAuthenticated){
            throw new CustomError("user not authorized" , 401)
        }
        const userID=req.user.ID;
        const playerId = req.params.id;

        const response = await playerService.UpdatingPlayer(req.body,userID,playerId)
        return res.send('success').json(response)
    }
    catch(e){
        console.log("e: ", e?.message);
        return res.status(e?.code || 500).json({message:e?.message || "Internal server error"})
    }
})

exports.DeletedPlayer = (async(req,res)=>{
    try{
        if(!res.locals.isAuthenticated){
            throw new CustomError("user not authorized" , 401)
        }
        const userID=req.user.ID;
        const playerId = req.params.id;
        console.log('userID: ', userID);
    const userDATA = await User.findById(userID)
    console.log('user: ', userDATA);
    if (userDATA.role !== 'admin') throw new CustomError('You dont have permission', 401)
         
        const response = await playerService.DeletedPlayers(userID,playerId)
        return res.send(' Player deleted successfully').json(response)
    }
    catch(e){
        console.log("e: ", e?.message);
        return res.status(e?.code || 500).json({message:e?.message || "Internal server error"})
    }
})

exports.ChangedPrice = (async(req,res)=>{
    try{
        if(!res.locals.isAuthenticated)
            {
                throw new CustomError("user not authorized" , 401)
            }
            const userID=req.user.ID;
        const playerId = req.params.id;
        console.log("hello");

        const response = await playerService.ChangedPrice(req.body,userID,playerId)
        return res.send(' Current price changed successfully').json(response)
        console.log('haha');
    }
    catch(e){
        console.log("e: ", e?.message);
        return res.status(e?.code || 500).json({message:e?.message || "Internal server error"})
    
    }
})

