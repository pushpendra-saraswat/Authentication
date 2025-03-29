const mongoose = require('mongoose')
const UsersSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:true,
    },
    Email:{
     type:String,
     required:true,
     unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
      
      },
      created_at: {
        type: Date,
        default: Date.now
      },
});
const User = mongoose.model("user", UsersSchema);
module.exports = User;
