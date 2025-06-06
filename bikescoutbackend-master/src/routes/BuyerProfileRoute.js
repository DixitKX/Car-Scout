const routes = require('express').Router();
const driverProfileController = require('../controllers/BuyerProfileController');

routes.post('/addprofile', driverProfileController.addProfile);
routes.get('/getprofile/:userId', driverProfileController.getProfile);
routes.post('/updateprofile/:userId', driverProfileController.updateProfile);

module.exports = routes;

