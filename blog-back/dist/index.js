"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
// mongodb connection
let mongoConnectionLaptop = 'mongodb://localhost:27017/blog'; // My laptop connection
let mongoConnectionRaspberry = 'mongodb://192.168.1.37:27017/blog'; // My raspberry connection
const server = new server_1.default(4000, mongoConnectionLaptop);
server.start();
