<template>
  <div>
    <div class="upload-container">
      <div class="drag-drop-box" @dragover.prevent @drop="handleFileDrop">
        <p>Drag & drop ein Bild hierhin</p>
      </div>
      <input type="file" ref="fileInput" style="display: none" @change="handleFileUpload" accept="image/*" />
      <button @click="openFileInput">Bild hochladen</button>
    </div>

    
    
    <pre :style="{ backgroundColor: formattedText ? '#f8f8f8' : 'transparent' }">{{ formattedText }}</pre>

    <table v-if="tableData.length > 0">
      <thead>
        <tr>
          <th>Unternehmen</th>
          <th>Belegnummer</th>
          <th>Belegausstellung</th>
          <th>Artikel</th>
          <th>Betrag</th>
          <th>Kategorie</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <td>{{ item.companyName }}</td>
          <td>{{ item.receiptNumber }}</td>
          <td>{{ item.issueDate }}</td>
          <td>{{ item.itemName }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.category }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Tesseract from 'tesseract.js';

export default {
  data() {
    return {
      extractedText: '',
      tableData: []
    };
  },
  computed: {
    formattedText() {
      return this.extractedText.split('\n').join('\n');
    }
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileDrop(event) {
      event.preventDefault();
      const image = event.dataTransfer.files[0];
      if (image) {
        this.uploadImage(image);
      }
    },

    async uploadImage(image) {
      try {
        const { data: { text } } = await Tesseract.recognize(image);
        this.extractedText = text;
        console.log('Extrahierter Text:', this.extractedText);
        this.createTable();
      } catch (error) {
        console.error('Fehler beim Extrahieren des Texts:', error);
        this.extractedText = 'Fehler aufgetreten.';
      }
    },
    async handleFileUpload(event) {
      const image = event.target.files[0];
      if (image) {
        try {
          const { data: { text } } = await Tesseract.recognize(image);
          this.extractedText = text;
          console.log('Extrahierter Text: ', this.extractedText); 
          this.createTable();
        } catch (error) {
          console.error('Fehler beim Extrahieren des Texts:', error);
          this.extractedText = 'Fehler aufgetreten.';
        }
      }
    },
    createTable() {
      const lines = this.extractedText.split('\n');

      const receiptData = {
        companyName: '',
        receiptNumber: '',
        issueDate: '',
        items: []
      };

      let currentItem = {};

      // Neue Objekte zum Speichern von Informationen für den Lebensmittelanteil
      let isFoodSection = false;
      let foodSectionLines = '';
      

      for (const line of lines) {
        if (line.includes('liefernden oder leistenden Unternehmens')) {
          receiptData.companyName = line.split(': ')[1];
        } else if (line.includes('fortlaufende Nummer')) {
          receiptData.receiptNumber = line.split(': ')[1];
        } else if (line.includes('Tag der Belegausstellung')) {
          receiptData.issueDate = line.split(': ')[1];
        } else if (line.includes('Handelsübliche Bezeichnung der gelieferten Gegenstände')) {
          currentItem.name = line.split(': ')[1];
        } else if (line.includes('Betrag der Barzahlung')) {
          currentItem.amount = line.split(': ')[1];
          receiptData.items.push(currentItem);
          currentItem = {};
        } else if (line.toLowerCase().includes('Gesamtbetrag')) { 
          // Wenn die Zeile "Gesamtbetrag" heißt, bedeutet dies, dass der Lebensmittelbereich endet
          if (isFoodSection) {
            isFoodSection = false;
            const foodItems = this.parseFoodSection(foodSectionLines);
            receiptData.items.push(...foodItems);
            foodSectionLines = '';
          }
        } else if (line.toLowerCase().includes('Lebensmittel')) { 
          // Wenn die Zeile "Lebensmittel" enthält, bedeutet dies, dass der Lebensmittelbereich beginnt
          isFoodSection = true;
        }

        // Erweitert den Lebensmittelabschnitt mit zusätzlichen Zeilen
        if (isFoodSection) {
          foodSectionLines += line + '\n';
        }
      }

      // Fügt die Kategorie "Lebensmittel" zu den entsprechenden Elementen hinzu
      for (const item of receiptData.items) {
        if (item.category !== 'Lebensmittel') {
          const isFoodItem = this.isFoodItem(item);
          if (isFoodItem) {
            item.category = 'Lebensmittel';
          }
        }
      }

      this.tableData = receiptData.items.map(item => ({
        companyName: receiptData.companyName,
        receiptNumber: receiptData.receiptNumber,
        issueDate: receiptData.issueDate,
        itemName: item.name,
        amount: item.amount,
        category: item.category || ''
      }));

    },
    parseFoodSection(foodSectionLines) {
      // Eine Methode, die die Lebensmittelsektion in einzelne Artikel aufteilt und zurückgibt
      const foodItems = [];

      const sections = foodSectionLines.split(/(?<=\d,\d\d€)\n/);
      for (const section of sections) {
        const lines = section.split('\n').filter(Boolean);
        const lastIndex = lines.length - 1;

        const item = {
          name: lines[0],
          category: 'Lebensmittel',
          amount: lines[lastIndex].match(/\d,\d\d€/)[0]
        };

        // Prüft, ob der Artikel ein tatsächliches Lebensmittel ist
        if (this.isFoodItem(item)) {
          foodItems.push(item);
        }
      }

      return foodItems;
    },
    isFoodItem(item) {
      // Eine Methode, die überprüft, ob ein Element ein Lebensmittelartikel ist oder nicht
      const foods = [
        'MILCHSCHOKOLADE', 'NUSSSCHOKOLADE', 'ZARTBITTERSCHOKOLADE', 'VOLLMI.-SCHOKOLADE',
        'WEINGUMMI', 'GELEE', 'SAUERES', 'KAU', 'LAKRITZ',
        'MILCH', 'JOGHURT', 'KEFIR', 'QUARK', 'SAHNE', 'FRISCHKÄSE', 'BUTTER', 'KAES', 'KÄSE', 'EI',
        'FLEISCH', 'GEFLÜGEL', 'WURST', 'LAMM', 'RIND', 'SCHINKEN', 'SPECK', 'WURSTWARE', 'SALAMI', 'MORTADELLA',
        'FISCH', 'SEAFOOD', 'GARNELEN', 'TUNFISCH', 'LACHS', 'HERRING', 'HEILBUTT', 'KABELJAU', 'GEMEINSCHAFTSK',
        'GEMUeSE', 'GEMÜSE', 'OBST', 'FRUCHT', 'APFEL', 'BANANE', 'ORANGE', 'ZITRONE', 'KIRSCHEN', 'ERDBEEREN',
        'BROT', 'BACKWAREN', 'PASTA', 'NUDELN', 'DELIKATESSEN',
        'MUesli', 'MÜSLI', 'TEE', 'KAFFEE', 'OEL', 'ÖL', 'LEBKUCHEN', 'KNABBER', 'SOß', 'SOßE', 'BONBON',
        'KAUGUMMI', 'CHIPS', 'NUGAT', 'SPIZ', 'SPIEß', 'EIERLIK', 'EIERNOL', 'EIERNOG', 'EIERPUN', 'EIERWAC',
        'JAGERSO', 'FRANCHI', 'MAJONES', 'MAYONAI', 'GUARKER', 'JEERAIS', 'HONIG', 'SEN', 'SAU', 'GIN',
        'ONKEN', 'TONYS', 'ALMDUDL'
      ];

      const name = item.name.toUpperCase();
      let found = false;

      for (const food of foods) {
        if (name.includes(food)) {
          found = true;
          break;
        }
      }

      return found;
    }
  }
};
</script>

<style scoped>
  .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  
}

.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  margin: 20px;
  padding: 50px;
}

  button {
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 10px;
    margin-top: 30px;
  }

  input[type="file"] {
    display: none;
  }

  .pre-container {
    text-align: left;
    margin: 20px 0;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
  }

  th,
  td {
    border: 1px solid black;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  .drag-drop-box {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
  }

  .drag-drop-box:hover {
    background-color: #f8f8f8;
  }

</style>