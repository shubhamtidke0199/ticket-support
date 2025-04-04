const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
 
const protect = asyncHandler( async (req, res, next) => { 
   let token;
   // console.log(req.headers.authorization.startsWith("Bearer"))
   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
      try {
         // token obtained from header;
         token = req.headers.authorization.split(" ")[1];
         // console.log(token);
         // verify token 
         const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
         // console.log(decoded.id);

         req.user = await User.findById(decoded.id).select('-password');
         // console.log(req.user);

         next();
      } catch (error) {
         // console.log(error);
         res.status(401);
      throw new Error("Not Authorized")
      }
   }

   if (!token) {
      res.status(401);
      throw new Error("Not fully Authorized")
   }
})

module.exports = {protect};