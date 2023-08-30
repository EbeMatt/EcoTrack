<template>
  <div class="container-car">
    <div>
      <NavBar />
    </div>

    <div class="box-car">
      <h4 @click="closeVehicleCar">X</h4>
      <label for="cars">Bezeichnung:</label>
      <select name="cars" id="cars" v-model="selectedCarBrand">
  <option v-for="brand in carBrands" :value="brand" :key="brand">{{ brand }}</option>
</select>
      <label for="buy">Anschaffung:</label>
      <input type="date">
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
  <div>
    <FormularC02Kraftstoff />
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

export default {
  name: "VehicleCar",
  components: {
    NavBar,
    FormularC02Kraftstoff,
    BerechnungProFahrt,
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
    updateChartAndTable() {
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
          labels: ["", ""],
          datasets: [
            {
              label: "Verbrauch je 100 km",
              data: [parseFloat(this.consumption), null],
              backgroundColor: ["rgba(75, 192, 192, 0.2)"],
              borderColor: ["rgba(75, 192, 192, 1)"],
              borderWidth: 1,
            },
            {
              label: "Fahrleistung pro Jahr",
              data: [null, parseFloat(this.distance)],
              backgroundColor: ["rgba(54, 162, 235, 0.2)"],
              borderColor: ["rgba(54, 162, 235, 1)"],
              borderWidth: 1,
              yAxisID: "y-axis-2",
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
            "y-axis-2": {
              position: "right",
              beginAtZero: true,
              grid: {
                display: false,
              },
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
  background: #4b7432;
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

button {
  width: 200px;
  height: 50px;
  appearance: none;
  background-color: #2ea44f;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: flex;
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
  vertical-align: middle;
  white-space: nowrap;
  margin: 10px;
  margin-top: 40px;
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

.box-car h4 {
    position: absolute;
    color: black;
    top: 150px;
    right: 560px;
}

.box-car h4:hover {
    color: rgb(39, 28, 28);
    cursor: pointer;
}

.box-car label {
        font-size: 18px;
        font-weight: bold;
        margin: 4px;
    }

    .box-car input {
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid #2ea44f; /* Aktualisierte Border-Farbe */
  margin-bottom: 10px;
  margin: 10px;
  text-align: center;
  font-size: 20px;
}


    .box-car select {
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid #2ea44f; /* Aktualisierte Border-Farbe */
  margin-bottom: 10px;
  margin: 10px;
  text-align: center;
  font-size: 20px;
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


</style>