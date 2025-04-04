import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import ticketReducer from "../features/tickets/ticketSlice";
import noteReducer from '../features/notes/noteSlice'
import adminReducer from "../features/admin/adminSlice";
import statusReducer from "../features/status/statusSlice";
import notificationReducer from "../features/notification/notificationSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    //error if tickets , view tickets showing, else no
    tickets:ticketReducer,
    notes: noteReducer,
    admin: adminReducer,
    status: statusReducer,
    notification: notificationReducer,
  },
});
