<template>
  
  <div class="container-trash">
    <div>
      <NavBar />
    </div>
    <div class="box-trash">
      <label for="waste">Achten Sie auf die Mülltrennung?</label>
      <input type="range" id="trash" min="0" max="50" step="25" list="trash-options" @input="scalaTrashHandler">
      <datalist id="trash-options">
        <option value="0">Garnicht</option>
        <option value="25">Durchschnitt</option>
        <option value="50">Bei mir wird alles getrennt</option>
      </datalist>
      <p class="selected-option">{{ trash }}</p> <br>
      <label for="plastik">Umgang mit Plastik?</label>
      <select class="option-style" name="plastik" id="plastik">
        <option value="noPlastik">Ich nutze kein Plastik</option>
        <option value="rest">Alles in den Restmüll</option>
        <option value="sack">In den gelben Sack</option>
        <option value="trashFacility">Ich fahre zu einer Mülltrennanlage</option>
        <option value="buyPlastic">Ich achte schon beim Kauf auf Plastik</option>
      </select>
      <label for="plasticUsage">Wie viel kg Plastik verbrauchen Sie pro Monat?</label>
      <input type="number" id="plasticUsage" v-model="plasticUsageAmount" min="0">
      <label for="paperType">Welches Papier verwenden Sie?</label>
      <select class="option-style" name="paperType" id="paperType" v-model="selectedPaper">
        <option value="freshFiberPaper">Frischfaser-Papier</option>
        <option value="recycledPaper">Recyceltes Papier</option>
        <option value="normalPaper">Normales Papier</option>
      </select>
      <label for="paperUsage">Wie viel kg Papier verbrauchen Sie pro Monat?</label>
      <input type="number" id="paperUsage" v-model="paperUsageAmount" min="0">
      <label for="usageType">Schätzen Sie Ihren Verbrauch:</label>
      <select class="option-style" name="usageType" id="usageType" v-model="usageEstimate">
        <option value="average">Durchschnitt (4,2 Kilo pro Woche)</option>
        <option value="unknown">Ich weiß es nicht, eher durchschnittlich</option>
        <option value="low">Sehr gering (weniger als 1,5 Kilo pro Woche)</option>
        <option value="medium">Mäßig (1,5-3 Kilo pro Woche)</option>
        <option value="high">Hoch (mehr als 3 Kilo pro Woche)</option>
      </select>
      <p class="selected-option">CO2-Auswirkungen: {{ calculateCO2Impact }} g/Blatt</p> <br>
      <label for="wasteKg">Restmüll pro Woche?</label>
      <input type="range" id="wasteKg" min="0" max="100" step="25" list="wasteKg-options" @input="scalaWasteHandler">
      <datalist id="wasteKg-options">
        <option value="0">sehr wenig</option>
        <option value="25">wenig</option>
        <option value="50">durchschnitt</option>
        <option value="75">viel</option>
        <option value="100">sehr viel</option>
      </datalist>
      <p class="selected-option">{{ wasteKg }}</p><br>
      <button class="save-button" @click="saveDataTrash">Speichern</button>
    </div>

    <button class="back-button" @click="$emit('closeTrashWaste')">Zurück zu Meine Daten</button>

    <!-- Tabelle zur Anzeige der gespeicherten Daten -->
    <table v-if="dataSaved"  class="data-table">
      <thead>
        <tr>
          <th>Papierart</th>
          <th>Verbrauch pro Monat</th>
          <th>Verbrauch pro Jahr</th>
          <th>Verbrauchsschätzung</th>
          <th>CO2-Auswirkungen pro Blatt</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ selectedPaper }}</td>
          <td>{{ paperUsageAmount }} Kilo pro Monat</td>
          <td>{{ usageAmountYear }} Kilo pro Jahr</td>
          <td>{{ usageEstimate }}</td>
          <td>{{ calculateCO2Impact.toFixed(2) }} g/Blatt</td>
        </tr>
      </tbody>
    </table>

    <table v-if="dataSaved"  class="data-table">
  <thead>
    <tr>
      <th>Verbrauch pro Monat</th>
      <th>Verbrauch pro Jahr</th>
      <th>CO2-Auswirkungen pro kg</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{{ plasticUsageAmount }} Kilo pro Monat</td>
      <td>{{ calculatePlasticUsageAmountYear }} Kilo pro Jahr</td> 
      <td>{{ calculatePlasticCO2Impact.toFixed(2) }} g/kg</td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>

import NavBar from './NavBar.vue';
import { parseToken } from './tokenUtils';
import axios from 'axios';


