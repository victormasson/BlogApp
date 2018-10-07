"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const cluster = require("cluster");
const os = require("os");
// mongodb connection
let mongoConnectionLaptop = 'mongodb://localhost:27017/blog'; // My laptop connection
let mongoConnectionRaspberry = 'mongodb://192.168.1.37:27017/blog'; // My raspberry connection
// cluster
let cpus = os.cpus();
if (cluster.isMaster) {
    for (let i = 0; i < cpus.length; i++) {
        cluster.fork();
    }
}
else {
    new server_1.default(4000, mongoConnectionLaptop).start();
}
