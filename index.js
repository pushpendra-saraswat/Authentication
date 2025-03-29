const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
var ObjectId = require('mongodb').ObjectId;
//const mongoosePaginate = require('mongoose-paginate');





const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser())



const connectDB = require('./Config/db');
 connectDB()
console.log("hekko uhere")
app.use('/',require('./Routes'))

//  app.post('/signup',async(req,res) => {
   
//     try{
//         const {Username, Email, password,role} = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
        
//         const user = await User.findOne( { Email: Email })
//         if(user){
//             return res.status(400).send("user already exist")
//         }
//         else{
//   const response =  await User.create({
//     Username:Username,
//     Email:Email,
//     password:hashedPassword,
//     role:role,
//     created_at:new Date(),
//    })
//    console.log(response);
//    res.status(201).send("Inserted data successfully");
// }
//     }
// catch(error){
//     console.error(error);
//     res.status(500).send("Server Error");
// }
// })

// app.post('/login', async (req, res) => {
  
//   try {
//     const { Email, password } = req.body;
//     // Check if the user exists
//         console.log('Emailuuuuuuuuuuuuuuuu========================', Email);
//         console.log('password', password);
//         const user = await User.findOne({ Email: Email });
//         if (!user) {
//             return res.status(401).json({ error: "Invalid email or password" });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ error: "Invalid email or password" });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ ID: user._id }, 'jwt-key', { expiresIn: '1h' });

//         // Set token in a cookie and send response
//         console.log('token', token);
//         res.cookie('token', token, { httpOnly: true });
//         res.json({success:true, message: "Login successful", name: user.Username });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


// app.post('/addplayer',authenticateJWT, async(req,res)=>{
   
//        try{
//         const {Player_name,Player_game,Starting_price} = req.body;
//         const user = req.user.ID;
//         console.log("my token ",user)
//      const response1 = await Player.create({
//         Player_name:Player_name,
//         Starting_price:Starting_price,
//         Player_game:Player_game,
//         User_Id:user,
//      })
//      console.log(response1);
//      res.status(201).send("Inserted data successfully");
//        }
//        catch(error){
//         console.error(error);
//          res.status(500).send("Server Error");
//        }
// })

// const paginationMiddleware = (pageSize) => {
//   return (req, res, next) => {
//     const pageNumber = parseInt(req.query.page) || 1; // Get the current page number from the query parameters
//     const startIndex = (pageNumber - 1) * pageSize;
//     const endIndex = startIndex + pageSize;

//     // Attach pagination data to the request object
//     req.pagination = {
//       page: pageNumber,
//       limit: pageSize,
//       startIndex,
//       endIndex
//     };

//     next(); // Call the next middleware
//   };
// };

// app.get('/allplayer',authenticateJWT,paginationMiddleware(4), async(req,res)=>{
//     try{
//         const response3 = await Player.find({});
//         console.log(response3);
//         const { startIndex, endIndex } = req.pagination;
//         const users = response3.slice(startIndex, endIndex);
      
//         res.json({ users, total: response3.length });
        

//     } catch(error){
//         res.status(500).json({message:error.message})
//         return;
//     }
// })

// app.get('/getplayerbyId',authenticateJWT,async(req,res)=>{
//     try{
//         const user = req.user.ID;
//         console.log('user', typeof(user));
        
//         const userObjectId = new ObjectId(user);
//        console.log('rrr',typeof(userObjectId));
//         const response4 = await Player.findById({User_Id:userObjectId});
//                 console.log(response4);
//         res.status(200).json(response4);
//     }
//     catch(error){
//         res.status(500).json({message:error.message})
//         return;
//     }
// })
// app.put('/updateplayer/:playerid', authenticateJWT, async (req, res) => {
  
//   try {
//       const userId = req.user.ID;
//       const playerId =req.params.playerid;
//       const userObjectId = new ObjectId(userId);
//       const playerObjectId = new ObjectId(playerId);
  
//       const player = await Player.findOne({ User_Id: userObjectId, _id: playerObjectId });
//       if (!player) {
//         return res.status(404).json({ message: 'Player not found' });
//       }
  
//       const updateData = {
//         Player_name: req.body.Player_name,
//         Player_price: req.body.Player_price,
//         Player_game: req.body.Player_game,
//       };
  
//       const response = await Player.updateOne(
//         { User_Id: userObjectId, _id: playerObjectId },
//         { $set: updateData }
//       );
  
