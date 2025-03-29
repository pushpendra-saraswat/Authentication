const Player = require('../Models/Player');
const CustomError = require('../libs/error');
var ObjectId = require('mongodb').ObjectId;
exports.addingPlayer = async(userData,userId)=>{
    
    try{
        const {Player_name,Player_game,Starting_price} = userData;
        const user = userId;
        console.log("first",user)
       
     const response1 = await Player.create({
        Player_name:Player_name,
        Starting_price:Starting_price,
        Player_game:Player_game,
        User_Id:user,
     })
     console.log(response1);
     return response1;
     
       }
       catch(error){
        console.error("Error:", error);
           throw error
       }
}

exports.alladdedPlayer = async()=>{
   try{
      const response3 = await Player.find({});
      console.log(response3);
      return response3;
      
  } catch(error){
    console.error("Error:", error);
    throw error
  }
}
 
exports.PlayerById = async(userId)=>{
   try{
    const user = userId;
      console.log('user', typeof(user));
      
      const userObjectId = new ObjectId(user);
     console.log('rrr',typeof(userObjectId));
      const response4 = await Player.findById({User_Id:userObjectId});
      console.log(response4);
      return response4;
  }
  catch(error){
    console.error("Error:", error);
    throw error
  }
}

exports.UpdatingPlayer = async(userData,userId,PlayerId)=>{
   try {
      const user = userId;
      const playert = PlayerId;
      const userObjectId = new ObjectId(user);
      const playerObjectId = new ObjectId(playert);
      const {Player_name,Player_game,Starting_price,Current_price} = userData;
  
      const player = await Player.findOne({ User_Id: userObjectId, _id: playerObjectId });
     
      const updateData = {
        Player_name: Player_name,
        Starting_price: Starting_price,
        Player_game:Player_game,
        Current_price: Current_price,
      };
  
      const response = await Player.updateOne(
        { User_Id: userObjectId, _id: playerObjectId },
        { $set: updateData }
      );
      console.log(response);
           return response;
    } catch (error) {
      console.error("Error:", error);
    throw error
    }
  }

  exports.DeletedPlayers = async(userId,playerid)=>{
   const user = userId;
   const id = playerid;
   try {
    
       const userObjectId = new ObjectId(user);
     const playerObjectId = new ObjectId(id);
    
       const response = await Player.deleteOne(
           { User_Id: userObjectId, _id: playerObjectId },
         );
   
       return response;
     }
     catch(error){
      throw error;
     }
 }

 exports.ChangedPrice = async(userData,userId,playerid)=>{
   const userIdt = userId;
    const playerId = playerid;
    
    try {
      const {Current_price} = userData;
      const userObjectId = new ObjectId(userIdt);
      const playerObjectId = new ObjectId(playerId);
  
      const player = await Player.findOne({ _id: playerObjectId });
      console.log("lala");
     
    if(player && player.Current_price < Current_price){
      const updateData = {
        Current_price:Current_price,
        bid_UserID: userObjectId,
      };
  
      const response = await Player.updateOne(
        { _id: playerObjectId },
        { $set: updateData }
      );
      console.log(response);
      return response ;
    }
   
     
    
  
      
    
    } catch (error) {
      throw error;
    }
   }