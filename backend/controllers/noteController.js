const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModel')

// @desc    Get notes
// @route   GET /api/tickets/:ticketId/notes
// @access  Private

const getNotes = asyncHandler(async (req, res) => {
    //Get user using the ID in the JWT
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if((ticket.user.toString()!==req.user.id) && (req.user.isAdmin === false)){
        res.status(401)
        throw new Error('User not authorized')
    }

    const notes=await Note.find({ticket: req.params.ticketId})

    res.status(200).json(notes)
})


// @desc    create note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private

const addNote = asyncHandler(async (req, res) => {
    //Get user using the ID in the JWT
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if((ticket.user.toString()!==req.user.id) && (req.user.isAdmin === false)){
        res.status(401)
        throw new Error('User not authorized')
    }

    const notes=await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user.id
    })

    res.status(200).json(notes)
})

module.exports={
    getNotes, addNote
}