//       if (response.matchedCount === 0) {
//         return res.status(404).json({ message: 'Player not found or no changes made' });
//       }
  
//       res.status(200).json({ message: 'Player updated successfully' });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  
  
//   app.delete('/deleteplayer', authenticateJWT, async(req,res)=>{
//     const user = req.user.ID;
//     const id = "665ca85c14c1799572822038"; 
//     try {
//         const userObjectId = new ObjectId(user);
//       const playerObjectId = new ObjectId(id);
     
//         const response = await Player.deleteOne(
//             { User_Id: userObjectId, _id: playerObjectId },
//           );
    
//         res.status(200).json({ message: 'Player deleted successfully' });
//       }
//       catch(error){
//         res.status(500).json({ message: error.message });
//       }
//   })
  
//    app.put('/changeprice',authenticateJWT, async(req,res)=>{
//     const userId = req.user.ID;
//     const playerId = "665f3a93a7d09753ed836bb8";
    
//     try {
//       const userObjectId = new ObjectId(userId);
//       const playerObjectId = new ObjectId(playerId);
  
//       const player = await Player.findOne({ _id: playerObjectId });
     
//     if(player && player.Current_price < req.body.Current_price){
//       const updateData = {
//         Current_price:req.body.Current_price,
//         bid_UserID: userObjectId,
//       };
  
//       const response = await Player.updateOne(
//         { _id: playerObjectId },
//         { $set: updateData }
//       );
//       return response ;
//     }
//    else{
//     res.send("u r not eligible")
//    }
     
    
  
      
    
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//    })

//  app.post('/addbid',authenticateJWT, async(req,res)=>{
//   const userId = req.user.ID;
//   const playerId = "665f3a93a7d09753ed836bb8";
   
//   try{
//     const userObjectId = new ObjectId(userId);
//       const playerObjectId = new ObjectId(playerId);
//       const response7 = await Bid.create({
//           User_Id:userObjectId,
//           Player_id:playerObjectId,
//           bid_amount:req.body.bid_amount,
//       })
//       console.log(response7);
//       res.status(201).send("Inserted data successfully");
//   }
//  catch(error){
//    console.log(error);
//    res.send("server error");
//  }

//  })

//  app.get('/allbid',authenticateJWT, async(req,res)=>{
//   try{
//     const response3 = await Bid.find({});
//     console.log(response3);
//     res.json(response3);
//   }
//   catch(error){
//     res.status(500).json({message:error.message})
//     return;
//   }
//  })
//  app.get('/getbidofPlayer/:playerid', authenticateJWT, async (req, res) => {
//   try {
//     const playerId = req.params.playerid;
//     console.log("player",playerId)
  

//     // If Player_id is stored as ObjectId in the database
//     let PlayerObjectId;
//     try {
//       PlayerObjectId = new ObjectId(playerId);
//     } catch (error) {
//       return res.status(400).json({ message: "Invalid playerId format" });
//     }
//     console.log('Converted PlayerObjectId:', PlayerObjectId);

//     // Ensure to use the correct field name and query format
//     const response4 = await Bid.find({ Player_id: PlayerObjectId });
//     console.log('Query result:', response4);

//     res.status(200).json(response4);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
//  app.put('/changebid',authenticateJWT, async(req,res)=>{
//   const userId = req.user.ID;
//   const playerId = "665f3a93a7d09753ed836bb8";
//   try{
//     const userObjectId = new ObjectId(userId);
//     const playerObjectId = new ObjectId(playerId);

//     const bid = await Bid.findOne({ Player_id: playerObjectId, User_Id: userObjectId});
//       if (!bid) {
//         return res.status(404).json({ message: 'Bid not found' });
//       }
//       if(bid.bid_amount > req.body.bid_amount){
//         return res.send("Bid Price is smaller than previous price");
//       }
//       else{
//         const updateData = {
//           bid_amount:req.body.bid_amount,
//         };
    
//         const response = await Bid.updateOne(
//           { Player_id: playerObjectId , User_Id: userObjectId},
//           { $set: updateData }
//         );
      
    
//         if (response.matchedCount === 0) {
//           return res.status(404).json({ message: 'Bid not found or no changes made' });
//         }
    
//         res.status(200).json({ message: 'Bid updated successfully' });
//       }
//   }
//   catch(error){
//     res.status(500).json({ message: error.message });
//   }
//  })

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});




