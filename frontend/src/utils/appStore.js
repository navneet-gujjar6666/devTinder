import { configureStore } from "@reduxjs/toolkit"
import  bannana  from "./userSlice";
import bannana2 from "./feedSlice";
import bannana3 from "./connectionSlice"
import bannana4 from "./requestSlice"

const appStore= configureStore({
  reducer: {
    user: bannana,
    feed: bannana2,
    connection: bannana3,
    requests: bannana4
  }
});

export default appStore;