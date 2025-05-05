const bikeModel = require("../models/BikeModel");
const multer=require("multer")
const path=require("path")
const cloundinaryUtil=require("../utils/CloudinaryUtil")



// storage
const storage=multer.diskStorage({
  destination:"./uploads",
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
})
//multer

const upload=multer({
  storage:storage,
}).single("image")

const addBike = async (req, res) => {
  try {
    const savedBike = await bikeModel.create(req.body);
    res.status(201).json({
      message: "bike added successfully",
      data: savedBike,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllBikes = async (req, res) => {
  try {
    const Bikes = await bikeModel
      .find({ isVisible: true })
      .populate("stateId cityId areaId userId");
    if (Bikes.length === 0) {
      res.status(404).json({ message: "No bike found" });
    } else {
      res.status(200).json({
        message: "Bike found successfully",
        data: Bikes,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBikesByUserId = async (req, res) => {
  
  try {
    const bikes = await bikeModel
      .find({userId:req.params.userId})
      .populate("stateId cityId areaId userId");
    if (bikes.length === 0) {
      res.status(404).json({ message: "No bike found" });
    } else {
      res.status(200).json({
        message: "bike found successfully",
        data: bikes,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const addBikeWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    } else {
      // database data store
      //cloundinary

      const cloundinaryResponse = await cloundinaryUtil.uploadFileToCloudinary(req.file);
      console.log(cloundinaryResponse);
      console.log(req.body);

      //store data in database
      req.body.bikeURL = cloundinaryResponse.secure_url
      const savedBike = await bikeModel.create(req.body);

      res.status(200).json({
        message: "bike saved successfully",
        data: savedBike
      });
    }
  });
};



const updateBike=async (req,res)=>{

  try{

    const updatedBike=await bikeModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({
      message:"bike updated sucessfully",
      data:updatedBike
    })
  } catch(err){
    res.status(500).json({
      message:"error while update bike",
      err:err
    })
  }
}


const getBikeById= async(req,res)=>{
  try {
    const bike = await bikeModel.findById(req.params.id);
    if (!bike) {
      res.status(404).json({ message: "No bike found" });
    } else {
      res.status(200).json({
        message: "bike found successfully",
        data: bike,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


const deleteBike = async (req, res) => {
  try {
      const { bikeId, userId } = req.params;
      console.log(`🔍 Deleting Bike - ID: ${bikeId}, User ID: ${userId}`);

      if (!bikeId || !userId) {
          return res.status(400).json({ success: false, message: "Bike ID and User ID are required." });
      }

      // Check if the bike exists and belongs to the user
      const bike = await bikeModel.findOne({ _id: bikeId, userId });

      if (!bike) {
          return res.status(404).json({ success: false, message: "Bike not found or unauthorized action." });
      }

      // Delete the bike
      await bikeModel.findByIdAndDelete(bikeId);

      console.log("✅ Bike deleted successfully");
      res.json({ success: true, message: "Bike deleted successfully." });
  } catch (error) {
      console.error("❌ Error deleting bike:", error);
      res.status(500).json({ success: false, message: "Server error.", error: error.message });
  }
};



module.exports = { addBike, getAllBikes,addBikeWithFile,getBikesByUserId,getBikeById,updateBike,deleteBike};
