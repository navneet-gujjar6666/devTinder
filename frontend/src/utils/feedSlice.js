import { createSlice } from "@reduxjs/toolkit"

const feedSlice= createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    addFeed: (state, action)=>{
             return action.payload; //or action.payload only without (brackets+return)
    },
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
    clearFeed: () => { //Used for solving case: like when user1 done operations on 5users then in last feed[empty] so if another
      return null;     //user loggedIn so it will have feed[empty] as store.feed is globall for all users, That's why we have 
                       //done this for making feed[empty]-->intialState: null when doing loggedOut.
    },
    
    // ✅ NEW: skip logic
    skipUser: (state, action) => {
      const index = state.findIndex(
        (user)=> user._id === action.payload
      );

      if (index !== -1) {
        const [skippedUser] = state.splice(index, 1);
        state.push(skippedUser); // move to end
      }
    }
  }
});

export const { addFeed, removeUserFromFeed, clearFeed, skipUser }= feedSlice.actions;
export default feedSlice.reducer;