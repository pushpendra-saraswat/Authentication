const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');
const PlayerSchema = new mongoose.Schema({
    Player_name:{
        type:String,
        required:true,
    },
    Starting_price:{
        type:Number,
        required:true,
    },
    Current_price:{
        type:Number,
        default:0,
    },
    Player_game:{
        type:String,
        required:true,
    },
    bid_UserID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    User_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
PlayerSchema.plugin(mongoosePaginate);
const Player = mongoose.model("player",PlayerSchema);
module.exports = Player;