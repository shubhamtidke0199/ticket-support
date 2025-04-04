const asyncHandler = require('express-async-handler');
const nodemailer=require('nodemailer')
const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private

const getTickets = asyncHandler(async (req, res) => {
    //Get user using the ID in the JWT
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json(tickets)
})

// @desc    Get user ticket
// @route   GET /api/tickets/:id
// @access  Private

const getTicket = asyncHandler(async (req, res) => {
    //Get user using the ID in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById({_id: req.params.id})

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }
    // console.log(req.user.isAdmin);
    if((ticket.user.toString() !== req.user.id) && (req.user.isAdmin === false)) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    res.status(200).json(ticket)
})


// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private

const createTicket= asyncHandler(async (req, res) => {
    const {product, description} = req.body

    if(!product || !description){
        res.status(400)
        throw new Error('Please add a product and description')
    }

    //Get user using the ID in the JWT
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user : req.user.id,
        status : 'new'
    })

    res.status(201).json(ticket)
})


// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private

const deleteTicket = asyncHandler(async (req, res) => {
    //Get user using the ID in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }
    
    if(ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    await ticket.remove()

    res.status(200).json({success:true})
})


// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private

const updateTicket = asyncHandler(async (req, res) => {
    // console.log("Hi")
    //Get user using the ID in the JWT
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)
    const client = await User.findById(ticket.user)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }
    
    if((ticket.user.toString() !== req.user.id) && (req.user.isAdmin === false)) {
        res.status(401)
        throw new Error('Not Authorized')
    }
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body , {new:true} )
    // console.log(client)
    res.status(200).json(updatedTicket)

    // if close or updated by admin sent mail
    if((req.user.isAdmin === true) && (client.verified ===true)){
        // console.log(`The ticket is ${ticket.status}, ${client.id}+${client.email}`)
        const body=`<h1>Hi ${client.name},</h1><br />`+
        `<h1>Replying for supportDesk ticket with id: ${ticket.id} </h1><br />`+
        ((updatedTicket.status ==="open")?
        `<p>Your ticket has been opened successfully. Kindly visit the site for update.`
        :`Your ticket has been closed successfully. Kindly reopen if you are not satisfied.`
        ) 
        +`<br /><br />Thanks</p>`;

        let transporter = nodemailer.createTransport({
            service:'gmail',
            host: 'smtp.gmail.com',
            secure: false,
            auth:{
                user:process.env.NODE_MAILER_USER,   
                pass:process.env.NODE_MAILER_PASSWORD
            }
        });
        
      // send mail with defined transport object
      
      var mailOp={
            from:process.env.NODE_MAILER_EMAIL,
            to: client.email, //While logged in from an admin account, the user who has created the ticket, his email id should be here instead of admin@gmail.com
            subject:`supportDesk ${ticket.id}`,
            text:'Hello, \n Hope you are good! Remember you are Awesome!',
            html: body
        }
      
        transporter.sendMail(mailOp, (error, info)=>{
        if(error){
            return console.log(error)
        }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
        })
    //   Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
    //   Preview only available when sending through an Ethereal account
    //   Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
    
    
    
})

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
}