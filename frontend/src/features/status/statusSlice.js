import { createSlice } from "@reduxjs/toolkit";

const status = JSON.parse(localStorage.getItem("status"));
const initialState= {
  status: status || "",
}



export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    selectStatus : (state, action) => {
      state.status = action.payload;
      localStorage.setItem("status", JSON.stringify(state.status))
    },
    resetStatus: {
      status:"",
    }
  },
});

export const { selectStatus } = statusSlice.actions;
export const { resetStatus } = statusSlice.actions;


export default statusSlice.reducer;