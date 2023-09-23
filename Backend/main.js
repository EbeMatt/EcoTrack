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
  let email = req.body.email;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;
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
    await query('INSERT into User (name, email, password) values (\''+name+'\', \''+email+'\', \''+sha512(password)+'\')');
    
    // success!
    res.send({
      success: true,
      message: 'Sie haben sich erfolgreich registriert.'
    });
    return;
  }
});


const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY || crypto.randomBytes(32).toString('hex');

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

      const user = { id: result[0].ID, name: name }; // use User data
      const token = jwt.sign(user, secretKey, { expiresIn: '1h'});
      
      await query ('UPDATE user SET token = ? WHERE ID = ?', [token, result[0].ID])

      res.send({
        user_id: result[0].ID,
        token: token
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


app.post('/savePersonalData', async (req, res) => {
  console.log("savePersonalData called!");
  var con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.body.userId;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let work = req.body.work;

  console.log("Received userId:", userId);
  console.log("Received birthday:", birthday);
  console.log("Received gender:", gender);
  console.log("Received work:", work);

  try {
    var result = await query('SELECT * FROM gender WHERE Name = ?', [gender]);

    if (result.length > 0) {
      // user found
      await query('UPDATE User SET Birthday = ?, Gender = ?, Work = ? WHERE ID = ?', [new Date(birthday), result[0].ID, work, userId]);
      res.send({
        success: true,
        message: null
      });
    } else {
      // user not found or password was wrong
      console.log("No transmit from birthday, gender, and work!!");
      res.send({
        success: false,
        message: "Benutzer nicht gefunden oder falsches Geschlecht"
      });
    }
  } catch (error) {
    console.error("Fehler beim Speichern der Daten:", error);
    res.send({
      success: false,
      message: "Fehler beim Speichern der Daten"
    });
  }
});



 app.post('/saveVehicleCar', async (req,res) => {
    console.log("saveVehicleCar called!");

    var con = connectDB();
    const query = util.promisify(con.query).bind(con);

    const userId = req.body.userId; 
    let brand = req.body.brand;
    let purchaseDate = req.body.purchaseDate;
    let consumption = req.body.consumption;
    let fuel_type = req.body.fuel_type;
    let distance = req.body.distance;
    let co2_emission = req.body.co2_emission;
    let footprint = req.body.footprint;


    console.log("Received userId:", userId);
    console.log("Received brand:", brand);
    console.log("Received purchaseDate:", purchaseDate);
    console.log("Received consumption", consumption);
    console.log("Received fuel_type:", fuel_type);
    console.log("Received distance:", distance);
    console.log("Received co2_emission:", co2_emission);
    console.log("Received footprint:", footprint);
    
    try {
        
        var result = await query('SELECT * FROM cars WHERE UserID = ?', [userId]);

        if (result.length > 0) {
            
            await query('UPDATE cars SET Brand = ?, PurchaseDate = ?, Consumption = ?, FuelType = ?, Distance = ?, Co2Emission = ?, Footprint = ? WHERE UserID = ?',
                [brand, purchaseDate, consumption, fuel_type, distance, co2_emission, footprint, userId]);
        } else {
            
            await query('INSERT INTO cars (UserID, Brand, PurchaseDate, Consumption, FuelType, Distance, Co2Emission, Footprint) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [userId, brand, purchaseDate, consumption, fuel_type, distance, co2_emission, footprint]);
        }

        // Erfolgreich gespeichert
        res.send({
            success: true,
            message: null
        });
    } catch (error) {
        console.error("Fehler beim Speichern der Daten:", error);
        res.send({
            success: false,
            message: "Fehler beim Speichern der Daten"
        });
    }
});


app.get('/saveVehicleCar', async (req, res) => {
  console.log("getVehicleCar called!");

  var con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.query.userId; // Ändere zu req.query, um den Parameter zu extrahieren

  try {
    var result = await query('SELECT Brand, Co2Emission, Footprint FROM cars WHERE UserID = ?', [userId]);

    // Sende die abgerufenen Daten als Array in der Antwort
    res.send({
      success: true,
      data: result, // Hier sendest du die abgerufenen Daten als Array
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
    res.status(500).send({
      success: false,
      message: "Fehler beim Abrufen der Daten"
    });
  }
});

app.post('/saveSavingData', async (req, res) => {
  console.log("saveSaving called");
   
  var con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.body.userId;
let days = req.body.days;
let co2Savings = req.body.co2_savings;
let moneySavings = req.body.money_savings;
const weekStartDateAsDate = new Date(req.body.week_start_date); // Das empfangene Datum in ein Date-Objekt umwandeln
const formattedDate = weekStartDateAsDate.toISOString().slice(0, 19).replace('T', ' '); 

  console.log("Parsed weekStartDate:", weekStartDateAsDate);
  console.log("Received userId:", userId);
  console.log("Received days:", days);
  console.log("Received co2Savings:", co2Savings);
  console.log("Received moneySavings:", moneySavings);

  try {
    // Überprüfen, ob bereits Daten für diese Woche vorhanden sind
    var result= await query('SELECT * FROM savings WHERE UserID = ? AND week_start_date = ?', [userId, weekStartDateAsDate]);

    if (result.length > 0) {
      // Wenn bereits Daten vorhanden sind, senden Sie eine Fehlermeldung zurück
      res.status(400).send({
        success: false,
        message: "Daten für diese Woche wurden bereits gespeichert."
      });
    } else {
      // Wenn keine Daten für diese Woche vorhanden sind, fügen Sie sie hinzu
      await query('INSERT INTO savings (UserID, days, co2_savings, money_savings, week_start_date) VALUES (?, ?, ?, ?, ?)',
      [userId, days, co2Savings, moneySavings, formattedDate]);

      // Erfolgreich gespeichert
      res.send({
        success: true,
        message: null
      });
    }
  } catch (error) {
    console.error("Fehler beim Speichern der Daten:", error);
    res.status(500).send({
      success: false,
      message: "Fehler beim Speichern der Daten"
    });
  }
});

app.get('/saveSavingData', async (req, res) => {
  console.log("getSavingData called!");

  var con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.query.userId; // Ändere zu req.query, um den Parameter zu extrahieren

  try {
    var result = await query('SELECT co2_savings, money_savings FROM savings WHERE UserID = ?', [userId]);

    // Sende die abgerufenen Daten als Array in der Antwort
    res.send({
      success: true,
      data: result, // Hier sendest du die abgerufenen Daten als Array
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
    res.status(500).send({
      success: false,
      message: "Fehler beim Abrufen der Daten"
    });
  }
});




app.post('/saveHouseData', async (req, res) => {
  console.log('saveHouseData called!');

  const con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.body.userId;
  const countHouse = req.body.countHouse;
  const sizeHouse = req.body.sizeHouse;
  const heat = req.body.heat;
  const airHeat = req.body.airHeat;
  const addheat = req.body.addheat;
  const temperatur = req.body.temperatur;
  const waterHeat = req.body.waterHeat;
  const countMember = req.body.countMember;
  const powerConsumption = req.body.powerConsumption;
  const powerSelect = req.body.powerSelect;
  const photovoltaik = req.body.photovoltaik;
  const co2_emissionHeat = req.body.co2_emissionHeat;
  const gha_heating = req.body.gha_heating;
  const co2_emission_electricity = req.body.co2_emission_electricity;
  const gha_electricity = req.body.gha_electricity;
  
 
  const currentYear = new Date().getFullYear();
  
  console.log('Received userId:', userId);
  console.log('Received countHouse:', countHouse);
  console.log('Received sizeHouse:', sizeHouse);
  console.log('Received heat:', heat);
  console.log('Received airHeat:', airHeat);
  console.log('Received addheat:', addheat);
  console.log('Received temperatur:', temperatur);
  console.log('Received waterHeat:', waterHeat);
  console.log('Received countMember:', countMember);
  console.log('Received powerConsumption:', powerConsumption);
  console.log('Received powerSelect:', powerSelect);
  console.log('Received photovoltaik:', photovoltaik);

  try {
    const result = await query('SELECT * FROM house WHERE UserID = ? AND year = ?', [userId, currentYear]);

    if (result.length > 0) {
      await query('UPDATE house SET countHouse = ?, sizeHouse = ?, heat = ?, airHeat = ?, addheat = ?, temperatur = ?, waterHeat = ?, countMember = ?, powerConsumption = ?, powerSelect = ?, photovoltaik = ?, co2_emissionHeat = ?, gha_heating = ?, co2_emission_electricity = ?, gha_electricity = ? WHERE UserID = ? AND year = ?',
        [countHouse, sizeHouse, heat, airHeat, addheat, temperatur, waterHeat, countMember, powerConsumption, powerSelect, photovoltaik, co2_emissionHeat, gha_heating, co2_emission_electricity, gha_electricity, userId, currentYear]);
    } else {
      await query('INSERT INTO house (UserID, year, countHouse, sizeHouse, heat, airHeat, addheat, temperatur, waterHeat, countMember, powerConsumption, powerSelect, photovoltaik, co2_emissionHeat, gha_heating, co2_emission_electricity, gha_electricity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, currentYear, countHouse, sizeHouse, heat, airHeat, addheat, temperatur, waterHeat, countMember, powerConsumption, powerSelect, photovoltaik, co2_emissionHeat, gha_heating, co2_emission_electricity, gha_electricity]);
    }

    // Erfolgreich gespeichert
    res.send({
      success: true,
      message: null
    });
  } catch (error) {
    console.error('Fehler beim Speichern der Daten:', error);
    res.send({
      success: false,
      message: 'Fehler beim Speichern der Daten'
    });
  }
});


app.get('/saveHouseData', async (req, res) => {
  console.log('saveHouseData called!');

  var con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.query.userId;

  try {
    var result = await query('SELECT co2_emissionHeat, gha_heating, co2_emission_electricity, gha_electricity FROM house WHERE UserID = ?', [userId]);


    res.send({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten', error);
    res.status(500).send({
      success: false,
      message: 'Fehler beim laden der Daten'
    });
  }
});






const port = process.env.PORT || 3000;
app.listen(port, () => {
    connectDB();
    console.log('Server is running on port 3000');
});