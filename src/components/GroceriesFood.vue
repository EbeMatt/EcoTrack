<template>
  <div class="container-groceries">
    <div>
      <NavBar />
    </div>
    
    <div class="box-groceries">
      <h3 class="section-title">Obst und Gemüse</h3>
      <div class="groceries-list">
        <div class="groceries-header">
          <h3 class="table-header">Lebensmittel</h3>
          <h3 class="table-header">[kg CO2-Äq. / kg Lebensmittel]</h3>
        </div>
        <div v-for="(item, index) in groceriesData" :key="index" class="groceries-item">
          <label class="checkbox-label">
            <input type="checkbox" :value="item.name" v-model="selectedItems" class="checkbox-input">
            <div class="product-info">
              <div class="product-name">{{ item.name }}</div>
              <div class="co2-info">
                <p class="co2-value">{{ item.co2.toFixed(1) }}</p>
              </div>
            </div>
          </label>
        </div>
      </div>
      <button class="calculate-button" @click="calculateCO2">CO2 berechnen</button>
      <p v-if="totalCO2 > 0" class="total-co2">Gesamt-CO2-Fußabdruck: {{ totalCO2 }} kg CO2-Äquivalent</p>
    </div>

    <div class="box-groceries">
      <h3 class="section-title">Milchprodukte</h3>
      <div class="groceries-list">
        <div class="groceries-header">
          <h3 class="table-header">Lebensmittel</h3>
          <h3 class="table-header">[kg CO2-Äq. / kg Lebensmittel]</h3>
        </div>
        <div v-for="(item, index) in dairyData" :key="index" class="groceries-item">
          <label class="checkbox-label">
            <input type="checkbox" :value="item.name" v-model="selectedItemsDairy" class="checkbox-input">
            <div class="product-info">
              <div class="product-name">{{ item.name }}</div>
              <div class="co2-info">
                <p class="co2-value">{{ item.co2.toFixed(1) }}</p>
              </div>
            </div>
          </label>
        </div>
      </div>
      <button class="calculate-button" @click="calculateCO2Dairy">CO2 berechnen</button>
      <p v-if="totalCO2Dairy > 0" class="total-co2">Gesamt-CO2-Fußabdruck: {{ totalCO2Dairy }} kg CO2-Äquivalent</p>
    </div>

    <div class="box-groceries">
      <h3 class="section-title">Stärke-, öl- oder zuckerhaltige Produkte</h3>
      <div class="groceries-list">
        <div class="groceries-header">
          <h3 class="table-header">Lebensmittel</h3>
          <h3 class="table-header">[kg CO2-Äq. / kg Lebensmittel]</h3>
        </div>
        <div v-for="(item, index) in starchyData" :key="index" class="groceries-item">
          <label class="checkbox-label">
            <input type="checkbox" :value="item.name" v-model="selectedItemsStarchy" class="checkbox-input">
            <div class="product-info">
              <div class="product-name">{{ item.name }}</div>
              <div class="co2-info">
                <p class="co2-value">{{ item.co2.toFixed(1) }}</p>
              </div>
            </div>
          </label>
        </div>
      </div>
      <button class="calculate-button" @click="calculateCO2Starchy">CO2 berechnen</button>
      <p v-if="totalCO2Starchy > 0" class="total-co2">Gesamt-CO2-Fußabdruck: {{ totalCO2Starchy }} kg CO2-Äquivalent</p>
    </div>

    <div class="box-groceries">
      <h3 class="section-title">Fleisch</h3>
      <div class="groceries-list">
        <div class="groceries-header">
          <h3 class="table-header">Lebensmittel</h3>
          <h3 class="table-header">[kg CO2-Äq. / kg Lebensmittel]</h3>
        </div>
        <div v-for="(item, index) in meatData" :key="index" class="groceries-item">
          <label class="checkbox-label">
            <input type="checkbox" :value="item.name" v-model="selectedItemsMeat" class="checkbox-input">
            <div class="product-info">
              <div class="product-name">{{ item.name }}</div>
              <div class="co2-info">
                <p class="co2-value">{{ item.co2.toFixed(1) }}</p>
              </div>
            </div>
          </label>
        </div>
      </div>
      <button class="calculate-button" @click="calculateCO2Meat">CO2 berechnen</button>
      <p v-if="totalCO2Meat > 0" class="total-co2">Gesamt-CO2-Fußabdruck: {{ totalCO2Meat }} kg CO2-Äquivalent</p>
    </div>

    <div class="box-groceries">
      <h3 class="section-title">Getränke</h3>
      <div class="groceries-list">
        <div class="groceries-header">
          <h3 class="table-header">Lebensmittel</h3>
          <h3 class="table-header">[kg CO2-Äq. / kg Lebensmittel]</h3>
        </div>
        <div v-for="(item, index) in drinksData" :key="index" class="groceries-item">
          <label class="checkbox-label">
            <input type="checkbox" :value="item.name" v-model="selectedItemsDrinks" class="checkbox-input">
            <div class="product-info">
              <div class="product-name">{{ item.name }}</div>
              <div class="co2-info">
                <p class="co2-value">{{ item.co2.toFixed(1) }}</p>
              </div>
            </div>
          </label>
        </div>
      </div>
      <button class="calculate-button" @click="calculateCO2Drinks">CO2 berechnen</button>
      <p v-if="totalCO2Drinks > 0" class="total-co2">Gesamt-CO2-Fußabdruck: {{ totalCO2Drinks }} kg CO2-Äquivalent</p>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";



