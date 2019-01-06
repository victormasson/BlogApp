import Server from './server'

// mongodb connection
let mongoConnectionLaptop: string = 'mongodb://localhost:27017/blog' // My laptop connection
let mongoConnectionRaspberry: string = 'mongodb://192.168.1.37:27017/blog' // My raspberry connection

let port: number = 5000
new Server(port, mongoConnectionLaptop)


/**
 * Cluster implement
 *

import * as cluster from 'cluster'
import * as os from 'os'
// cluster
let cpus = os.cpus()
if (cluster.isMaster) {
  for (let i = 0; i < cpus.length; i++) {
    cluster.fork()
  }
}
else {

}
*/