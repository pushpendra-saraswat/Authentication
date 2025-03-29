exports.AddedBids = async(req,res)=>{
    const userId = req.user.ID;
  const playerId = req.params.playerid;
   
  try{
    const userObjectId = new ObjectId(userId);
      const playerObjectId = new ObjectId(playerId);
      const response7 = await Bid.create({
          User_Id:userObjectId,
          Player_id:playerObjectId,
          bid_amount:req.body.bid_amount,
      })
      console.log(response7);
      res.status(201).send("Inserted data successfully");
  }
 catch(error){
   console.log(error);
   res.send("server error");
 }

 }

 exports.AllTotalBids = async(req,res)=>{
    try{
        const response3 = await Bid.find({});
        console.log(response3);
        res.json(response3);
      }
      catch(error){
        res.status(500).json({message:error.message})
        return;
      }
     }

exports.getPlayerBid = async(req,res)=>{
    try {
        const playerId = req.params.playerid;
        console.log("player",playerId)
      
    
        // If Player_id is stored as ObjectId in the database
        let PlayerObjectId;
        try {
          PlayerObjectId = new ObjectId(playerId);
        } catch (error) {
          return res.status(400).json({ message: "Invalid playerId format" });
        }
        console.log('Converted PlayerObjectId:', PlayerObjectId);
    
        // Ensure to use the correct field name and query format
        const response4 = await Bid.find({ Player_id: PlayerObjectId });
        console.log('Query result:', response4);
    
        res.status(200).json(response4);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }

exports.ChangingBid = async(req,res)=>{
    const userId = req.user.ID;
  const playerId = "665f3a93a7d09753ed836bb8";
  try{
    const userObjectId = new ObjectId(userId);
    const playerObjectId = new ObjectId(playerId);

    const bid = await Bid.findOne({ Player_id: playerObjectId, User_Id: userObjectId});
      if (!bid) {
        return res.status(404).json({ message: 'Bid not found' });
      }
      if(bid.bid_amount > req.body.bid_amount){
        return res.send("Bid Price is smaller than previous price");
      }
      else{
        const updateData = {
          bid_amount:req.body.bid_amount,
        };
    
        const response = await Bid.updateOne(
          { Player_id: playerObjectId , User_Id: userObjectId},
          { $set: updateData }
        );
      
    
        if (response.matchedCount === 0) {
          return res.status(404).json({ message: 'Bid not found or no changes made' });
        }
    
        res.status(200).json({ message: 'Bid updated successfully' });
      }
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
 }