export default {
  name: 'GroceriesFood',
  components: {
    NavBar,
  },
  data() {
    return {
      selectedItems: [],
      selectedItemsDairy: [],
      selectedItemsStarchy: [],
      selectedItemsMeat: [],
      selectedItemsDrinks: [],
      groceriesData: [
  { name: 'Ananas, frisch, gemäß realem Transport-Durchschnitt', co2: 0.9 },
  { name: 'Ananas, per Schiff', co2: 0.6 },
  { name: 'Ananas, per Flugzeug', co2: 15.1 },
  { name: 'Ananas, Dose', co2: 1.8 },
  { name: 'Apfel, Durchschnitt', co2: 0.3 },
  { name: 'Apfel, aus der Region im Herbst', co2: 0.3 },
  { name: 'Apfel, aus der Region im April', co2: 0.4 },
  { name: 'Apfel (Bio), Durchschnitt', co2: 0.2 },
  { name: 'Apfel, aus Neuseeland', co2: 0.8 },
  { name: 'Aubergine', co2: 0.2 },
  { name: 'Avocado, Durchschnitt', co2: 0.6 },
  { name: 'Avocado, aus Peru', co2: 0.8 },
  { name: 'Avocado (Bio), aus Peru', co2: 0.8 },
  { name: 'Banane', co2: 0.6 },
  { name: 'Birne', co2: 0.3 },
  { name: 'Blumenkohl', co2: 0.2 },
  { name: 'Bohnen, frisch', co2: 0.8 },
  { name: 'Bohnen, Dose', co2: 1.3 },
  { name: 'Brokkoli, frisch', co2: 0.3 },
  { name: 'Brokkoli, gefroren', co2: 0.7 },
  { name: 'Champignons, frisch, hell oder dunkel', co2: 1.3 },
  { name: 'Champignons, Dose', co2: 2.4 },
  { name: 'Erbsen, frisch, grün, in Schoten', co2: 0.4 },
  { name: 'Erbsen, getrocknet', co2: 2.3 },
  { name: 'Erbsen, gefroren', co2: 1.2 },
  { name: 'Erbsen, grün, Dose', co2: 1.7 },
  { name: 'Erbsen, grün, Glas', co2: 1.7 },
  { name: 'Erdbeeren, frisch, Durchschnitt', co2: 0.3 },
  { name: 'Erdbeeren, frisch, aus der Region, saisonal', co2: 0.3 },
  { name: 'Erdbeeren, frisch, aus Spanien', co2: 0.4 },
  { name: 'Erdbeeren, gefroren', co2: 0.7 },
  { name: 'Erdbeeren, frisch, „Winter-Erdbeeren“', co2: 3.4 },
  { name: 'Feldsalat', co2: 0.3 },
  { name: 'Fenchel', co2: 0.2 },
  { name: 'Grünkohl, frisch', co2: 0.3 },
  { name: 'Grünkohl, Glas', co2: 0.9 },
  { name: 'Karotten', co2: 0.1 },
  { name: 'Kartoffeln, frisch', co2: 0.2 },
  { name: 'Kartoffeln (Bio)', co2: 0.2 },
  { name: 'Kartoffelpüreepulver', co2: 0.9 },
  { name: 'Kichererbsen, Dose', co2: 1.3 },
  { name: 'Kohlrabi', co2: 0.2 },
  { name: 'Kürbis', co2: 0.2 },
  { name: 'Lauch', co2: 0.2 },
  { name: 'Leinsamen', co2: 1.4 },
  { name: 'Linsen, getrocknet', co2: 1.2 },
  { name: 'Linsen (Bio), getrocknet', co2: 1.7 },
  { name: 'Linsen, Dose', co2: 1.7 },
  { name: 'Mais, Dose', co2: 1.2 },
  { name: 'Orange / Apfelsine', co2: 0.3 },
  { name: 'Paprika', co2: 0.6 },
  { name: 'Pfirsich, frisch', co2: 0.2 },
  { name: 'Pfirsich, Dose', co2: 1.6 },
  { name: 'Rettich', co2: 0.2 },
  { name: 'Rosenkohl, frisch', co2: 0.3 },
  { name: 'Rosenkohl, gefroren', co2: 0.6 },
  { name: 'Rote Beete, frisch', co2: 0.2 },
  { name: 'Rote Beete, Glas', co2: 1.3 },
  { name: 'Rotkohl, frisch', co2: 0.2 },
  { name: 'Rotkohl, Glas', co2: 0.7 },
  { name: 'Rucola', co2: 0.3 },
  { name: 'Salatgurke mit Plastikfolienverpackung', co2: 0.4 },
  { name: 'Salatgurke, ohne Plastikfolienverpackung', co2: 0.4 },
  { name: 'Salatgurke (Bio), mit Plastikfolienverpackung', co2: 0.4 },
  { name: 'Salatgurke (Bio), ohne Plastikfolienverpackung', co2: 0.4 },
  { name: 'Salatmischung, gewaschen', co2: 0.4 },
  { name: 'Sellerie', co2: 0.2 },
  { name: 'Spargel', co2: 0.7 },
  { name: 'Spinat, frisch', co2: 0.2 },
  { name: 'Spinat, Blattspinat, gefroren', co2: 0.6 },
  { name: 'Tomaten, frisch, Durchschnitt', co2: 0.8 },
  { name: 'Tomaten, aus Deutschland, saisonal', co2: 0.3 },
  { name: 'Tomaten, aus Südeuropa, Freiland', co2: 0.4 },
  { name: 'Tomaten (Bio), frisch', co2: 1.1 },
  { name: 'Tomaten, Kirschtomaten', co2: 0.9 },
  { name: 'Tomaten, aus Deutschland, beheiztes Gewächshaus, „Winter-Tomate“', co2: 2.9 },
  { name: 'Tomaten, passiert, Verbundkarton', co2: 1.6 },
  { name: 'Tomaten, passiert, Dose', co2: 1.8 },
  { name: 'Tomaten, passiert, Glas', co2: 1.9 },
  { name: 'Tomatenmark', co2: 4.3 },
  { name: 'Trauben, frisch, Durchschnitt', co2: 0.4 },
  { name: 'Trauben, frisch, aus Deutschland, saisonal', co2: 0.3 },
  { name: 'Trauben, frisch, aus Italien, saisonal', co2: 0.3 },
  { name: 'Weißkohl', co2: 0.1 },
  { name: 'Zucchini', co2: 0.2 },
  { name: 'Zwiebeln', co2: 0.2 }
    ],
    dairyData: [
      { name: 'Butter', co2: 9.0 },
      { name: 'Butter (Bio)', co2: 11.5 },
      { name: 'Ei', co2: 3.0 },
      { name: 'Joghurt, natur, Kunststoffbecher papierummantelt', co2: 1.7 },
      { name: 'Joghurt, Früchte, Kunststoffbecher papierummantelt', co2: 1.7 },
      { name: 'Joghurt (Bio), natur, Kunststoffbecher papierummantelt', co2: 1.9 },
      { name: 'Joghurt-Ersatz, Soja, Kunststoffbecher papierummantelt', co2: 0.6 },
      { name: 'Käse, Durchschnitt', co2: 5.7 },
      { name: 'Käse (Bio), Durchschnitt', co2: 7.2 },
      { name: 'Käse, Frischkäse', co2: 5.5 },
      { name: 'Käse (Bio), Frischkäse', co2: 6.9 },
      { name: 'Käse, Feta', co2: 7.0 },
      { name: 'Käse, Hartkäse, wie Emmentaler', co2: 6.0 },
      { name: 'Käse, Hartkäse, wie Parmesan', co2: 6.3 },
      { name: 'Käse-Ersatz, veganer Käse, auf Basis von Kokosfett', co2: 2.0 },
      { name: 'Milch, ESL, Vollmilch, Verbundkarton', co2: 1.4 },
      { name: 'Milch, ESL, fettarm, Verbundkarton', co2: 1.2 },
      { name: 'Milch, H-Milch, Vollmilch, Verbundkarton', co2: 1.3 },
      { name: 'Milch, H-Milch, fettarm, Verbundkarton', co2: 1.1 },
      { name: 'Milch (Bio), ESL, Vollmilch, Verbundkarton', co2: 1.7 },
      { name: 'Milch-Ersatz, Dinkelmilch', co2: 0.3 },
      { name: 'Milch-Ersatz, Hafermilch', co2: 0.3 },
      { name: 'Milch-Ersatz, Mandelmilch', co2: 0.3 },
      { name: 'Milch-Ersatz, Sojamilch', co2: 0.4 },
      { name: 'Quark, 40 % Fett', co2: 3.3 },
      { name: 'Quark (Bio), 40 % Fett', co2: 4.1 },
      { name: 'Quark, Magerquark, 10 % Fett', co2: 2.4 },
      { name: 'Quark-Ersatz, Soja', co2: 0.7 },
      { name: 'Sahne', co2: 4.2 },
      { name: 'Sahne (Bio)', co2: 5.3 },
      { name: 'Sahne-Ersatz, Hafersahne', co2: 0.6 },
      { name: 'Saure Sahne', co2: 3.0 }
    ],
    meatData: [
  { name: 'Bratling/Veggieburger/Patty auf Sojabasis', co2: 1.1 },
  { name: 'Bratling/Veggieburger/Patty auf Erbsenbasis', co2: 1.8 },
  { name: 'Fisch, Wildfang, Massenware, gefroren', co2: 2.4 },
  { name: 'Fisch, Wildfang, Spezialität, gefroren', co2: 10.0 },
  { name: 'Fisch, Aquakultur', co2: 5.1 },
  { name: 'Fisch, Garnelen, gefroren', co2: 12.5 },
  { name: 'Fisch, Wildfang, frisch', co2: 4.0 },
  { name: 'Gemüsenugget /-schnitzel', co2: 1.3 },
  { name: 'Hähnchen, Durchschnitt', co2: 5.5 },
  { name: 'Hähnchen, gefroren', co2: 5.7 },
  { name: 'Hähnchen, Nuggets', co2: 3.3 },
  { name: 'Hähnchen, Wurstaufschnitt', co2: 2.9 },
  { name: 'Lupinenmehl', co2: 0.4 },
  { name: 'Rindfleisch, Durchschnitt', co2: 13.6 },
  { name: 'Rindfleisch (Bio)', co2: 21.7 },
  { name: 'Rinder-Hackfleisch', co2: 9.2 },
  { name: 'Rinder-Hackfleisch (Bio)', co2: 15.1 },
  { name: 'Rinder-Patty/-Bratling, tiefgekühlt', co2: 9.0 },
  { name: 'Schweinefleisch, Durchschnitt', co2: 4.6 },
  { name: 'Schweinefleisch (Bio)', co2: 5.2 },
  { name: 'Schweinefleisch, gefroren', co2: 4.6 },
  { name: 'Seitan', co2: 2.5 },
  { name: 'Sojagranulat, Textured Vegetable Protein (TVP)', co2: 1.0 },
  { name: 'Tempeh', co2: 0.7 },
  { name: 'Tofu', co2: 1.0 },
  { name: 'Wildfleisch, Hirsch', co2: 11.5 },
  { name: 'Wurst, Bratwurst, Thüringer Rostbratwurst', co2: 2.9 },
  { name: 'Wurst-Ersatz, vegane Bratwurst', co2: 1.7 },
  { name: 'Wurstaufschnitt vom Rind, Aufschnitt', co2: 7.9 },
],
starchyData: [
  { name: "Brot, Mischbrot", co2: 0.6 },
  { name: "Brot (Bio), Mischbrot", co2: 0.6 },
  { name: "Brötchen, Weißbrot", co2: 0.7 },
  { name: "Bulgur", co2: 0.6 },
  { name: "Dinkel, Reisersatz", co2: 0.7 },
  { name: "Erdnüsse, in Schale", co2: 0.8 },
  { name: "Erdnussbutter", co2: 2.0 },
  { name: "Feinbackwaren", co2: 1.6 },
  { name: "Gnocchi", co2: 0.6 },
  { name: "Haferflocken", co2: 0.6 },
  { name: "Honig, Glas", co2: 2.0 },
  { name: "Kokosöl", co2: 2.3 },
  { name: "Margarine, halbfett", co2: 1.7 },
  { name: "Margarine, vollfett", co2: 2.8 },
  { name: "Margarine (Bio), vollfett", co2: 2.5 },
  { name: "Nudeln", co2: 0.7 },
  { name: "Nudeln (Bio)", co2: 0.8 },
  { name: "Olivenöl, Glaseinwegflasche", co2: 3.2 },
  { name: "Palmfett", co2: 2.9 },
  { name: "Pommes, tiefgekühlt", co2: 0.7 },
  { name: "Rapsöl, Glaseinwegflasche", co2: 3.3 },
  { name: "Reis", co2: 3.1 },
  { name: "Schokolade, Vollmilchschokolade, Tafel, 35 % Kakaogehalt", co2: 4.1 },
  { name: "Sonnenblumenkerne", co2: 1.5 },
  { name: "Sonnenblumenöl, Glaseinwegflasche", co2: 3.2 },
  { name: "Walnüsse, in Schale", co2: 0.9 },
  { name: "Zucker, Rübenzucker", co2: 0.7 },
  { name: "Zucker (Bio), Rübenzucker", co2: 0.5 },
  { name: "Zucker, Rohrzucker", co2: 1.0 },
  { name: "Zucker (Bio), Rohrzucker", co2: 0.9 },
],
  drinksData: [
  { name: "Bier, 0,5 L-Glasmehrwegflasche", co2: 0.9 },
  { name: "Bier, 0,5 L-Weißblechdose", co2: 1.0 },
  { name: "Kaffee, Pulver", co2: 5.6 },
  { name: "Kakao, Pulver", co2: 5.0 },
  { name: "Limonade, Orangenlimonade, 0,75 LEinwegplastikflasche", co2: 0.4 },
  { name: "Mineralwasser, 0,7 L-Glasmehrwegflasche", co2: 0.2 },
  { name: "Saft, Orangensaft, 1,0 L-Verbundkarton", co2: 0.7 },
  { name: "Saft, Apfelsaft, 1,0 L-Glasmehrwegflasche", co2: 0.4 },
  { name: "Saft, Apfelsaft, 1,0 L-Verbundkarton", co2: 0.4 },
  { name: "Wasser, Leitungswasser", co2: 0.0 },
  { name: "Wein, 0,75 L-Glaseinwegflasche", co2: 1.0 },
  ],
  
totalCO2: 0,
      totalCO2Dairy: 0,
      totalCO2Starchy: 0,
      totalCO2Meat: 0,
      totalCO2Drinks: 0,
    };
    
  },
  methods: {
    closeGroceriesFood() {
      this.$emit('closeGroceriesFood');
    },
    calculateCO2() {
      this.totalCO2 = this.selectedItems.reduce((total, itemName) => {
        const selectedItem = this.groceriesData.find(data => data.name === itemName);
        return total + selectedItem.co2;
      }, 0);
    },
    calculateCO2Dairy() {
      this.totalCO2Dairy = this.selectedItemsDairy.reduce((total, itemName) => {
        const selectedItem = this.dairyData.find(data => data.name === itemName);
        return total + selectedItem.co2;
      }, 0);
    },
    calculateCO2Meat() {
      this.totalCO2Meat = this.selectedItemsMeat.reduce((total, itemName) => {
        const selectedItem = this.meatData.find(data => data.name === itemName);
        return total + selectedItem.co2;
      }, 0);
    },
    calculateCO2Starchy() {
      this.totalCO2Starchy = this.selectedItemsStarchy.reduce((total, itemName) => {
        const selectedItem = this.starchyData.find(data => data.name === itemName);
       return total + selectedItem.co2;
      }, 0);
    },
    calculateCO2Drinks() {
  this.totalCO2Drinks = this.selectedItemsDrinks.reduce((total, itemName) => {
    const selectedItem = this.drinksData.find(data => data.name === itemName);
    return total + selectedItem.co2;
  }, 0);
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

.section-title {
  text-decoration: underline;
  margin-bottom: 15px; /* Füge hier den gewünschten Abstand hinzu */
}



.groceries-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-weight: bold;
}

.table-header {
  flex: 2;
  text-align: center;
}
.container-groceries {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column; /* Änderung auf row für nebeneinander Anordnung */
  justify-content: flex-start;
  align-items: flex-start; /* Änderung auf flex-start für obere Ausrichtung */
  z-index: 9999;
  background: #4b7432;
  padding-top: 50px;
  overflow-y: auto;
  
}



    .box-groceries {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #3c3d42;
  background: linear-gradient(0deg, #f6f8e2 0%, #e0ddca 100%);
  padding: 10px;
  width: 45%;
  height: auto;
  border-radius: 10px;
  margin: 60px auto;
}


.box-groceries h4 {
    position: absolute;
    color: black;
    top: 120px;
    right: 560px;
}

.box-groceries h4:hover {
    color: rgb(39, 28, 28);
    cursor: pointer;
}





.product-name {
  font-size: 12px;
  margin-right: 150px;
}

.co2-info {
  text-align: right;
  margin-right: 150px;
}

.co2-label {
  font-size: 14px;
  color: #777;
}

.co2-value {
  font-size: 12px;
  margin-top: 2px;
}

.checkbox-label input[type="checkbox"]:checked + .product-info {
  background-color: #4CAF50; /* hier kannst du die gewünschte Farbe einstellen */
} 

.product-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #FFF; /* setzt den Hintergrund der Produkt-Info wieder auf weiß */
  padding: 5px;
  border-radius: 5px;
  transition: background-color 0.3s ease-in-out; /* fügt eine flüssige Animation hinzu */
} 

.checkbox-label {
  display: flex;
  align-items: center;
  margin-bottom: 5px; /* erhöht den Abstand zwischen den Checkbox-Einträgen */
}

.checkbox-input {
  margin-right: 5px; /* verringert den Abstand zwischen Checkbox und Produkt-Info */
  appearance: none; /* entfernt das Standard-Checkbox-Design */
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #4CAF50; /* setzt eine Umrandung */
  background-color: #FFF; /* setzt den Hintergrund der Checkbox auf weiß */
  outline: none; /* entfernt die blaue Umrandung bei Aktivierung */
  transition: border-color 0.3s ease-in-out, background-color 0.3s ease-in-out; /* fügt eine flüssige Animation hinzu */
} 

.checkbox-input:hover {
  cursor: pointer; /* lässt die Hand-Cursor-Symbole erscheinen, wenn man mit der Maus darauf zeigt */
} 

.checkbox-input:focus {
  border-color: #3e8e41; /* ändert die Umrandungsfarbe, wenn der Fokus auf die Checkbox geht */
} 

.checkbox-input:checked {
  background-color: #4CAF50; /* setzt den Hintergrund der Checkbox auf grün */
}




</style>