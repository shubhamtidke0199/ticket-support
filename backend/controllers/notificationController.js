const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
// const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModel')
const Notification = require("../models/notificationModel")

// @desc    Create notification
// @route   POST /api/users/user/notifications
// @access  Private and admin

const createNotification = asyncHandler(async (req, res) => {
   // Get user using the ID in the JWT
   const user = await User.findById(req.user.id)
   
   if(!user){
       res.status(401)
       throw new Error('User not found')
   }

   //The user id should be of the user id in ticket 
   const ticket = await Ticket.findById(req.body.ticketId)
   const ticketUser = ticket.user;

   //Only actions by admin should trigger notifications
   if(user.isAdmin === false){
       res.status(401)
       throw new Error('User not authorized')
   };

   const notification = await Notification.create({
       notification: req.body.notification,
       ticket: req.body.ticketId,
       user: ticketUser,
       adminId: user.id
   });

   res.status(200).json({success:"true",
        notification});
})

// @desc    get first 10 user notification
// @route   Get /api/users/user/notifications
// @access  Private 
const getNotifications = asyncHandler(async (req, res) => {
   const resultsPerTime =10;
   //Get user using the ID in the JWT
   const user = await User.findById(req.user.id)

   if(!user){
       res.status(401)
       throw new Error('User not found')
   }

   const notifications = await Notification.find({user: req.user.id}).limit(resultsPerTime);
   const newNotificationsCount = await Notification.find({user: req.user.id},{status: "new"}).countDocuments();

   res.status(200).json({notifications, newNotificationsCount})
})

// @desc    Get user notification
// @route   GET /api/users/user/:id
// @access  Private
const getNotification = asyncHandler(async (req, res) => {
    //Get user using the ID in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const notification = await Notification.findById(req.params.id)

    if(!notification){
        res.status(404)
        throw new Error('Ticket not found')
    }
    // console.log(req.user.isAdmin);
    if(notification.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    res.status(200).json(notification)
})


// @desc    update notification to seen
// @route   Get /api/users/user/notifications/:id
// @access  Private
const updateNotification = asyncHandler(async (req, res) => {
   //Get user using the ID in the JWT
   const user = await User.findById(req.user.id)

   if(!user) {
       res.status(401)
       throw new Error('User not found')
   }

   const notification = await Notification.findById({_id:req.params.id})

   if(!notification){
       res.status(404)
       throw new Error('Notification not found')
   }
   
   if(req.user.isAdmin === false) {
       res.status(401)
       throw new Error('Not Authorized')
   }

   const updatedNotification = await Notification.findByIdAndUpdate(req.params.id, req.body , {new:true} )

   res.status(200).json(updatedNotification);
});

// @desc    Delete notification
// @route   DELETE /api/users/user/notifications/:id
// @access  Private

const deleteNotification = asyncHandler(async (req, res) => {
    //Get user using the ID in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const notification = await Notification.findById({_id:req.params.id})

    if(!notification){
        res.status(404)
        throw new Error('Notification not found')
    }
    
    if(notification.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    await notification.remove()

    res.status(200).json({success:true})
})

module.exports={
   createNotification,
   getNotifications,
   getNotification,
   updateNotification,
   deleteNotification,
}