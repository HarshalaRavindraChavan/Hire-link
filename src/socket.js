import { io } from "socket.io-client";

const BASE_URL = "https://hirelinkinfo.com/";

export const socket = io(BASE_URL, {
  transports: ["websocket"],
});
