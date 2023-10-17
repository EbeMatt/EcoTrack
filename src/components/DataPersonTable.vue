<template>

<div class="table-container">
    <div class="person-box">
       <div class="row">
        <label>Name:</label>
        <p>{{ userData.Name }}</p>
      </div>
      <div class="row">
        <label>Geburtstag:</label>
        <p>{{ userData.Birthday }}</p>
      </div>
      <div class="row">
        <label>Geschlecht:</label>
        <p>{{ userData.Gender }}</p>
      </div>
      <div class="row">
        <label>Pal-Faktor:</label>
        <p>{{ userData.Work }}</p>
      </div>
        
    </div>

    <div class="car-box">
        <div class="row">
        <label>Bezeichnung:</label>
        <p>{{ userVehicle.Brand }}</p>
        </div>
        <div class="row">
          <label>Anschaffung:</label>
          <p>{{ userVehicle.PurchaseDate }}</p>
        </div>
        <div class="row">
          <label>Verbrauch je 100 km:</label>
          <p>{{ userVehicle.Consumption }}</p>
        </div>
        <div class="row">
          <label>Treibstoff:</label>
          <p>{{ userVehicle.FuelType }}</p>
        </div>
        <div class="row">
          <label>Fahrleistung pro Jahr:</label>
          <p>{{ userVehicle.Distance }}</p>
        </div>
      </div>

      <div class="house-box">
        <div class="row">
          <label>Anzahl der Wonsitze:</label>
          <p>{{ userHouse.countHouse }}</p>
        </div>
        <div class="row">
          <label>Wohnfläche in m²:</label>
          <p>{{ userHouse.sizeHouse }}</p>
        </div>
        <div class="row">
          <label>Energiekennzahl:</label>
          <p>{{ userHouse.heat }}</p>
        </div>
        <div class="row">
          <label>Heizen:</label>
          <p>{{ translateWord(userHouse.airHeat) }}</p>
        </div>
        <div class="row">
          <label>Zusatzheizung:</label>
          <p>{{ userHouse.addHeat }}</p>
        </div>
        <div class="row">
          <label>Raumtemperatur:</label>
          <p>{{ userHouse.temperatur }}</p>
        </div>
        <div class="row">
          <label>Wie erwärmen Sie Ihr Wasser?</label>
          <p>{{ translateWord(userHouse.waterHeat) }}</p>
        </div>
        <div class="row">
          <label>Personen im Haushalt:</label>
          <p>{{ userHouse.countMember }}</p>
        </div>
        <div class="row">
          <label>Stromverbrauch in kWh:</label>
          <p>{{ userHouse.powerConsumption }}</p>
        </div>
        <div class="row">
          <label>Welchen Strom habe ich:</label>
          <p>{{ userHouse.powerSelect }}</p>
        </div>
        <div class="row">
          <label>Photovoltaik?</label>
          <p>{{ translateWord(userHouse.photovoltaik) }}</p>
        </div>

      </div>
    

</div>
</template>

<script>

import axios from 'axios';
import { parseToken } from './tokenUtils';

