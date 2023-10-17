require('dotenv').config();
var mysql = require('mysql2');
var sha512 = require('js-sha512').sha512;
const util = require('util');
const cors = require('cors');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const sendMail = require('./sendMail.js');

const DB_USER =  "ecotrackapp";
const DB_PW =  "";
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
  let accepted_rules = 1;
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
    await query('INSERT into User (name, email, password, accepted_rules) values (\''+name+'\', \''+email+'\', \''+sha512(password)+'\', \''+accepted_rules+'\')');
    
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


app.post('/saveTrashData', async (req, res) => {
  console.log('saveTrashData called!');

  const con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.body.userId;
  const selectedPaper = req.body.paper_Type;
  const paperUsageAmount = req.body.paper_Usage;
  const usageEstimate = req.body.usage_Type;
  const plasticUsageAmount = req.body.plastic_Usage;
  const paperUsagePerMonth = req.body.paper_usage_per_month;
  const paperUsagePerYear = req.body.paper_usage_per_year;
  const co2ImpactPerSheet = req.body.co2_impact_per_sheet;
  const plasticUsagePerMonth = req.body.plastic_usage_per_month;
  const plasticUsagePerYear = req.body.plastic_usage_per_year;
  const co2ImpactPerKg = req.body.co2_impact_per_kg;

  try {
    const result = await query('SELECT * FROM trash WHERE UserID = ?', [userId]);

    if (result.length > 0) {
      await query('UPDATE trash SET paper_Type = ?, paper_Usage = ?, usage_Type = ?, plastic_Usage = ?, paper_usage_per_month = ?, paper_usage_per_year = ?, co2_impact_per_sheet = ?, plastic_usage_per_month = ?, plastic_usage_per_year = ?, co2_impact_per_kg = ? WHERE UserID = ?',
        [selectedPaper, paperUsageAmount, usageEstimate, plasticUsageAmount,  paperUsagePerMonth, paperUsagePerYear, co2ImpactPerSheet, plasticUsagePerMonth, plasticUsagePerYear, co2ImpactPerKg, userId]);
    } else {
      await query('INSERT INTO trash (UserID, paper_Type, paper_Usage, usage_Type, paper_usage_per_month, paper_usage_per_year, co2_impact_per_sheet, plastic_Usage, plastic_usage_per_month, plastic_usage_per_year, co2_impact_per_kg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, selectedPaper, paperUsageAmount, usageEstimate, paperUsagePerMonth, paperUsagePerYear, co2ImpactPerSheet, plasticUsageAmount, plasticUsagePerMonth, plasticUsagePerYear, co2ImpactPerKg]);
    }

    res.send({
      success: true,
      message: null
    });
  } catch (error) {
    console.error('Fehler beim Speichern der Daten', error);
    res.status(500).send({
      success: false,
      message: 'Fehler beim Speichern der Daten'
    });
  }
});

// fügt die Früchte und Obst C02 werte in die datenbank hinzu

app.post('/saveC02DataFruitVegetables', async (req, res) => {
  console.log('SaveC02DataFruitVegetables called!');

  const con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.body.userId;
  console.log('UserID aus dem Request:', req.body.userId);
  const fruit_vegetables = req.body.fruit_vegetables;

  try {
    const result = await query('SELECT * FROM food WHERE UserID = ?', [userId]);

    if (result.length > 0) {
      await query('UPDATE food SET fruit_vegetables = ? WHERE UserID = ?',
        [fruit_vegetables, userId]);
    } else {
      await query('INSERT INTO food (UserID, fruit_vegetables) VALUES (?, ?)',
        [userId, fruit_vegetables]);
    }

    res.send({
      success: true,
      message: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Fehler beim Speichern der CO2-Daten'
    });
  }
});


// fügt die Milchprodkte in die datenbank hinzu 

app.post('/saveC02Dairy', async ( req, res) => {
  console.log('SaveC02Dairy called!');

  const con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.body.userId;
  console.log('UserID aus dem Request:', req.body.userId);
  const milk_product = req.body.milk_product;

  try {
    const result = await query('SELECT * FROM food WHERE UserID = ?', [userId]);

    if (result.length > 0) {
      await query('UPDATE food SET milk_product = ? WHERE UserID = ?',
        [milk_product, userId]);
    } else {
      await query('INSERT INTO food (UserID, milk_product) VALUES (?, ?)',
        [userId, milk_product]);
    }

    res.send({
      success: true,
      message: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Fehler beim Speichern der CO2-Daten'
    });
  }
});

// fügt das fleisch hinzu

app.post('/saveC02Meat', async ( req, res) => {
  console.log('SaveC02Meat called!');

  const con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.body.userId;
  console.log('UserID aus dem Request:', req.body.userId);
  const meat = req.body.meat;

  try {
    const result = await query('SELECT * FROM food WHERE UserID = ?', [userId]);

    if (result.length > 0) {
      await query('UPDATE food SET meat = ? WHERE UserID = ?',
        [meat, userId]);
    } else {
      await query('INSERT INTO food (UserID, meat) VALUES (?, ?)',
        [userId, meat]);
    }

    res.send({
      success: true,
      message: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Fehler beim Speichern der CO2-Daten'
    });
  }
});

// fügt ölhaltige sachen hinzu

app.post('/saveC02Starchy', async (req, res) => {
  console.log('SaveC02Starchy called!');

  const con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.body.userId;
  console.log('UserID aus dem Request:', req.body.userId);
  const oil_sugar = req.body.oil_sugar;

  try {
    const result = await query('SELECT * FROM food WHERE UserID = ?', [userId]);

    if (result.length > 0) {
      await query('UPDATE food SET oil_sugar = ? WHERE UserID = ?',
        [oil_sugar, userId]);
    } else {
      await query('INSERT INTO food (UserID, oil_sugar) VALUES (?, ?)',
        [userId, oil_sugar]);
    }

    res.send({
      success: true,
      message: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Fehler beim Speichern der CO2-Daten'
    });
  }
});


// fügt die drinks hinzu

app.post('/saveC02Drinks', async (req, res) => {
  console.log('SaveC02Drinks called!');

  const con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.body.userId;
  console.log('UserID aus dem Request:', req.body.userId);
  const drinks = req.body.drinks;

  try {
    const result = await query('SELECT * FROM food WHERE UserID = ?', [userId]);

    if (result.length > 0) {
      await query('UPDATE food SET drinks = ? WHERE UserID = ?',
        [drinks, userId]);
    } else {
      await query('INSERT INTO food (UserID, drinks) VALUES (?, ?)',
        [userId, drinks]);
    }

    res.send({
      success: true,
      message: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Fehler beim Speichern der CO2-Daten'
    });
  }
});


app.get('/saveTrashData', async (req, res) => {
  console.log('saveTrashData called!');

  const con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.query.userId;

  try {
    var result = await query('SELECT co2_impact_per_sheet, co2_impact_per_kg FROM trash WHERE UserID =?', [userId]);

    res.send({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der TrashDaten', error);
    res.status(500).send({
      success: false,
      message: 'Fehler beim laden der Daten'
    });
  }
});

app.get('/resultC02', async (req, res) => {
  console.log('ResultC02 ist called!');

  const con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.query.userId; // Verwenden Sie req.query statt req.body

  try {
    const cars = 'SELECT Co2Emission FROM cars WHERE userId = ?';
    const house = 'SELECT co2_emissionHeat, co2_emission_electricity FROM house WHERE userId = ?';
    const trash = 'SELECT co2_impact_per_sheet, co2_impact_per_kg FROM trash WHERE userId = ?';

    const result = await Promise.all([
      query(cars, [userId]),
      query(house, [userId]),
      query(trash, [userId])
    ]);

    const carsResult = result[0].map(item => parseFloat(item.Co2Emission));
    const houseResult = result[1].map(item => parseFloat(item.co2_emissionHeat + item.co2_emission_electricity));
    const trashResult = result[2].map(item => parseFloat(item.co2_impact_per_sheet + item.co2_impact_per_kg));

    res.status(200).json({ carsResult, houseResult, trashResult }); // Senden Sie eine JSON-Antwort
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Laden der Daten'
    });
  }
});

// holt daten für das Datenblatt

app.get('/userData', async (req, res) => {
  const con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.query.userId; // Ändere req.body.userId zu req.query.userId

  try {
    const userDataQuery = 'SELECT Name, Birthday, Gender, Work FROM user WHERE ID = ?';
    const userData = await query(userDataQuery, [userId]);

    if (userData.length === 0) {        
      res.status(404).json({ error: 'Benutzer nicht gefunden' });
    } else {
      res.json(userData[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Abrufen der Benutzerdaten.' });
  } finally {
    con.end();
  }
});

app.get('/userVehicleData', async (req, res) => {
  console.log('userVehicledata called!');

  const con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.query.userId;

  try {
    const userVehicleDataQuery = 'SELECT Brand, PurchaseDate, Consumption, FuelType, Distance FROM cars WHERE UserID = ?';
    const userVehicleData = await query(userVehicleDataQuery, [userId]);

    if (userVehicleData.length === 0) {
      res.status(404).json({ error: 'Benutzer nicht gefunden' });
    } else {
      res.json(userVehicleData[0]);
    }
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Abrufen der Benutzerdaten.' });
  }
});

app.get('/userHouseData', async (req, res) => {
  console.log('userHouseData called!');

  const con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.query.userId;

  try {

    const userHouseDataQuery = 'SELECT countHouse, sizeHouse, heat, airHeat, addHeat, temperatur, waterHeat, countMember, powerConsumption, powerSelect, photovoltaik FROM house WHERE UserId = ?';
    const userHouseData = await query(userHouseDataQuery, [userId]);

    if (userHouseData.length === 0) {
      res.status(404).json({ error: 'Benutzer nicht gefunden' });
    }
    else {
      res.json(userHouseData[0]);
    }

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Abrufen der Benutzerdaten.' });
  }
});


// Gruppe erstellen // noch vervollständigen
app.post('/groups', async (req, res) => {
  console.log('groups called!');

  const con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const userId = req.body.userId;
  const group_name = req.body.group_name;
  const admin_id = req.body.admin_id;

  try {
    const result = await query('SELECT * FROM groups WHERE UserID = ? AND admin_id = ? AND group_name = ?', [userId, admin_id, group_name]);

    if (result.length > 0) {
      res.status(400).json({ message: 'Gruppe bereits vorhanden' });
    } else {
      await query('INSERT INTO groups (UserID, admin_id, group_name) VALUES (?, ?, ?)', [userId, admin_id, group_name]);
      res.json({ message: 'Gruppe erfolgreich erstellt' });
    }
  } catch (error) {
    console.error('Fehler beim Erstellen der Gruppe', error);
    res.status(500).json({ message: 'Fehler beim Erstellen der Gruppe' });
  }
});

// Ichecht die Email ob sie vorhanden ist in der Datenbank umd den user die Einladungsemail zu senden 

app.post('/checkEmail', async (req, res) => {
  console.log('checkEmail is called!');

  const con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const email = req.body.email;

  try {
    const user = await query('SELECT * FROM `user` WHERE Email LIKE ?', [email]);

    if (user.length == 0) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }
     // E-Mail-Konfiguration
     


     const cb = (error, info) => {
      if (error) {
        console.error('Fehler beim Senden der E-Mail:', error);
        res.status(500).json({ message: 'Fehler beim Senden der E-Mail' });
      } else {
        console.log('E-Mail erfolgreich gesendet:', info.response);
        res.json({ message: 'E-Mail erfolgreich gesendet' });
      }
    }
   
     sendMail(email, 'Du wurdest zu einer Gruppe eingeladen. Bitte registriere dich unter <a href="http://localhost:4200/register">http://localhost:4200/register</a>', cb)
            
      


    
  } catch (error) {
    console.error('Fehler beim Suchen des Benutzers', error);
    res.status(500).json({ message: 'Fehler beim Suchen des Benutzers' });
  }
});





// Erstellt eine Email mit einem neuen Passwort und sendet diese dem User 
app.post('/forgottPassword', async (req, res) => {
  const con = connectDB();
  const query = util.promisify(con.query).bind(con);

  const name = req.body.name;
  const email = req.body.email;

  try {
    const user = await query('SELECT * FROM user WHERE name = ? AND email = ?', [name, email]);

    if (user.length === 0) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    function generateRandomPassword() {
      const passwordLength = 12;
      const randomPassword = randomstring.generate({
        length: passwordLength,
        charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' // Gültige Zeichen für das Passwort
      });
      return randomPassword;
    }

    const newPassword = generateRandomPassword();

    // Hier können Sie das neue Passwort in die Datenbank speichern, nachdem Sie es gehasht haben
    const newPasswordHash =  sha512(newPassword); // Hier wird das Passwort mit Bcrypt gehasht

    // Update-Befehl, um das neue gehashte Passwort in der Datenbank zu speichern
    await query('UPDATE user SET password = ? WHERE name = ? AND email = ?', [newPasswordHash, name, email]);

    // E-Mail-Konfiguration
    const transporter = nodemailer.createTransport({
      host: 'mail.gmx.net',
      port: 587, // oder 465 für SSL
      tls: {
        ciphers:'SSLv3',
        rejectUnauthorized: false
      },
      debug:true,
        auth: {
        user: 'ecotrack@gmx.at',
        pass: 'Ebenberger12!'
      }
    });

    const mailOptions = {
      from: 'ecotrack@gmx.at', // Absender
      to: email, // Empfänger
      subject: 'Ihr neues Passwort', // Betreff
      text: `Ihr neues Passwort lautet: ${newPassword}` // Textinhalt der E-Mail
    };

    // E-Mail senden
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Fehler beim Senden der E-Mail:', error);
        // Hier können Sie geeignete Maßnahmen ergreifen, wenn das Senden der E-Mail fehlschlägt
        res.status(500).json({ message: 'Fehler beim Senden der E-Mail' });
      } else {
        console.log('E-Mail erfolgreich gesendet:', info.response);
        // Hier können Sie geeignete Maßnahmen ergreifen, wenn die E-Mail erfolgreich gesendet wurde

        // Erfolgreiche Antwort senden
        res.json({ message: 'Neues Passwort wurde generiert und gespeichert.' });
      }
    });
  } catch (error) {
    console.error('Fehler beim Zurücksetzen des Passworts:', error);
    res.status(500).json({ message: 'Fehler beim Zurücksetzen des Passworts' });
  }
});









const port = process.env.PORT || 3000;
app.listen(port, () => {
    connectDB();
    console.log('Server is running on port 3000');
});