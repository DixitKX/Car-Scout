import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { UserSidebar } from './components/layouts/UserSidebar'
// import './App.css'
import "./assets/adminlte.css"
import "./assets/adminlte.min.css"
import { Route, Routes, useLocation } from 'react-router-dom'
import { UserProfile } from './components/user/UserProfile'
import { Login } from './components/common/Login'
import { Signup } from './components/common/Signup'
import { AddBikeDetail } from './components/seller/AddBikeDetail'
import axios from 'axios'
import { LandingPage } from './components/common/LandingPage'
import { SellerSidebar } from './components/layouts/SellerSidebar'
import { AddBikeDetail2 } from './components/seller/AddBikeDetail2'
import { ViewMyBike } from './components/seller/ViewMyBike'
import { UpdateMyBike } from './components/seller/UpdateMyBike'
import PrivateRoutes from "./hooks/PrivateRoutes";
import ReviewForm from './components/reviews/ReviewForm'
import { SellerProfile } from './components/seller/SellerProfile'
import Home from './components/common/Home'
import AboutUs from './components/common/AboutUs'
import Services from './components/common/ServicePage'
import ContactUs from './components/common/ContactUs'
import ExploreBikes from './components/user/ExploreBikes'
import Wishlist from './components/user/WishList'
import { ResetPassword } from './components/common/ResetPassword'
import UserDashboard from './components/user/UserDashboard'
import OrderHistory from './components/user/OrderHistory'
import SellerDashboard from './components/seller/SellerDashboard'
import { AdminSidebar } from './components/layouts/AdminSidebar'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminUserManagement from './components/admin/AdminUserManagement'
import AdminBikeManagement from './components/admin/AdminBikeManagement'

function App() {

  axios.defaults.baseURL="http://localhost:3000"

  const location = useLocation
  ();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = ""; // Remove the unwanted class for login and signup
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);


  return (

      <div
      className={
        location.pathname === "/login" || location.pathname === "/signup"
          ? ""
          : "app-wrapper"
      }
    >
     <Routes>
        <Route path='/Login' element={<Login/>}></Route>
        <Route path='/Signup' element={<Signup/>}></Route>
        <Route path="/" element ={<LandingPage/>}></Route>
        <Route path="/home" element ={<Home/>}></Route>
        <Route path="/about" element ={<AboutUs/>}></Route>
        <Route path="/services" element ={<Services/>}></Route>
        <Route path="/contact" element ={<ContactUs/>}></Route>
        <Route path ="/resetpassword/:token" element={<ResetPassword/>}></Route>




         <Route path="" element={<PrivateRoutes/>}>

        <Route path='/user' element={<UserSidebar/>}>
        <Route path='profile' element={<UserProfile/>}> </Route>
        <Route path='explorebike' element={<ExploreBikes/>}> </Route>
        <Route path='wishlist' element={<Wishlist/>}> </Route>
        <Route path='orderhistory' element={<OrderHistory/>}> </Route>
        <Route path='dashboard' element={<UserDashboard/>}> </Route>
        </Route>

        <Route path="/seller" element={<SellerSidebar />}>
            <Route path="addbikes" element={<AddBikeDetail2 />} />
            <Route path="mybikes" element={<ViewMyBike />} />
            <Route path="updatebike/:id" element={<UpdateMyBike />} />
            <Route path="profile" element={<SellerProfile />} />
            <Route path="dashboard" element={<SellerDashboard />} />

          </Route>

          <Route path="/admin" element={<AdminSidebar />}>

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="manageuser" element={<AdminUserManagement />} />
          <Route path="managebike" element={<AdminBikeManagement />} />



          </Route>


          </Route>
       
          
     </Routes>
     </div>
    
  )
}

export default App
