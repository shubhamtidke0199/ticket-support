const express = require ('express')
const router = express.Router({mergeParams:true});
const { createNotification,
      getNotifications,
      updateNotification, 
      getNotification,
      deleteNotification} = require('../controllers/notificationController');
const {protect}=require('../middleware/authMiddleware')

router.route('/').post(protect, createNotification).get(protect, getNotifications);

router.route('/:id').get(protect, getNotification).put(protect, updateNotification).delete(protect, deleteNotification);

module.exports = router;