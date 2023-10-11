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

    <div>
        <div>
        <label>Bezeichnung:</label>
        <p>{{ userVehicle.Brand }}</p>
        </div>
        <div>
          <label>Anschaffung:</label>
          <p>{{ userVehicle.PurchaseDate }}</p>
        </div>
        <div>
          <label>Verbrauch je 100 km:</label>
          <p>{{ userVehicle.Consumption }}</p>
        </div>
        <div>
          <label>Treibstoff:</label>
          <p>{{ userVehicle.FuelType }}</p>
        </div>
        <div>
          <label>Fahrleistung pro Jahr:</label>
          <p>{{ userVehicle.Distance }}</p>
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
            }
        };
     },

     mounted() {
    this.fetchUserData();
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

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

</style>