var express = require("express");
const mongoose = require("mongoose");
const cors=require("cors")

const app = express();
app.use(cors());
//express object

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));






app.use(express.json());

const roleRoutes = require("./src/routes/RoleRoute");
app.use(roleRoutes);

const userRoutes = require("./src/routes/UserRoute");
app.use(userRoutes);

const stateRoutes=require("./src/routes/StateRoute")
app.use("/state",stateRoutes)

const cityRoutes=require("./src/routes/CityRoute")
app.use("/city",cityRoutes)

const areaRoutes=require("./src/routes/AreaRoute")
app.use("/area",areaRoutes)

const bikeRoutes=require("./src/routes/BikeRoute")
app.use("/bike",bikeRoutes)

const reviewRoutes=require("./src/routes/ReviewRoute")
app.use("/review",reviewRoutes)


const profileRoutes=require("./src/routes/SellerProfileRoute")
app.use("/profile",profileRoutes)


const WishListRoutes=require("./src/routes/WishListRoute")
app.use("/wishlist",WishListRoutes)

const orderRoutes=require("./src/routes/OrderRoute")
app.use("/order",orderRoutes)

const compareRoutes=require("./src/routes/CompareRoutes")
app.use("/compare",compareRoutes)

const BuyerProfileRoutes=require("./src/routes/BuyerProfileRoute")
app.use("/buyerprofile",BuyerProfileRoutes)


const sellerRoutes = require("./src/routes/SellerOrderRoutes");
app.use("/api/seller", sellerRoutes);

const dashboardRoutes = require("./src/routes/DashBoardRoute");
app.use("/api/dashboard", dashboardRoutes);

const admindashboardRoutes = require("./src/routes/AdminDashboardRoute");
app.use("/api/admin", admindashboardRoutes);

const adminRoutes = require("./src/routes/AdminRoutes");
app.use("/api", adminRoutes);

const adminBikeRoutes = require("./src/routes/AdminBikeRoute");
app.use("/api/admin", adminBikeRoutes);





mongoose.connect("mongodb://127.0.0.1:27017/bikeScout").then(() => {
  console.log("databse connected sucessfully....");
});



const PORT = 3000;

app.listen(PORT, () => {
  console.log("server start on port number", PORT);
});
