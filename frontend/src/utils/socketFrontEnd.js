import { io } from "socket.io-client";
import { BASE_URL } from "./constatnts";

export const createSocketConnection = () => {
  if (window.location.hostname === "localhost") {
    return io("http://localhost:5000");
  }

  return io(BASE_URL, {
    transports: ["websocket"],
    withCredentials: true,
  });
}
