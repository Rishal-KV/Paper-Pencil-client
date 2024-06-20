import { io } from "socket.io-client";

const SOCKET_URL = "https://paper-pencil.vercel.app";

export const socket = io(SOCKET_URL);

export const initSocket = (userId: string) => {
  socket.emit("join", { userId });
};
