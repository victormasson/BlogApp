import Server from "./server";

const server = new Server(4000, 'mongodb://localhost:27017/blog')
server.start();