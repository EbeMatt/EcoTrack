<template>
 
  <div class="container-house">
    <div> 
    <NavBar />
  </div>
   
    <div class="box-house">
      <div class="left-side">
      <label for="countHouse" class="left-element">Anzahl der Wohnsitze:</label>
      <select class="option-style" name="contHouse" id="countHouse" v-model="selectedWohnsitze">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <label for="size" class="left-element">Wohnfläche in m²:</label>
      <input type="text" id="size" name="area"  v-model="sizeHouse">
      <label for="heat" class="left-element">Ihre Energiekennzahl:</label>
      <p class="left-element">Die Energiekennzahl in (kWh) </p>
      <input type="text" id="heat" name="heat"  v-model="scalaHeat" @input="calculateEnergyClass()">
      <p class="left-element">Die Energieeffizienzklasse ist: {{ energyClass }}</p>
      <label for="airHeat" class="left-element">Heizen:</label>
      <select class="option-style" name="airHeat" id="airHeat" v-model="heatingType">
        <option value="wood">Holz,Pellets,Hackschnitzel</option>
        <option value="oil">Öl</option>
        <option value="farheat">Fernwärme</option>
        <option value="electricity">Strom</option>
        <option value="solar">Solar</option>
        <option value="ground">Wärmepumpe</option>
      </select>
      <label for="addHeat" class="left-element">Zusatzheizung?</label>
      <select class="option-style" name="addHeat" id="addHeat" v-model="additionalHeatingType">
        <option value="holz">Holz, Hackschnitzel, Pellets</option>
        <option value="oel">Öl, Kohle</option>
        <option value="strom">Strom</option>
        <option value="warempumpe">Wärmepumpe</option>
        <option value="fernwaerme">Fernwärme</option>
        <option value="sonne">solar</option>
        <option value="none">Keine</option>
      </select>
      <label for="tempratur" class="left-element">Welche Temperatur haben Ihre Räume:</label>
      <input type="text" id="temperatur"  v-model="selectedTemperature">
      <!-- <datalist id="temperature-options">
        <option value="0">Unter 20°C</option>
        <option value="1">20°C bis 21°C</option>
        <option value="2">etwa 22°C</option>
        <option value="3">etwa 23°C</option>
        <option value="4">etwa 24°C oder mehr</option>
      </datalist> -->
    </div>
    <div class="right-side">
      <label for="waterHeat" class="left-element">Wie erwärmen Sie Ihr Wasser?</label>
      <select class="option-style" name="waterHeat" id="waterHeat" v-model="waterHeatingType">
        <option value="power">Strom</option>
        <option value="solarplant">Solaranlage</option>
        <option value="heatPower">Mit der Heizung</option>
      </select>
      <label for="countMember" class="left-element">Wieviel Personen leben im Haushalt?</label>
      <select class="option-style" name="contMember" id="countMember" v-model="selectedPerson">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      <label for="powerConsumption" class="left-element">Stromverbrauch in kWh?:</label>
      <input type="text" id="powerConsumption" name="stromverbrauch"  v-model="powerConsumption">
      <label for="powerSelect" class="left-element">Welchen Strom beziehen Sie?</label>
      <select class="option-style" name="powerSelect" id="powerSelect" v-model="electricitySource">
        <option value="europamix">Europäischer Strommix</option>
        <option value="austriamix">Keine Ahnung/Österreichischer Strommix</option>
        <option value="oekopower">Grüner Strom/Ökostrom</option>
      </select>
      <label for="photovoltaik" class="left-element">Haben Sie eine Photovoltaikanlage?</label>
      <select class="option-style" name="photovoltaik" id="photovoltaik" v-model="hasPhotovoltaics">
        <option value="yes">Ja</option>
        <option value="no">Nein</option>
      </select>
    </div>
      <br>
      <button class="save-button" @click="saveData">Speichern</button>
    </div>
    <button class="back-button" @click="closeHouseFlat">Zurück zu Meine Daten</button>
    <canvas id="myChart" width="300" height="300"></canvas>
    <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Daten</th>
          <th>Ergebnis</th>
          <th>% vom Heizen-Durchschnitt</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>CO2-Verbrauch</td>
          <td>{{ calculateCO2Consumption().toFixed(1) }} kg/a</td>
          <td :style="{ color: isAboveHeatingAverage ? 'red' : 'green' }">
            {{ ((calculateCO2Consumption() / 1000) / worldAverageCO2 * 100).toFixed(1) }}%
            <span v-if="isAboveHeatingAverage">Sie liegen leider über dem Heizen-Durchschnitt</span>
            <span v-else>Sehr gut! Sie liegen unter dem Heiz-Durchschnitt</span>
          </td>
        </tr>
        <tr>
          <td>gha durch Heizen</td>
          <td>{{ calculateGha().toFixed(1) }}</td>
          <td :style="{ color: isAboveHeatingAverage ? 'red' : 'green' }">
            {{ ((calculateGha() * 100) / worldAverageGha).toFixed(1) }}%
            <span v-if="isAboveHeatingAverage">Sie liegen leider über dem Heizen-Durchschnitt</span>
            <span v-else>Sehr gut! Sie liegen unter dem Heiz-Durchschnitt</span>
          </td>
        </tr>
        <tr>
  <td>CO2-Emissionen durch Stromverbrauch</td>
  <td>{{ calculateCO2andGhaFromElectricity().co2Emission.toFixed(1) }} kg</td>
  <td :style="{ color: isAboveElectricityAverage ? 'red' : 'green' }">
    {{ ((calculateCO2andGhaFromElectricity().co2Emission / 1000) / worldAverageCO2 * 100).toFixed(1) }}%
    <span v-if="isAboveElectricityAverage">Sie liegen leider über dem Stromverbrauch-Durchschnitt</span>
    <span v-else>Sehr gut! Sie liegen unter dem Stromverbrauch-Durchschnitt</span>
  </td>
