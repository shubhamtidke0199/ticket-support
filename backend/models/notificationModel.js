const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ticket'
    },
    notification: {
        type: String,
        required: [true, "Please add some Text"],
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum:['new', 'seen'],
        default: 'new',
     }
}, {
    timestamps: true,
})

module.exports = mongoose.model("Notification", notificationSchema);