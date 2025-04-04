import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import adminService from './adminService';



const initialState = {
    tickets : [],
    lastPage: 1,
    totalTickets: 0,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message: '',
}; 




// GET all TICKETS
export const getAllTickets = createAsyncThunk(
  "tickets/getAllAdmin",
  async (ticketsData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await adminService.getAllTickets(ticketsData, token);
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





export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        reset : (state) => initialState, 
    },
    extraReducers:(builder) =>{
        builder
        .addCase(getAllTickets.pending, (state) => {
          state.isLoading = true
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.tickets = action.payload.tickets
          state.lastPage = action.payload.lastPage
          state.totalTickets = action.payload.totalTickets
      })
      .addCase(getAllTickets.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
      })
        
    }, 
})

export const {reset} = adminSlice.actions
export default adminSlice.reducer
