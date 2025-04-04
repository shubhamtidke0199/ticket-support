const express = require("express");
const { getAllTickets, getServicingRecord } = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
// const ticketRouter = require('./ticketRoutes');

const router = express.Router();

// Admin routes for tickets
router.route("/tickets").get(protect, getAllTickets);

//Admin route for servicing record
router.route("/records").get(protect, getServicingRecord);

module.exports = router;