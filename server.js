const express     = require ('express');
const app		   = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authUser = require('./routes/auth');


var cors = require('cors');

const hostname = '31.184.253.231';
const port = process.env.port || 8080;
const portChat = process.env.port || 3000;

dotenv.config();

//connect to DB Mongo
//, dbName: "FriendApp"
mongoose.connect(process.env.DB_CONNECT,  { useNewUrlParser: true, dbName: "FriendApp" }, function (err) {
  if (err) {
      console.log("connection error:", err);
    } else {
      console.log("MongoDB connection successful");
    }
});

app.use(cors({origin: 'http://localhost:4200'}));

app.get ('/', (request, response) => {
  response.send ('Frend APP BackEnd!')
});

app.use(express.json());
app.use('/api', authUser);

app.listen(process.env.PORT || 8080, function(){
    console.log("We are living on port " + 8080);
});