export default {
    name: 'DataPersonTable',
     data() {
        return {
            userData: {
                Name: '',
                Birthday: '',
                Gender: '',
                Work: '',

            },
            userVehicle: {
              Brand: '',
              PurchaseDate: '',
              Consumption: '',
              FuelType: '',
              Distance: '',
            },
            userHouse: {
              countHouse: '',
              sizeHouse: '',
              heat: '',
              airHeat: '',
              addHeat: '',
              temperatur: '',
              waterHeat: '',
              countMember: '',
              powerConsumption: '',
              powerSelect: '',
              photovoltaik: '',
            }
        };
     },

     mounted() {
    this.fetchUserData();
    this.fetchUserVehicleData();
    this.fetchUserHouseData();
    
  },

  methods: {
    async fetchUserData() {
  try {
    const token = localStorage.getItem('token');
    const decodedToken = parseToken(token);

    const userData = {
      headers: {
        Authorization: `Bearer ${token}`, // Setze den Token als Authentifizierungs-Header
      },
      params: {
        userId: decodedToken.id, // Füge den userId als Parameter hinzu
      },
    };

    const response = await axios.get('http://localhost:3000/userData', userData);

    if (response.data) {
      
        if(response.data.Birthday) {
            const Birthday = new Date(response.data.Birthday);
            this.userData.Birthday = Birthday.toLocaleDateString();
        }

        if(response.data.Gender === 1) {
            this.userData.Gender = 'männlich';
        } else if (response.data.Gender === 2) {
            this.userData.Gender = 'weiblich';
        } else {
            this.userData.Gender = 'divers';
        }

        this.userData.Name = response.data.Name;
        this.userData.Work = response.data.Work;
    }

    console.log(this.userData);
  } catch (error) {
    console.log(error);
  }
},

async fetchUserVehicleData() {
   
    try {
      const token = localStorage.getItem('token');
      const decodedToken = parseToken(token);
  
      const userVehicleData = {
        headers: {
          Authorization: `Bearer ${token}`, // Setze den Token als Authentifizierungs-Header
        },
        params: {
          userId: decodedToken.id, // Füge den userId als Parameter hinzu
        },
      };
  
      const response = await axios.get('http://localhost:3000/userVehicleData', userVehicleData);
  
      if (response.data) {

        if(response.data.PurchaseDate) {
            const PurchaseDate = new Date(response.data.PurchaseDate);
            this.userVehicle.PurchaseDate = PurchaseDate.toLocaleDateString();
        }
        this.userVehicle.Brand = response.data.Brand;
        this.userVehicle.Consumption = response.data.Consumption;
        
        if (response.data.FuelType) {
                this.userVehicle.FuelType = this.firstLetter(response.data.FuelType);
            }


        this.userVehicle.Distance = response.data.Distance;
      }
  
      console.log(this.userVehicle);
    } catch (error) {
      console.log(error);
    }
},

async fetchUserHouseData() {

   try {

     const token = localStorage.getItem('token');
      const decodedToken = parseToken(token);

      const userHouse = {
        headers: {
          Authorization: `Bearer ${token}`, // Setze den Token als Authentifizierungs-Header
        },
        params: {
          userId: decodedToken.id, // Füge den userId als Parameter hinzu
        },
      };

      const response = await axios.get('http://localhost:3000/userHouseData', userHouse);

      if (response.data) {
        this.userHouse.countHouse = response.data.countHouse;
        this.userHouse.sizeHouse = response.data.sizeHouse;
        this.userHouse.heat = response.data.heat;

        if(response.data.airHeat && response.data.addHeat && response.data.waterHeat && response.data.powerSelect && response.data.photovoltaik) {
          this.userHouse.airHeat = this.firstLetter(response.data.airHeat);
          this.userHouse.addHeat = this.firstLetter(response.data.addHeat);
          this.userHouse.waterHeat = this.firstLetter(response.data.waterHeat);
          this.userHouse.powerSelect = this.firstLetter(response.data.powerSelect);
          this.userHouse.photovoltaik = this.firstLetter(response.data.photovoltaik);
        }
       
        this.userHouse.temperatur = response.data.temperatur;
        this.userHouse.countMember = response.data.countMember;
        this.userHouse.powerConsumption = response.data.powerConsumption;
        
        
        
        }
      console.log(this.userHouse);
    } catch (error) {
      console.log(error);

      }
   },

    firstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);

   },

   translateWord(word) {
     const translation = {
      Farheat: 'Fernwärme',
      No: 'Nein',
      Power: 'Strom'
     
     };
     return translation[word] || word;
   }
  },
};
</script>

<style scooped>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}


body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
}

.person-box {
    width: 30%;
    height: auto;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
}

.car-box {
    width: 30%;
    height: auto;
    background-color: #ccb5b5;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
}

.house-box {
    width: 30%;
    height: auto;
    background-color: #b97272;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

</style>