<template>
  <div class="container-car">
    <div>
      <NavBar />
    </div>

    <div class="box-car">
      <i class='bx bxs-car'></i>
      <label for="cars">Bezeichnung:</label>
      <select name="cars" id="cars" v-model="selectedCarBrand">
  <option v-for="brand in carBrands" :value="brand" :key="brand">{{ brand }}</option>
</select>
      <label for="buy">Anschaffung:</label>
      <input type="date" v-model="purchase_date">
      <label for="consumption">Verbrauch je 100km:</label>
      <input type="text" id="consumption" v-model="consumption" placeholder="Verbrauch">
      <label for="fuel">Treibstoff:</label>
      <select name="fuel" id="fuel" v-model="selectedFuel">
        <option value="diesel">Diesel</option>
        <option value="benzin">Benzin</option>
        <option value="elektro">Elektro</option>
      </select>
      <label for="distance">Fahrleistung pro Jahr:</label>
      <input type="text" id="distance" v-model="distance" placeholder="km"><br>
      <button class="save-button" @click="updateChartAndTable">Speichern</button>
    </div>
    <button class="back-button" @click="closeVehicleCar">Zurück zu Meine Daten</button>

    <div class="info">
    <div class="list">
      <ul>
        <li>Bitte füllen Sie alle Inputfelder aus.</li>
        <li>Die von Ihnen in die Eingabefelder eingegebenen Werte werden als Grundlage für die Berechnung des tatsächlichen Verbrauchs verwendet.</li>
        <li><strong>Bitte Beachten Sie:</strong>das die Literangabe im Inputfeld festgelegt sein muss damit die Berechnung für Ihren wöchentlichen verbrauch angegeben werden kann.</li>
        <li>Wir arbeiten daran dies zu beheben!</li>
      </ul>
    </div>
  </div>

    

    <table class="eco-table">
    <thead>
      <tr>
        <th>Treibstoff</th>
        <th>CO2-Ausstoß (kg)</th>
        <th>Ökologischer Fußabdruck (gha)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="selectedFuel === 'diesel'">
        <td>Diesel</td>
        <td>{{ calculateCO2('diesel') }}</td>
        <td>{{ calculateFootprint('diesel') }}</td>
      </tr>
      <tr v-else-if="selectedFuel === 'benzin'">
        <td>Benzin</td>
        <td>{{ calculateCO2('benzin') }}</td>
        <td>{{ calculateFootprint('benzin') }}</td>
      </tr>
      <tr v-else-if="selectedFuel === 'elektro'">
        <td>Elektro</td>
        <td>{{ calculateCO2('elektro') }}</td>
        <td>{{ calculateFootprint('elektro') }}</td>
      </tr>
    </tbody>
  </table>
  <div class="component-spacing">
    <BerechnungsGrundlageFahrzeug />
  </div>
  <div class="component-spacing">
    <FormularC02Kraftstoff />
  </div>
  <div class="component-spacing">
    <HeaderBerechnungProFahrt />
  </div>
<div>
  <BerechnungProFahrt
        :consumption="consumption"
        :selectedFuel="selectedFuel"
        @consumptionUpdated="updateConsumption"
      />
</div>
  </div>
  
</template>

<script>
import NavBar from "./NavBar.vue";
import FormularC02Kraftstoff from "./FormularC02Kraftstoff.vue";
import BerechnungProFahrt from "./BerechnungProFahrt.vue";
import { parseToken } from './tokenUtils';
import axios from 'axios';
import BerechnungsGrundlageFahrzeug from "./BerechnungsGrundlageFahrzeug.vue";
import HeaderBerechnungProFahrt from "./HeaderBerechnungProFahrt.vue";



