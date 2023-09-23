<template>
  <div class="container-car">
    <div>
      <NavBar />
    </div>

    <div class="box-car">
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

    <canvas id="myChart" width="300" height="300"></canvas>

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
import { Chart } from "chart.js";
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
      chart: null,
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

  // Fügen Sie hier Überprüfungen auf null oder undefined hinzu
  if (!selectedCarBrand || !purchaseDate || !consumption || !selectedFuel || !distance) {
    // Überprüfe, ob alle erforderlichen Werte vorhanden sind
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

  this.updateChart();
  // Du kannst hier auch die Tabelle aktualisieren, falls benötigt
},



updateChart() {
  if (this.chart) {
    this.chart.destroy();
  }

  const ctx = document.getElementById("myChart").getContext("2d");
  this.chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Verbrauch je 100 km", "Fahrleistung pro Jahr"],
      datasets: [
        {
          label: "Daten",
          data: [parseFloat(this.consumption), parseFloat(this.distance)],
          backgroundColor: ["rgba(75, 192, 192, 0.7)", "rgba(255, 159, 64, 0.7)"],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 14,
          stepSize: 2,
          ticks: {
            color: "white",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          color: "white",
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            color: "white",
          },
        },
        datalabels: {
          display: false,
        },
      },
      bar: {
        borderWidth: 1,
        categoryPercentage: 0.5,
        barPercentage: 1.0,
      },
    },
  });
},
    calculateCO2(fuel) {
  if (!this.consumption || !this.distance) {
    return 0; // Zeige 0, wenn Verbrauch oder Distanz fehlen
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
    return 0; // Zeige 0, wenn Distanz fehlt
  }

  const footprintPerKm = fuel === 'elektro' ? 0 : 1;
  const footprint = parseFloat(this.distance) * footprintPerKm;
  return footprint.toFixed(2);
},
  },
  mounted() {
    this.updateChart();
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
  width: 100%; /* Ändere die Breite auf 100% */
  max-width: 200px; /* Füge eine maximale Breite hinzu, um zu verhindern, dass er zu breit wird */
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
  width: 100%; /* Ändere die Breite auf 100% */
  max-width: 300px; /* Füge eine maximale Breite hinzu, um zu verhindern, dass sie zu breit werden */
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
  left: 10px; /* 10px Abstand vom rechten Rand */
  background-color: #22bc1a;
  color: white; /* Textfarbe auf Weiß setzen */
  border: none; /* Keine Rand */
  border-radius: 5px; /* Abrunde Ecken */
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 10px 20px; /* 10px oben/unten, 20px links/rechts Innenabstand */
  font-size: 16px; /* Schriftgröße anpassen */
  transition: background-color 0.3s; /* Sanfter Übergang für die Hintergrundfarbe */
}

/* Hinzufügen eines Hover-Effekts */
.back-button:hover {
  background-color: #7d861c; /* Dunklere Hintergrundfarbe im Hover-Zustand */
}

.component-spacing {
  margin-top: 50px;
}

</style>