export default {
  name: 'TrashWaste',
  components: {
     NavBar,
  },
  data() {
    return {
      trash: 'Bei mir wird alles getrennt',
      wasteKg: 'durchschnitt',
      selectedPaper: 'freshFiber', // Default to Frischfaser-Papier
      paperUsageAmount: null,
      usageEstimate: 'average',
      plasticUsageAmount: null, // Default to Durchschnitt
      plasticCO2: 0,
      dataSaved: false, // Flag to track if data has been saved
    };
  },
  methods: {
    scalaTrashHandler(event) {
      const value = event.target.value;
      switch (value) {
        case '0':
          this.trash = 'Garnicht';
          break;
        case '25':
          this.trash = 'Durchschnitt';
          break;
        case '50':
          this.trash = 'Bei mir wird alles getrennt';
          break;
      }
    },
    scalaWasteHandler(event) {
      const value = event.target.value;
      switch (value) {
        case '0':
          this.wasteKg = 'sehr wenig (<1,5kg/Woche)';
          break;
        case '25':
          this.wasteKg = 'wenig (1,5-3kg/Woche)';
          break;
        case '50':
          this.wasteKg = 'durchschnitt (ca. 3,2kg/Woche)';
          break;
        case '75':
          this.wasteKg = 'viel (3,5-4,5kg/Woche)';
          break;
        case '100':
          this.wasteKg = 'sehr viel (>4,5kg/Woche)';
          break;
      }
    },
    async saveDataTrash() {
      if (this.dataSaved) {
        // Check if data has already been saved and confirm overwriting
        const confirmResult = window.confirm('Sie haben bereits Werte eingegeben. Möchten Sie diese wirklich ersetzen?');
        if (!confirmResult) {
          // If the user cancels, exit the function without further action
          return;
        }
      }

      // Data validation: Check if paper and plastic usage are valid numbers
      if (!this.isNumeric(this.paperUsageAmount) || this.paperUsageAmount < 0 || !this.isNumeric(this.plasticUsageAmount) || this.plasticUsageAmount < 0) {
        alert('Bitte geben Sie gültige Werte für den Papier- und Plastikverbrauch ein.');
        return;
      }

      const token = localStorage.getItem('token');
      const decodedToken = parseToken(token);

      try {
        // Berechne die Werte hier, nachdem die Validierung bestanden wurde
        const co2ImpactPerSheet = this.calculateCO2Impact;
        const paperUsagePerYear = this.usageAmountYear;
        const plasticUsagePerYear = this.calculatePlasticUsageAmountYear;
        const co2ImpactPerKg = this.calculatePlasticCO2Impact;


        const trashData = {
                  userId: decodedToken.id,
                  paper_Type: this.selectedPaper,  // Statt 'selectedPaper'
                  paper_Usage: this.paperUsageAmount,  // Statt 'paperUsageAmount'
                  usage_Type: this.usageEstimate,  // Statt 'usageEstimate'
                  paper_usage_per_month: this.paperUsageAmount,  // Statt 'paperUsageAmount'
                  paper_usage_per_year: paperUsagePerYear,
                  co2_impact_per_sheet: co2ImpactPerSheet,
                  plastic_Usage: this.plasticUsageAmount,  // Statt 'plasticUsageAmount'
                  plastic_usage_per_month: this.plasticUsageAmount,  // Statt 'plasticUsageAmount'
                  plastic_usage_per_year: plasticUsagePerYear,
                  co2_impact_per_kg: co2ImpactPerKg,
                };

        // Send the data to the server
        const response = await axios.post('http://localhost:3000/saveTrashData', trashData);
        console.log(response.data);

        // Set the dataSaved flag to true to display the table
        this.dataSaved = true;
      } catch (error) {
        console.error('Fehler beim Speichern der Daten:', error);
        // Handle errors here
        alert('Fehler beim Speichern der Daten. Bitte versuchen Sie es später erneut.');
      }
    },

    isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    },
    closeTrashWaste() {
      this.$emit('closeTrashWaste');
    },
  },

  computed: {
    calculateCO2Impact() {
      let co2PerSheet = 0; // CO2-Auswirkungen pro Blatt
      if (this.selectedPaper === 'freshFiberPaper') {
        co2PerSheet = 1200 / 16; // 1,200 g CO2 für Frischfaser-Papier, geteilt durch 16 Seiten
      } else if (this.selectedPaper === 'recycledPaper') {
        co2PerSheet = 700 / 16; // 700 g CO2 für recyceltes Papier, geteilt durch 16 Seiten
      } else if (this.selectedPaper === 'normalPaper') {
        co2PerSheet = 1000 / 16; // 1,000 g CO2 für normales Papier, geteilt durch 16 Seiten
      }
      return co2PerSheet * this.paperUsageAmount; // Verwende paperUsageAmount hier
    },

    usageAmountYear() {
      // Annahme: Ein Jahr hat 12 Monate
      return this.paperUsageAmount * 12;
    },

    calculatePlasticCO2Impact() {
      // CO2-Berechnung für Plastik
      const plasticCO2PerKg = 5 * 1000; // 5 Tonnen CO2 pro Tonne Plastik, umgerechnet in g
      const plasticCO2 = (this.plasticUsageAmount * plasticCO2PerKg) / 12; // Monatlicher Verbrauch umgerechnet
      return plasticCO2; // Ergebnis pro Monat
    },

    calculatePlasticUsageAmountYear() {
      // Annahme: Ein Jahr hat 12 Monate
      return this.plasticUsageAmount * 12;
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


.container-trash {
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
  padding-top: 150px; 
}


    .box-trash {
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



.box-trash label {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: -5px;
    }

    .box-trash input, .box-trash select {
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

.box-trash input[type="range"] {
  appearance: none; /* Entfernt die Standard-Styling */
  background-color: #2ea44f; /* Setzt die gewünschte Hintergrundfarbe (Grün) */
  height: 5px; /* Passe die Höhe des Balkens an */
  border-radius: 3px; /* Runde die Ecken des Balkens ab */
}

/* Ändere die Farbe des Daumens (Punkt) */
.box-trash input[type="range"]::-webkit-slider-thumb {
  appearance: none; /* Entfernt die Standard-Styling */
  width: 15px; /* Breite des Daumens */
  height: 15px; /* Höhe des Daumens */
  background-color: #2ea44f; /* Setzt die gewünschte Daumenfarbe (Grün) */
  border-radius: 50%; /* Macht den Daumen rund */
  position: relative; /* Position relativ zum Balken */
  transform: translateY(-10px); /* Positioniere den Daumen innerhalb des Balkens */
}



.data-table {
  margin-top: 40px;
  margin-bottom: 50px;
}

.data-table {
  border: 2px solid black
}


.data-table tr th  {
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


</style>