const mongoose = require('mongoose');
const BidSchema = new mongoose.Schema({

Player_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Player",
    required: true,
},

    User_Id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    bid_amount:{
        type:mongoose.Schema.Types.Decimal128,
         required:true,
    },

    created_at: {
        type: Date,
        default: Date.now
      },

}) 

const Bid = mongoose.model("bid", BidSchema);
module.exports = Bid;