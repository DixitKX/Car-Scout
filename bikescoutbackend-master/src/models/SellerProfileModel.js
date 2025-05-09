const mongoose = require("mongoose");
const Schema = mongoose.Schema

const sellerSchema = new Schema({
  name:
   { 
    type:String,
     required: true 
    },
  email: 
  { 
    type:String,
    required: true,
     unique: true
     },
  phone: 
  { 
    type:Number, 
    required:true
  },
  address: 
  { 
    type:String,
    required:true
 },


   userId: {
       type: Schema.Types.ObjectId,
       ref: "Users",
       required: true,
     },

});

module.exports = mongoose.model("SellerProfile", sellerSchema)