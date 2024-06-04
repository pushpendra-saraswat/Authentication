const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
var ObjectId = require('mongodb').ObjectId;



const User = require('./Models/Signup');
const Player = require('./Models/Player');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser())



const connectDB = require('./Config/db');
 connectDB()



 app.post('/signup',async(req,res) => {
   
    try{
        const {Username, Email, password,role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.findOne( { Email: Email })
        if(user){
            return res.status(400).send("user already exist")
        }
        else{
  const response =  await User.create({
    Username:Username,
    Email:Email,
    password:hashedPassword,
    role:role,
    created_at:new Date(),
   })
   console.log(response);
   res.status(201).send("Inserted data successfully");
}
    }
catch(error){
    console.error(error);
    res.status(500).send("Server Error");
}
})

app.post('/login', async (req, res) => {
    const { Email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ Email: Email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ ID: user._id }, 'jwt-key', { expiresIn: '1h' });

        // Set token in a cookie and send response
        console.log('token', token);
        res.cookie('token', token, { httpOnly: true });
        res.json({ message: "Login successful", name: user.Username });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const authenticateJWT = (req,res,next)=>{
    // const token = req.cookies.token;
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log('token', token)
    
    if(!token){
        return res.sendstatus(401);
    }
    jwt.verify(token, 'jwt-key',(err,user)=>{
        if(err){
            res.sendStatus(403);
        }
        req.user=user;
         next();
    });
}


app.post('/addplayer',authenticateJWT, async(req,res)=>{
    const {Player_name,Player_game,Starting_price} = req.body;
    const user = req.user.ID;
    console.log("my token ",user)
       try{
     const response1 = await Player.create({
        Player_name:Player_name,
        Starting_price:Starting_price,
        Player_game:Player_game,
        User_Id:user,
     })
     console.log(response1);
     res.status(201).send("Inserted data successfully");
       }
       catch(error){
        console.error(error);
         res.status(500).send("Server Error");
       }
})


app.get('/allplayer',authenticateJWT,async(req,res)=>{
    try{
        const response3 = await Player.find({});
        res.status(200).json(response3);
        

    } catch(error){
        res.status(500).json({message:error.message})
        return;
    }
})

app.get('/getplayerbyId',authenticateJWT,async(req,res)=>{
    try{
        const user = req.user.ID;
        console.log('user', typeof(user));
        
        const userObjectId = new ObjectId(user);
       console.log('rrr',typeof(userObjectId));
        const response4 = await Player.find({User_Id:userObjectId});
                console.log(response4);
        res.status(200).json(response4);
    }
    catch(error){
        res.status(500).json({message:error.message})
        return;
    }
})
app.put('/updateplayer', authenticateJWT, async (req, res) => {
    const userId = req.user.ID;
    const playerId = "665b2ed90ff323ce9841f93e";
  
    try {
      const userObjectId = new ObjectId(userId);
      const playerObjectId = new ObjectId(playerId);
  
      const player = await Player.findOne({ User_Id: userObjectId, _id: playerObjectId });
      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }
  
      const updateData = {
        Player_name: req.body.Player_name,
        Player_price: req.body.Player_price,
        Player_game: req.body.Player_game,
      };
  
      const response = await Player.updateOne(
        { User_Id: userObjectId, _id: playerObjectId },
        { $set: updateData }
      );
  
      if (response.matchedCount === 0) {
        return res.status(404).json({ message: 'Player not found or no changes made' });
      }
  
      res.status(200).json({ message: 'Player updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
  app.delete('/deleteplayer', authenticateJWT, async(req,res)=>{
    const user = req.user.ID;
    const id = "665ca85c14c1799572822038"; 
    try {
        const userObjectId = new ObjectId(user);
      const playerObjectId = new ObjectId(id);
     
        const response = await Player.deleteOne(
            { User_Id: userObjectId, _id: playerObjectId },
          );
    
        res.status(200).json({ message: 'Player deleted successfully' });
      }
      catch(error){
        res.status(500).json({ message: error.message });
      }
  })
  
   app.put('/changeprice',authenticateJWT, async(req,res)=>{
    const userId = req.user.ID;
    const playerId = "665f3a93a7d09753ed836bb8";
    
    try {
      const userObjectId = new ObjectId(userId);
      const playerObjectId = new ObjectId(playerId);
  
      const player = await Player.findOne({ _id: playerObjectId });
      if (!player) {
        return res.status(404).json({ message: 'Player not found' });
      }
  
      const updateData = {
        Current_price:req.body.Current_price,
        bid_UserID: userObjectId,
      };
  
      const response = await Player.updateOne(
        { _id: playerObjectId },
        { $set: updateData }
      );
  
      if (response.matchedCount === 0) {
        return res.status(404).json({ message: 'Player not found or no changes made' });
      }
  
      res.status(200).json({ message: 'Player updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
   })


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});




