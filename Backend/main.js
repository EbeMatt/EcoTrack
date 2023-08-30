require('dotenv').config();
var mysql = require('mysql2');
var sha512 = require('js-sha512').sha512;
const util = require('util');
const cors = require('cors');

const DB_USER =  "ecotrackapp";
const DB_PW =  "Ironman1Ebenberger";
const DB_NAME =  "ecotrackdb";
const DB_SERVER =  "localhost";

function connectDB() {
  var con = mysql.createConnection({
    host: DB_SERVER,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PW
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  return con;
}



const express = require('express');
const { runInNewContext } = require('vm');



// needed for parsing JSON from request
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080'
}));
app.post('/register', async (req, res) => {
  console.log("register called!");
  var con = connectDB();
  const query = util.promisify(con.query).bind(con);

  let name = req.body.name;
  let password = req.body.password;
  // first check if user with given name already exists
  var result = await query('SELECT * FROM User WHERE name=\''+name+'\'');
  if (result.length > 0) {
    // user already exists
    console.log("User with name="+name+" already exists!");
    res.send({
      success: false,
      message: "Username "+name+" already exists"
    });
    return;
  }
  else {
    // create new user
    await query('INSERT into User (name, password) values (\''+name+'\',\''+sha512(password)+'\')');
    
    // success!
    res.send({
      success: true,
      message: null
    });
    return;
  }
});

app.post('/login', async (req, res) => {
  console.log("login called!");
  var con = connectDB();
  const query = util.promisify(con.query).bind(con);

  let name = req.body.name;
  let password = req.body.password;
    // first check if user with given name already exists
    var result = await query('SELECT * FROM User WHERE name=\''+name+'\' AND password=\''+sha512(password)+'\''); 
    if (result.length > 0) {
      // user found
      console.log("login for user with id="+result[0].ID+" worked fine!");
      res.send({
        user_id: result[0].ID
      });
      return;
    }
    else {
      // user not found or password was wrong
      console.log("login failed -> wrong username or password");
      res.send({
        user_id: -1
      });
      return;
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    connectDB();
    console.log('Server is running on port 3000');
});