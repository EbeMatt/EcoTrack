<template>
    <div>
      <div class="calculate">
        <!-- Eingabefelder für Strecke und Spritpreis -->
        <div class="input-group">
          <label for="distanceToWork">Strecke in km zur Arbeit:</label>
          <input type="text" id="distanceToWork" v-model="distanceToWork" placeholder="Strecke zur Arbeit" autocomplete="off">
        </div>
        <div class="input-group">
          <label for="fuelCost">Spritpreis:</label>
          <input type="text" id="fuelCost" v-model="fuelCost" placeholder="Aktueller Spritpreis" autocomplete="off">
        </div>
      </div>
      <div class="container">
        <!-- Buttons für jede Anzahl von Fahrten pro Woche -->
        <div v-for="days in [1, 2, 3, 4, 5, 6, 7]" :key="days">
          <p>{{ days }} x pro Woche</p>
          <button @click="calculateSavings(days)">Berechnen</button>
        </div>
      </div>
      <div class="result">
        <div>
          <p>Ihr Ergebnis:</p>
          <!-- Anzeigen der berechneten Werte -->
          <p>CO2-Einsparung: {{ co2Savings }} kg</p>
          <p>Geldersparnis: {{ moneySavings }} EUR</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['consumption', 'selectedFuel'],
    name: 'BerechnungProFahrt',
    data() {
    return {
      distanceToWork: null,
      fuelCost: null,
      co2Constants: {
        // Hier deine CO2-Konstanten für verschiedene Kraftstoffarten einfügen
        benzin: 2.37,
        diesel: 2.65,
        // ...
      },
      co2Savings: null,
      moneySavings: null,
    };
    },
    methods: {
        calculateSavings(days) {
      if (!this.distanceToWork || !this.fuelCost || !this.consumption) {
        return;
      }

      const distance = parseFloat(this.distanceToWork) * 2;
      const co2PerKm = (this.consumption / 100) * this.co2Constants[this.selectedFuel];
      const co2Savings = co2PerKm * distance * days;

      // Annahme: Einsparung von 0.1 EUR pro gefahrenem Kilometer
      const moneySavings = distance * 0.1 * days;

      // Aktualisiere die Daten in der Komponente
      this.co2Savings = co2Savings.toFixed(2);
      this.moneySavings = moneySavings.toFixed(2);
    },

    // ... (weitere Methoden) ...
  },
};
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  
  
}

body {
  margin: 0;
  padding: 0;
  
  width: 100%;
 
  
}

.calculate{
    display: flex;
    justify-content: center;
    padding: 40px;
}
.container{
    display: flex;
    background-color: #f6f8e2;
    padding: 20px;
    margin-bottom: 20px;
}

.container div {
    align-items: center;
    width: 100%;
    margin: 20px;
    border: 2px solid black;
    height: auto;
    text-align: center;
    padding: 15px;
}

.result {
    display: flex;
    background-color: #f6f8e2;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
    }

    .input-group {
        margin: 20px;
    }


    button {
  width: 100px;
  height: 30px;
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
  margin-top: 50px;
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

label {
        font-size: 18px;
        font-weight: bold;
        margin: 4px;
    }

    input {
  width: 250px;
  height: 25px;
  border-radius: 5px;
  border: 2px solid #2ea44f; /* Aktualisierte Border-Farbe */
  margin-bottom: 10px;
  margin: 10px;
  text-align: center;
  font-size: 20px;
}

.container div:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
}

</style>