</tr>
<tr>
  <td>gha durch Stromverbrauch</td>
  <td>{{ calculateCO2andGhaFromElectricity().gha.toFixed(1) }}</td>
  <td :style="{ color: isAboveElectricityAverage ? 'red' : 'green' }">
    {{ ((calculateCO2andGhaFromElectricity().gha * 100) / worldAverageGha).toFixed(1) }}%
    <span v-if="isAboveElectricityAverage">Sie liegen leider über dem Stromverbrauch-Durchschnitt</span>
    <span v-else>Sehr gut! Sie liegen unter dem Stromverbrauch-Durchschnitt</span>
  </td>
</tr>
   </tbody>
    </table>
  </div>
  <div>
    <FormularC02 />
  </div>
  </div>
  
</template>


<script>
import Chart from 'chart.js/auto';
import NavBar from './NavBar.vue';
import FormularC02 from './FormularC02.vue';
import { parseToken } from './tokenUtils';
import axios from 'axios';

export default {
  name: 'HouseFlat',
  components: {
    NavBar,
    FormularC02,
  },
  data() {
    return {
      sizeHouse: null,
      scalaHeat: null,
      heatingType: null,
      additionalHeatingType: null,
      selectedTemperature: null,
      waterHeatingType: null,
      powerConsumption: null,
      electricitySource: null,
      hasPhotovoltaics: null,
      energyEfficiency: {
        classA: { min: 0, max: 30 },
        classB: { min: 31, max: 50 },
        classC: { min: 51, max: 75 },
        classD: { min: 76, max: 100 },
        classE: { min: 101, max: 150 },
        classF: { min: 151, max: 200 },
        classG: { min: 201, max: Infinity },
      },
      energyClass: null,
      chart: null,
      heatingConsumption: 0,
      waterConsumption: 0,
      chartData: [],
      worldAverageCO2: 4.83, // CO2-Welt-Durchschnitt in Tonnen pro Person pro Jahr
      worldAverageGha: 1.7, 
      electricityCO2Factor: 0.13,// c02 produktion für 1 gramm 
    
    };
  },
  mounted() {
    this.createChart();
  },
  computed: {
    isAboveWorldAverage() {
      const gha = this.calculateGha();
      return gha > this.worldAverageGha;
    },
  },
  methods: {
    closeHouseFlat() {
      this.$emit('closeHouseFlat');
    },
    calculateHeatingConsumption() {
      this.heatingConsumption = 'Berechneter Heizungsenergieverbrauch';
    },
    calculateWaterConsumption() {
      this.waterConsumption = 'Berechneter Warmwasser-Energieverbrauch';
    },
    calculateEnergyClass() {
      if (!this.scalaHeat) {
        this.energyClass = null;
        return;
      }
      const scalaHeat = parseFloat(this.scalaHeat);
      if (scalaHeat >= 150) {
        this.energyClass = 'schlechter als Durchschnitt';
      } else if (scalaHeat >= 90) {
        this.energyClass = 'Durchschnitt';
      } else if (scalaHeat >= 65) {
        this.energyClass = 'unter Neubaustandard';
      } else if (scalaHeat >= 40) {
        this.energyClass = 'Niedrigenergiehaus';
      } else if (scalaHeat >= 30) {
        this.energyClass = 'Niedrigstenergiehaus';
      } else {
        this.energyClass = 'Passivhaus';
      }
    },
    calculateCO2Consumption() {
      const heatingTypeCO2Factors = {
        wood: 0.038,
        oil: 0.274,
        farheat: 0.07,
        electricity: 0.595,
        solar: 0,
        ground: 0.038,
      };
      const additionalHeatingTypeCO2Factors = {
        holz: 0.038,
        oel: 0.274,
        strom: 0.595,
        warempumpe: 0.038,
        fernwaerme: 0.07,
        sonne: 0,
        none: 0,
      };

      const energyConsumption = this.selectedWohnsitze * this.sizeHouse * this.scalaHeat;
      if (isNaN(energyConsumption)) {
    return 0;
  }
      const heatingCO2Factor = heatingTypeCO2Factors[this.heatingType];
      const additionalHeatingCO2Factor = additionalHeatingTypeCO2Factors[this.additionalHeatingType];
      const heatingCO2Emmissions = energyConsumption * heatingCO2Factor;
      const additionalHeatingCO2Emmissions = energyConsumption * additionalHeatingCO2Factor;
      const totalCO2Emmissions = heatingCO2Emmissions + additionalHeatingCO2Emmissions;

      return totalCO2Emmissions;
    },
    calculateGha() {
      const averageCO2EmissionsPerPerson = 5.0;
      const totalCO2Emissions = this.calculateCO2Consumption() / 1000;
      const gha = totalCO2Emissions / averageCO2EmissionsPerPerson;

      // Überprüfung auf gültige Eingaben
      if (isNaN(gha)) {
        return 0;
      }

      return gha;
    },
    calculateCO2andGhaFromElectricity() {
      const electricityConsumption = parseFloat(this.powerConsumption);
      if (!isNaN(electricityConsumption)) {
        // Erzeugung von 1 kWh Strom in Österreich setzt 130 Gramm CO2 frei
        const co2EmissionPerKWh = 130 / 1000; // Umrechnung in Tonnen
        const totalCO2Emission = electricityConsumption * co2EmissionPerKWh;
        const gha = totalCO2Emission / this.worldAverageCO2;

        return {
          co2Emission: totalCO2Emission,
          gha: gha,
        };
      } else {
        return {
          co2Emission: 0,
          gha: 0,
        };
      }
    },
   
    createChart() {
      const canvas = document.getElementById('myChart');
      const ctx = canvas.getContext('2d');

      

      const data = {
        labels: [
          'Energiekennzahl (kWh/m²a)',
          'Größe des Wohnraumes in m²',
          'Stromverbrauch',
        ],
        datasets: [
          {
            label: 'Daten',
            data: this.chartData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
             
            ],
            borderWidth: 5,
          },
        ],
      };

      const options = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: 'white',
      },
    },
    x: {
      ticks: {
        color: 'white',
      },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (tooltipItem, data) => {
          if (data && data.datasets) {
            const label = data.labels[tooltipItem.index];
            const value = data.datasets[0].data[tooltipItem.index];
            return `${label}: ${tooltipItem.index === 0 ? `${value} kWh/m²a` : value}`;
          }
        },
      },
    },
    legend: {
      labels: {
        color: 'white',
      },
    },
  },
};

      this.chart = new Chart(ctx, {
        type: 'bar',
        data,
        options,
      });
    },
      async saveData() {

        const vm = this;

        const token = localStorage.getItem('token');
        const decodedToken = parseToken(token);


     
      
      
      const houseData = {
              userId: decodedToken.id, 
              countHouse: this.selectedWohnsitze,
              sizeHouse: this.sizeHouse,
              heat: this.scalaHeat,
              airHeat: this.heatingType,
              addheat: this.additionalHeatingType,
              temperatur: this.selectedTemperature,
              waterHeat: this.waterHeatingType,
              countMember: this.selectedPerson,
              powerConsumption: this.powerConsumption,
              powerSelect: this.electricitySource,
              photovoltaik: this.hasPhotovoltaics,
               };

               const currentYear = new Date().getFullYear();
               houseData.year = currentYear;

               const co2Consumption = this.calculateCO2Consumption();
               const ghaByHeating = this.calculateGha().toFixed(1);
               const electricityValues = this.calculateCO2andGhaFromElectricity();
               const co2EmissionFromElectricity = electricityValues.co2Emission.toFixed(1);
               const ghaByElectricity = electricityValues.gha.toFixed(1);

  // Speichert die berechneten Werte und andere Informationen
                 houseData.co2_emissionHeat = co2Consumption;
               houseData.gha_heating = ghaByHeating;
               houseData.co2_emission_electricity = co2EmissionFromElectricity;
               houseData.gha_electricity = ghaByElectricity;
 

  
               axios.post('http://localhost:3000/saveHouseData', houseData)
                 .then(function (response) {
                   console.log(response);
      

      
                vm.calculateHeatingConsumption();
                vm.calculateWaterConsumption();
                vm.calculateEnergyClass();
                vm.chartData = [
                  parseFloat(vm.scalaHeat) || 0,
                  parseFloat(vm.sizeHouse) || 0,
                  parseFloat(vm.powerConsumption) || 0,
                   ];
              vm.chart.destroy();
              vm.createChart();

      console.log('Daten erfolgreich aktualisiert oder hinzugefügt!');
    })
    .catch(function (error) {
      console.error('Fehler beim Speichern der Daten:', error);
      // Fehlerbehandlung, falls etwas schiefgeht
    });

               
                
               


               this.$emit('showHouseData', houseData);
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



.container-house {
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


.box-house {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; 
  justify-content: space-between;
  background: #fafafa;
  padding: 20px;
  width: 70%;
  height: auto;
  border-radius: 10px;
  margin: 80px auto;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}

.left-side,
.right-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-basis: calc(50% - 10px); 
  margin-right: 10px; 
}


.left-side label,
.left-side input,
.left-side select,
.left-side p 
.left-side option {
  margin-bottom: 10px;
  margin-left: 10px; 
}


.right-side label,
.right-side input,
.right-side select,
.right-side p 

.right-side option {
  margin-bottom: 10px;
  margin-left: 10px;
}

.left-element {
  margin: 10px;
}

.left-side .left-element {
  margin-left: 10px;
}


.left-side .option-style {
  margin-left: 10px;
}

.right-side .left-element {
  margin-left: 10px;
}


.right-side .option-style {
  margin-left: 10px;
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
  margin-top: 60spx;
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

.box-house h4 {
    position: absolute;
    color: black;
    top: 150px;
    left: 1250px;
}

.box-house h4:hover {
    color: rgb(39, 28, 28);
    cursor: pointer;
}

.box-house label {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: -2px;
}

    input {
  width: 300px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid #2ea44f; 
  margin-bottom: 10px;
  margin: 10px;
  text-align: center;
  font-size: 16px;
}



.option-style {
    justify-content: center;
    text-align: center;
      width: 200px;
      height: 20px;
      border: none;
      font-size: 14px;
      color: #2ea44f;
      background-color: #eee;
      border-radius: 5px;
      border: 1px solid black;
      }


      input[type="checkbox"] {
  position: relative;
  width: 40px;
  height: 15px;
  -webkit-appearance: none;
  appearance: none;
  background: #c6c6c6;
  outline: none;
  border-radius: 20px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);
  transition: .5s;
}

input[type="checkbox"]::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  top: -2.5px;
  left: -2.5px;
  background: #fac7c3;
  transition: .5s;
}

input:checked[type="checkbox"] {
  background: #2ea44f;
}

input:checked[type="checkbox"]::before {
  top: -2.5px;
  left: 20px;
  background-color: #fac7c3;
  transition: .5s;
}


.table-container {
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
  background-color: #22bc1a;
  color: white; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 10px 20px; 
  font-size: 16px;
  transition: background-color 0.3s; 
}


.back-button:hover {
  background-color: #7d861c;
}




</style>