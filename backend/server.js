const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const URI = 'mongodb://malek:1234@auctions-shard-00-00.fud2c.mongodb.net:27017,auctions-shard-00-01.fud2c.mongodb.net:27017,auctions-shard-00-02.fud2c.mongodb.net:27017/auctions?ssl=true&replicaSet=atlas-fw1kgr-shard-0&authSource=admin&retryWrites=true&w=majority';


mongoose.connect(URI)
.then(result => {
console.log('connected');
app.listen(4000,console.log("running"));
})



const home = require('./routes/routes');
const signs = require('./routes/signs-Routes');
const add = require('./routes/addItem-Route');
const app = express();

/* app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
}); */

app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(home);
app.use(signs);
app.use(add);



