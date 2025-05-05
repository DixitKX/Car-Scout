const routes = require('express').Router();
const reviewController = require('../controllers/ReviewController');

routes.post("/addReview", reviewController.createReview);
routes.get("/getAllReview", reviewController.getAllReviews);
routes.get("/getReviewByBikeid/:bikeId", reviewController.getReviewsByBike);
routes.delete("/deleteReview/:id", reviewController.deleteReview);


module.exports = routes;