const express = require('express');
const cluster = require('cluster');

const app = express();

function delay(duration) {
  const startTime = new Date();
  while (new Date() - startTime <= duration) {
    // event loop is blocked...
  }
}

app.get('/', (req, res) => {
  return res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
  delay(9000);
  return res.send(`ding ding ding! ${process.pid}`);
});

console.log('fire up the engines!');
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  cluster.fork();
  cluster.fork();
} else {
  console.log(`Worker ${process.pid} started`);
  app.listen(3000);
}
