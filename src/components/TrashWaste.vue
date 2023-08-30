<template>
  <div class="container-trash">
    <img class="trash-image" src="../assets/Trash.png" >
    <h1>Müll</h1>
    <div class="box-trash">
      <h4 @click="$emit('closeTrashWaste')">X</h4>
      <label for="waste">Achten Sie auf die Mülltrennung?</label>
      <input type="range" id="trash" min="0" max="50" step="25" list="trash-options" @input="scalaTrashHandler">
      <datalist id="trash-options">
        <option value="0">Garnicht</option>
        <option value="25">Durchschnitt</option>
        <option value="50">Bei mir wird alles getrennt</option>
      </datalist>
      <p class="selected-option">{{ trash }}</p>
      <label for="plastik">Umgang mit Plastik?</label>
      <select class="option-style" name="plastik" id="plastik">
        <option value="noPlastik">Ich nutze kein Plastik</option>
        <option value="rest">Alles in den Restmüll</option>
        <option value="sack">In den gelben Sack</option>
        <option value="trashFacility">Ich fahre zu einer Mülltrennanlage</option>
        <option value="buyPlastic">Ich achte schon beim Kauf auf Plastik</option>
      </select>
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
      <button class="save-button">Speichern</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TrashWaste',
  data() {
    return {
      trash: 'Bei mir wird alles getrennt',
      wasteKg: 'durchschnitt',
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
    closeTrashWaste() {
      this.$emit('closeTrashWaste');
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

.trash-image {
  position: absolute;
  top: 20%;
  width: 30%;
  height: auto;
  left: 50px;
  border: none;
  
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
  background: #4b7432;
  overflow: auto;
  padding-top: 80px; 
}


    .box-trash {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #3c3d42;
    background: linear-gradient(0deg, #f6f8e2 0%, #e0ddca 100%);
    border: 5px outset black;
    padding: 2px;
    width: 30%;
    height: auto;
    border-radius: 10px;             
}



button {
        align-items: center;
  appearance: none;
  background-color: #FCFCFD;
  border-radius: 4px;
  border-width: 0;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
  box-sizing: border-box;
  color: #36395A;
  cursor: pointer;
  display: inline-flex;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  height: 48px;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
    }

button:focus {
  box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

button:hover {
  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
  transform: translateY(-2px);
}

button:active {
  box-shadow: #D6D6E7 0 3px 7px inset;
  transform: translateY(2px);
}

h1 {
    border: 5px outset black;
}

.box-trash h4 {
    position: absolute;
    color: black;
    top: 140px;
    right: 560px;
}

.box-trash h4:hover {
    color: rgb(39, 28, 28);
    cursor: pointer;
}

.box-trash label {
        font-size: 18px;
        font-weight: bold;
        margin: 8px;
    }

    input[type=range] {
  height: 25px;
  -webkit-appearance: none;
  appearance: none;
  margin: 10px 0;
  width: 100%;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
 
  box-shadow: 1px 1px 1px #000000;
  background: #a9e2f5;
  border-radius: 5px;
  border: 1px solid #000000;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #000000;
  border: 1px solid #000000;
  height: 25px;
  width: 15px;
  border-radius: 5px;
  background: #FFFFFF;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -11px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #a9e2f5;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  
  box-shadow: 1px 1px 1px #000000;
  background: #a9e2f5;
  border-radius: 5px;
  border: 1px solid #000000;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000;
  border: 1px solid #000000;
  height: 20px;
  width: 15px;
  border-radius: 5px;
  background: #FFFFFF;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #a9e2f5;
  border: 1px solid #000000;
  border-radius: 10px;
  box-shadow: 1px 1px 1px #000000;
}
input[type=range]::-ms-fill-upper {
  background: #a9e2f5;
  border: 1px solid #000000;
  border-radius: 10px;
  box-shadow: 1px 1px 1px #000000;
}
input[type=range]::-ms-thumb {
  margin-top: 1px;
  box-shadow: 1px 1px 1px #000000;
  border: 1px solid #000000;
  height: 20px;
  width: 15px;
  border-radius: 5px;
  background: #FFFFFF;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #a9e2f5;
}
input[type=range]:focus::-ms-fill-upper {
  background: #a9e2f5;
}



.option-style {
    justify-content: center;
    text-align: center;
      width: 200px;
      height: 20px;
      border: none;
      font-size: 14px;
      color: #38b4d0;
      background-color: #eee;
      border-radius: 5px;
      box-shadow: 4px 4px #ccc;
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
  background: #38b4d0;
}

input:checked[type="checkbox"]::before {
  top: -2.5px;
  left: 20px;
  background-color: #fac7c3;
  transition: .5s;
}


</style>