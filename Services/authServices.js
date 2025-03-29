const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/Signup');
const CustomError = require('../libs/error');

exports.SignUpUser = async(userData)=>{
    try{
        const {Username, Email, password,role} = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.findOne( { Email: Email })
        if(user){
            throw new Error('User already exists');
        }
        else{
  const response =  await User.create({
    Username:Username,
    Email:Email,
    password:hashedPassword,
    role:role,
    created_at:new Date(),
   });
   return response;
    }
}
    catch(error){
        console.error("Error:", error);
        throw error
     }
    

};

exports.LoginUser=async(userData)=>{
    try {
        const { Email, password } = userData;
        // Check if the user exists
            console.log('Emailuuuuuuuuuuuuuuuu========================', Email);
            console.log('password', password);
            const user = await User.findOne({ Email: Email });
            if (!user) {
                throw new CustomError('User Not Found', 404)
            }
    
            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new CustomError('Invalid email or password', 401)
               // return res.status(401).json({ error: "Invalid email or password" });
            }
    
            // Generate JWT token
            const token = jwt.sign({ ID: user._id }, 'jwt-key', { expiresIn: '1h' });
    
            // Set token in a cookie and send response
            console.log('token', token);
            const data={
                name:user.Username,
                token:token
            }
            return data;
            // res.cookie('token', token, { httpOnly: true });
            // res.json({success:true, message: "Login successful", name: user.Username });
        } catch (error) {
            console.error("Error:", error);
           throw error
        }
    };
