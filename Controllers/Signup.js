const User = require('../Models/Signup')
const bcrypt = require('bcryptjs');
export async function createuser(req,res) {
    if (!Username || !email || !password) {
        return res.status(400).json({ error: 'Please provide name, email, and password' });
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
   await User.create({
    Username: req.body.Username,
    Email:req.body.Email,
    password:hashedPassword,
    role:req.body.role,
    create_at:new Date(),
   })
   res.status(201).send("Inserted data successfully");
}
catch(error){
    console.error(err);
    res.status(500).send("Server Error");
}
}



