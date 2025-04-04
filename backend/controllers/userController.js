const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../config/generateToken");

//------------------------------------------------------------------------------------RegisterUser(1)
//  /api/users - public route
const registerUser = asyncHandler (async (req, res) => {
   const { name, email, password } = req.body; //(1.1)

   // Check whether three fields are typed by user //(1.2)
   if ( !name || !email || !password ) {
      // return res.status(400).send("Please include all fields");
      // return res.status(400).json({message: "Please include all field"});
      res.status(400);
      throw new Error("Please include all field");
   };
   
   // Check whether user is already registered //(1.3)
   const userExists = await User.findOne({ email });
   if ( userExists ) {
      // console.log(userExists)
      res.status(400);
      throw new Error("User Already Exists")
      
   };

   // Hashing password using bcrypt //(1.4)
   const salt = await bcrypt.genSalt(10) //Salt password with random bytes
   const hashedPassword = await bcrypt.hash(password, salt) 
   
   // creating user from model for mongoose //(1.5)
   const user = await User.create({ 
      name,
      email,
      password: hashedPassword,
      // isAdmin
   });

   // check whether user is created //(1.6)
   if (user){
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         // product: user.admin.product,
         token: generateToken(user._id),
         
         
      });
   }  else {
      res.status(400);
      throw new Error("User not created")
   };

});



// ------------------------------------------------------------------------------------Login(2)
//   /api/users/login - public route
const loginUser = asyncHandler( async (req, res) => {
   const { email, password } = req.body;

   // find the user with mail id //(2.1)
   const user = await User.findOne({ email });

   // validate user and password //(2.2)
   if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id)
      });
   } else {
      res.status(401);
      throw new Error("Invalid email or password")
   }

});
//-----------------------------------------------------------------------------------User Details

// /api/users/user protected route
const userDetails = asyncHandler( async (req, res) => {
   const user = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
   }
   res.status(200).json(user)


});
 
// ----------------------------------------------------------------------------------All users

const allUsers = asyncHandler( async (req, res) => {

   const users = await User.find();
   // if ( !users ) {
   //    res.status(400);
   //    throw new Error("No users");
   // };
   res.status(200).json({
      success:true,
      users
    });
});

   module.exports = {
      registerUser,
      loginUser,
      userDetails,
      allUsers
   };