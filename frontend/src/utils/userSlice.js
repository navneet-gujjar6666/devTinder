import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action)=>{
      return action.payload;
    },
    removeUser: (state, action)=>{
      return null;
    }
  }
});

export const { addUser, removeUser, clearUser }= userSlice.actions;

export default userSlice.reducer; //You can import in other files with any name as this is type of default not type of like:
                                                                                        //export const ok= userSlice.reducer 



