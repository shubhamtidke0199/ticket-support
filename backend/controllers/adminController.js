const expressAsyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const Ticket = require('../models/ticketModel');
const ApiFeatures = require("../utils/apiFeatures");


// @desc    Get all tickets
// @route   GET /api/admin/tickets
// @access  Private

const getAllTickets = expressAsyncHandler(async (req, res) => {
   //Get user using the ID in the JWT
   const user = await userModel.findById(req.user.id)
   const resultsPerPage = 5;  
    // const ticketsCount = await Ticket.countDocuments();
   if(!user){
       res.status(401)
       throw new Error('User not found')
   }

   // section for checking user is admin
   if(user.isAdmin !== true ){
       res.status(401)
       throw new Error('User not Admin')
   }
   const apiFeature = new ApiFeatures(Ticket.find(), req.query)
        .filter()
        .pagination(resultsPerPage);

   // to find total tickets in search and last page number     
   const apiResultNo = new ApiFeatures(Ticket.find(), req.query)
   .filter();
   const totalTickets = await apiResultNo.query.countDocuments();
//    console.log(totalTickets);
   const lastPage = totalTickets % resultsPerPage === 0?
        totalTickets / resultsPerPage : 
        Math.floor(totalTickets / resultsPerPage) + 1;
    
   const tickets = await apiFeature.query;

   res.status(200).json({tickets, lastPage, totalTickets});
})


// @route   GET /api/admin/records
// @access  Private && Admin
// Get All Supporting database information
const getServicingRecord = expressAsyncHandler(async (req, res) =>{
    //get user information from jwt web token 
    const user = await userModel.findById(req.user.id);

    // check user is logged in
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // section for checking user is admin
   if(user.isAdmin !== true ){
    res.status(401)
    throw new Error('User not Admin')
    }
    //Get all tickets
    const allTicketsCount = await Ticket.countDocuments();
    const newTicketsCount = await Ticket.find({status: "new"}).countDocuments();
    const openTicketsCount = await Ticket.find({status: "open"}).countDocuments();
    const closedTicketsCount = await Ticket.find({status: "closed"}).countDocuments();

    //response to front end
    res.status(200).json({allTicketsCount,
         newTicketsCount, 
         openTicketsCount, 
         closedTicketsCount
    });

})

module.exports = { getAllTickets, getServicingRecord};