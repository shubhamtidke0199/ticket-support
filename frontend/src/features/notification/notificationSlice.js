import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import notificationService from './notificationService'

const initialState = {
    notifications : [],
    notification : {},
    newNotificationsCount:0,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message: ''
} 

//Create new notification
export const createNotification = createAsyncThunk(
    "notifications/create",
    async (notificationData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await notificationService.createNotification(notificationData, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()

        return thunkAPI.rejectWithValue(message)
      }
    }
  );


  // GET USER NOTIFICATIONS
export const getNotifications = createAsyncThunk(
  "notifications/getAll",
  async (_, thunkAPI) => {
    try {
      // console.log(thunkAPI.getState)
      const token = thunkAPI.getState().auth.user.token
      return await notificationService.getNotifications(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// GET USER Notification
export const getNotification = createAsyncThunk(
  "notifications/get",
  async (notificationId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await notificationService.getNotification(notificationId,token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// SEEN NOTIFICATIONS
export const seenNotification = createAsyncThunk(
  "notifications/seen",
  async (notificationId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await notificationService.seenNotification(notificationId,token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);




export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        reset : (state) => initialState, 
    },
    extraReducers:(builder) =>{
        builder
        .addCase(createNotification.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createNotification.fulfilled, (state) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createNotification.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getNotifications.pending, (state) => {
          state.isLoading = true
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.notifications = action.payload.notifications
          state.newNotificationsCount = action.payload.newNotificationsCount
      })
      .addCase(getNotifications.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
      })
        .addCase(getNotification.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getNotification.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.notification = action.payload
        })
        .addCase(getNotification.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(seenNotification.fulfilled, (state, action) => {
            state.isLoading = false
            state.notifications.map(
              (notification) => notification._id === action.payload._id ? (notification.status = 'seen') : notification)
            
        })
   
    }, 
})

export const {reset} = notificationSlice.actions
export default notificationSlice.reducer
