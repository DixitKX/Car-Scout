const mongoose = require("mongoose"); 
const reviewModel = require("../models/ReviewModel");  
// Create a Review
const createReview = async (req, res) => {
  try {
    let { bikeId, userId, rating, comment } = req.body;

    console.log("Received Data:", req.body);  

   
    if (!bikeId || !userId || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

 
    if (!mongoose.Types.ObjectId.isValid(bikeId)) {
      return res.status(400).json({ message: "Invalid bikeId format", bikeId });
    }

   

   
    const newReview = new reviewModel({ bikeId, userId, rating, comment });
    await newReview.save();

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
     const reviews = await reviewModel
       .find()
       .populate("bikeId userId");
     if (reviews.length === 0) {
       res.status(404).json({ message: "No review found" });
     } else {
       res.status(200).json({
         message: "review found successfully",
         data: reviews,
       });
     }
   } catch (err) {
     res.status(500).json({ message: err.message });
   }
 };


const getReviewsByBike = async (req, res) => {
  try {
     const review = await reviewModel
       .find({bikeId:req.params.bikeId})
       .populate("bikeId userId");
     if (review.length === 0) {
       res.status(404).json({ message: "No review found" });
     } else {
       res.status(200).json({
         message: "review found successfully",
         data: review,
       });
     }
   } catch (err) {
     res.status(500).json({ message: err.message });
   }
 };


const deleteReview = async (req, res) => {
  try {
    await reviewModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports={
    deleteReview,
    createReview,
    getAllReviews,
    getReviewsByBike
}
