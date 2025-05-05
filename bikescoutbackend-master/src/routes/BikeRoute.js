const routes = require("express").Router();
const bikeController = require("../controllers/BikeController");
routes.post("/addbike", bikeController.addBike);
routes.post("/addbikewithfile", bikeController.addBikeWithFile);
routes.get("/getallbikes", bikeController.getAllBikes);
routes.get('/getbikesbyuserid/:userId', bikeController.getBikesByUserId)
routes.put("/updatebike/:id",bikeController.updateBike);
routes.get("/getBikeById/:id",bikeController.getBikeById);
routes.delete("/deletebike/:bikeId/:userId", bikeController.deleteBike);

module.exports = routes;
