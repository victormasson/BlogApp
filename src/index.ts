import Server from "./server";
import * as cluster from 'cluster'
import * as os from 'os'

// mongodb connection
let mongoConnectionLaptop: string = 'mongodb://localhost:27017/blog' // My laptop connection
let mongoConnectionRaspberry: string = 'mongodb://192.168.1.37:27017/blog' // My raspberry connection

// cluster
let cpus = os.cpus()
if (cluster.isMaster) {
  for (let i = 0; i < cpus.length; i++) {
    cluster.fork()
  }
}
else {
  new Server(4000, mongoConnectionLaptop).start()
}