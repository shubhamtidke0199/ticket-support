import axios from 'axios'

const API_URL = `/api/users/user/notifications/`

//CREATE NEW Notification
const createNotification = async (notificationData, token) => {
    const config = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, notificationData, config)

    return response.data
}


//GET USER Notifications
const getNotifications = async (token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    console.log(response.data);
    return response.data
   
}

//GET USER Notification
const getNotification = async (notificationId, token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + notificationId, config)

    return response.data
}

//SEEN NOTIFICATION
const seenNotification = async (notificationId, token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + notificationId, {status:'seen'}, config)

    return response.data
}



const notificationService = {
    createNotification,
    getNotifications,
    getNotification,
    seenNotification,
}

export default notificationService;