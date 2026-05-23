import { io } from "socket.io-client";
import { BASE_URL } from "./constatnts";

export const createSocketConnection= ()=>{
      if(local.host== "localhost"){
           return io(BASE_URL);
      } else{
        return io("/", { path: "/api/socket.io" });
      }
}