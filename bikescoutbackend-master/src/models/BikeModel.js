const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bikeSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    variant: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    descripiton: {
      type: String,
      required: true,
    },
    
    listingDate: {
      type: Date,
      required: true,
    },
    registationNum: {
      type: String,
      required: true,
    },

    bikeURL:{
      type:String,
      required:true
    },

    stateId:{
       type:Schema.Types.ObjectId,
       ref:"State",
       required:true,

    },
    
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
    areaId: {
      type: Schema.Types.ObjectId,
      ref: "Area",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    
    isVisible: {
      type: Boolean,
      default: true,
    },
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("Bike", bikeSchema);
