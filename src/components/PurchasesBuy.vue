<template>

  <div class="container-purchases">

    <div class="box-purchases">
      
      <label for="buyOnline">Kaufen Sie viel Online?</label>
      <select class="option-style" name="buyOnline" id="buyOnline" v-model="buyOnline">
        <option value="yes">Ja</option>
        <option value="no">Nein</option>
      </select>
      <div v-if="buyOnline === 'yes'">
        <label for="distance">Entfernung zum Paketzentrum (km):</label>
        <input type="number" id="distance" min="0" v-model="distance" @input="calculateCO2Emissions">
        <label for="weight">Gewicht des Pakets (g):</label>
        <input type="number" id="weight" min="0" v-model="weight" @input="calculateCO2Emissions">
        <label for="origin">Herkunft des Pakets:</label>
        <select class="option-style" name="origin" id="origin" v-model="origin" @change="calculateCO2Emissions">
          <option value="china">China</option>
          <option value="usa">USA</option>
          <!-- Weitere Länder hinzufügen -->
        </select>
        <label for="destination">Ziel des Pakets:</label>
        <select class="option-style" name="destination" id="destination" v-model="destination" @change="calculateCO2Emissions">
          <option value="germany">Deutschland</option>
          <option value="austria">Österreich</option>
          <!-- Weitere Länder hinzufügen -->
        </select>
        <label for="estimatedDistance">Geschätze zurückgelegte Entfernung des Paketes:</label>
        <input type="number" name="estimatedDistance" id="estimatedDistance" min="0" v-model="estimatedDistance" @input="calculateCO2Emissions">
        <label for="transportMethod">Transportmethode:</label>
        <select class="option-style" name="transportMethod" id="transportMethod" v-model="transportMethod" @change="calculateCO2Emissions">
          <option value="ship">Schiff</option>
          <option value="plane">Flugzeug</option>
          <option value="car">Auto</option>
        </select>
        <label for="countPaket">Wieviel pakete bestellen Sie pro Monat ca?</label>
        <input type="number" id="countPaket" min="0" name="countPaket" v-model="countPaket" @input="calculateCO2Emissions">
      </div>
      <div v-else>
        <label for="customerDistance">Entfernung zum Geschäft (km):</label>
        <input type="number" id="customerDistance" v-model="customerDistance" @input="calculateCO2Emissions">
        <label for="distance">Entfernung zum Paketzentrum (km):</label>
        <input type="number" id="distance" min="0" v-model="distance" @input="calculateCO2Emissions">
      </div>
      <p class="selected-option">{{ co2Emissions }}</p><br>
      <button class="save-button">Speichern</button>

    </div>
    <button class="back-button" @click="closePurchasesBuy">Zurück zu Meine Daten</button>

  </div>
</template>

<script>

export default {
  name: 'PurchasesBuy',
  data() {
    return {
      buyOnline: 'yes',
      distance: 5,
      weight: 1000, 
      origin: 'china',
      destination: 'germany',
      transportMethod: 'ship', 
      carDistance: 0,
      customerDistance: 5,
      co2Emissions: '',
      packaging: 50,
      countPaket: '',
      estimatedDistance: '',
    };
  },
  
  methods: {
    calculateCO2Emissions() {
      console.log('calculateCO2Emissions called');
  let totalEmissions = 0;
  let deliveryEmissions = 0;

  if (this.buyOnline === 'yes') {
    // Berechnung der CO2-Emissionen für Online-Einkäufe
    

    if (this.transportMethod === 'ship') {
      deliveryEmissions = this.distance * 0.0151;
    } else if (this.transportMethod === 'plane') {
      deliveryEmissions = this.distance * 0.1;
    } else if (this.transportMethod === 'car') {
      deliveryEmissions = this.carDistance * 0.12;
    }

    const packagingEmissions = this.packaging;
    const weightEmissions = this.weight * 0.0025;

    totalEmissions = (deliveryEmissions + packagingEmissions + weightEmissions);

  } else {
    // Berechnung der CO2-Emissionen für Einkäufe im Geschäft
    const customerEmissions = this.customerDistance * 400;

    totalEmissions = customerEmissions + 4400; // Feste Emissionen für Geschäftseinkäufe
  }

  // berechnung für estimatedDistance

  const estimatedDistance = parseFloat(this.estimatedDistance);
  console.log('estimatedDistance:', estimatedDistance);

  if(estimatedDistance >= 0) {
    totalEmissions += estimatedDistance * deliveryEmissions; // ändern auf die Art des Transport
  }

  const countPaket = parseFloat(this.countPaket);
  console.log('countPaket:', countPaket);
  
  if (countPaket >= 0) {
  totalEmissions *= countPaket; // Multipliziere die Emissionen mit countPaket
}
  console.log('totalEmissions:', totalEmissions);

  this.co2Emissions = `${totalEmissions.toFixed(2)} - ${(totalEmissions + 1000).toFixed(2)} Gramm CO2-Äquivalente`;
},
closePurchasesBuy() {
      this.$emit('closePurchasesBuy');
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

.container-purchases {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; 
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  z-index: 9999;
  background-image: url('../assets/Background13.png');
  overflow: auto;
  padding-top: 50px; 
}


    .box-purchases {
      display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #3c3d42;
    background: linear-gradient(0deg, #f6f8e2 0%, #e0ddca 100%);
    padding: 10px;
    width: 30%;
    height: auto;
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

.box-purchases label {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px; 
  display: block; 
  text-align: center; 
}

input {
  display: flex;
  justify-content: center;
  align-items: center;
}

select {
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-purchases input,
.box-purchases select {
  width: 100%;
  max-width: 300px;
  height: 25px;
  border-radius: 5px;
  border: 2px solid #2ea44f;
  margin: 10px auto;
  text-align: center;
  font-size: 16px;
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