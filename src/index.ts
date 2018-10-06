import Server from "./server";

// mongodb connection
let mongoConnectionLaptop: string = 'mongodb://localhost:27017/blog' // My laptop connection
let mongoConnectionRaspberry: string = 'mongodb://192.168.1.37:27017/blog' // My raspberry connection

const server = new Server(4000, mongoConnectionLaptop)
server.start();