export default {
  name: "VehicleCar",
  components: {
    NavBar,
    FormularC02Kraftstoff,
    BerechnungProFahrt,
    BerechnungsGrundlageFahrzeug,
    HeaderBerechnungProFahrt
},
  data() {
    return {
      carBrands: [
  "Abarth",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Bugatti",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Citroën",
  "Dacia",
  "Daewoo",
  "Daihatsu",
  "Dodge",
  "Donkervoort",
  "DS",
  "Ferrari",
  "Fiat",
  "Fisker",
  "Ford",
  "Honda",
  "Hummer",
  "Hyundai",
  "Infiniti",
  "Iveco",
  "Jaguar",
  "Jeep",
  "Kia",
  "KTM",
  "Lada",
  "Lamborghini",
  "Lancia",
  "Land Rover",
  "Landwind",
  "Lexus",
  "Lotus",
  "Maserati",
  "Maybach",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "MG",
  "Mini",
  "Mitsubishi",
  "Morgan",
  "Nissan",
  "Opel",
  "Peugeot",
  "Porsche",
  "Renault",
  "Rolls-Royce",
  "Rover",
  "Saab",
  "Seat",
  "Skoda",
  "Smart",
  "SsangYong",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo"
],
      selectedCarBrand: null,
      consumption: null,
      distance: null,
      purchase_date: null,
      selectedFuel: 'diesel',
      co2Constants: {
        diesel: 2.65,
        benzin: 2.37,
        elektro: 0,
      },
    };
  },
  
  methods: {
    closeVehicleCar() {
      this.$emit('closeVehicleCar');
    },
    updateConsumption(consumption, selectedFuel) {
      this.consumption = consumption;
      this.selectedFuel = selectedFuel;
    },



    async updateChartAndTable() {
  const selectedCarBrand = this.selectedCarBrand; 
  const purchaseDate = this.purchase_date; 
  const consumption = this.consumption; 
  const selectedFuel = this.selectedFuel; 
  const distance = this.distance; 

  
  if (!selectedCarBrand || !purchaseDate || !consumption || !selectedFuel || !distance) {
    
    console.error("Nicht alle erforderlichen Felder sind ausgefüllt.");
    return;
  }

  const token = localStorage.getItem('token');
  const decodedToken = parseToken(token);

  axios.post('http://localhost:3000/saveVehicleCar', {
    userId: decodedToken.id,
    brand: selectedCarBrand,
    purchaseDate: purchaseDate,
    consumption: consumption,
    fuel_type: selectedFuel,
    distance: distance,
    co2_emission: this.calculateCO2(selectedFuel),
    footprint: this.calculateFootprint(selectedFuel),
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function(error){
    console.log(error);
  });

},
    calculateCO2(fuel) {
  if (!this.consumption || !this.distance) {
    return 0; 
  }

  const co2PerLiter = this.co2Constants[fuel];
  const consumptionPerKm = parseFloat(this.consumption) / 100;
  const co2 = consumptionPerKm * co2PerLiter * parseFloat(this.distance);

  if (fuel === 'elektro') {
    return 0;
  } else {
    return co2.toFixed(2);
  }
},
calculateFootprint(fuel) {
  if (!this.distance) {
    return 0; 
  }

  const footprintPerKm = fuel === 'elektro' ? 0 : 1;
  const footprint = parseFloat(this.distance) * footprintPerKm;
  return footprint.toFixed(2);
},
  },
  
};
</script>


<style scoped>

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

i {
  font-size: 50px;
  margin-bottom: 10px;
  color: #22bc1a;
}



.container-car {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; 
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
  z-index: 9999;
  background-image: url('../assets/Background13.png');
  overflow: auto;
  padding-top: 50px; 
}


    .box-car {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #3c3d42;
    background: linear-gradient(0deg, #f6f8e2 0%, #e0ddca 100%);
    padding: 10px;
    width: 30%;
    height: 600px;
    border-radius: 10px;
    margin: 80px auto;
   
   
}

.save-button {
  width: 100%; 
  max-width: 200px; 
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: block;
  align-items: center;
  justify-content: center;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  margin: 0 auto;
}



button:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

button:hover {
  background-color: #2c974b;
}

button:focus {
  box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
  outline: none;
}

button:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}

button:active {
  background-color: #298e46;
  box-shadow: rgba(20, 70, 32, .2) 0 1px 0 inset;
}

h1 {
    border: 5px outset black;
}



.box-car label {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: -5px;
    }

    .box-car input, .box-car select {
  width: 100%; 
  max-width: 300px; 
  height: 25px;
  border-radius: 5px;
  border: 2px solid #2ea44f;
  margin-bottom: 10px;
  margin: 10px;
  text-align: center;
  font-size: 16px;
}


.eco-table {
  margin-top: 40px;
  margin-bottom: 50px;
}

table {
  border: 2px solid black
}


table tr th  {
  border: 2px solid black;
  text-align: center;
  padding: 5px;
  font-size: 20px;
  background-color: rgb(219, 186, 186);
}

td {
  border: 2px solid black;
  padding: 5px;
  font-size: 18px;
  background-color: rgb(219, 186, 186)
}

.back-button {
  position: absolute;
  top: 150px;
  left: 10px; 
  background-color: #85b882;
  color: black; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 10px 20px; 
  font-size: 12px; 
  transition: background-color 0.3s; 
}


.back-button:hover {
  background-color: #7d861c; 
}

.component-spacing {
  margin-top: 50px;
}

.list {
  
  background-color: #85b882; 
  padding: 10px 20px;
  border-radius: 5px;
}

.info {
 position: absolute;
 top: 200px;
 right: 20px;
 width: 20%;
}

</style>