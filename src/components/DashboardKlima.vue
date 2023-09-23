<template>
    <div>
      <NavBar />
    </div>
  
    <div class="container">
      <div class="button-group">
        <button @click="openSection('emissionAustria')">Emission Österreichs?</button>
        <button @click="openSection('emissionCountry')">Emission Bundesländer</button>
        <button @click="openSection('tempratur')">Temperatur</button>
        <button @click="openSection('heatChange')">Heizwende</button>
        <button @click="openSection('produktEmission')">Produkt Emission</button>
        <button @click="openSection('konsumEmission')">Konsum Emission</button>
        <button @click="openSection('treibHausBudget')">Treibhausbudget</button>
        <button @click="openSection('historyEmission')">Historische Emission</button>
        <button @click="openSection('globalEmission')">Globale Emission</button>
        <button @click="openSection('newTarget')">Erneuerbare Ausbauziele</button>
        <button @click="openSection('futureTarget')">Erneuerbare Ziele</button>
      </div>
    </div>
  
    <div>
      <iframe v-if="currentSection === 'emissionAustria'" id="iframeAustria" src="https://klimadashboard.at/embed/qcz466sxdZoE3jUm" width="1200" height="400"></iframe>
      <iframe v-if="currentSection === 'emissionCountry'" id="iframeCountry" src="https://klimadashboard.at/embed/Kbvxkd64zDpFyCGx" width="1200" height="400"></iframe>
      <iframe v-if="currentSection === 'tempratur'" id="iframeTempratur" src="https://klimadashboard.at/embed/Gdiv8WPkTVsglQ6R" width=1200 height=400></iframe>
      <iframe v-if="currentSection === 'heatChange'" id="iframeHeatChange" src="https://klimadashboard.at/embed/nwPwWj0IQf1RuDW1" width=1200 height=400></iframe>
      <iframe v-if="currentSection === 'produktEmission'" id="iframeProduktEmission" src="https://klimadashboard.at/embed/A8WaMNfsJuc1Z59y" width=1200 height=400></iframe>
      <iframe v-if="currentSection === 'konsumEmission'" id="iframeKonsumEmission" src="https://klimadashboard.at/embed/KprgpDgj9uIOxXyL" width=1200 height=400></iframe>
      <iframe v-if="currentSection === 'treibHausBudget'" id="iframeTraibHausBudget" src="https://klimadashboard.at/embed/CaEsgJi4bPw10I4q" width=1200 height=400></iframe>
      <iframe v-if="currentSection === 'historyEmission'" id="iframeHistoryEmission" src="https://klimadashboard.at/embed/aMjT9WDWAtKH78xm" width=1200 height=400></iframe>
      <iframe v-if="currentSection === 'globalEmission'" id="iframeGlobalEmission" src="https://klimadashboard.at/embed/Ib4xmzNNiC3rrqJ9" width=1200 height=400></iframe>
      <iframe v-if="currentSection === 'newTarget'" id="iframeNewTarget" src="https://klimadashboard.at/embed/QHxfLMxCisGo5PV7" width=1200 height=400></iframe>
</div><iframe v-if="currentSection === 'futureTarget'" id="iframeFutureTarget" src="https://klimadashboard.at/embed/4kPKIicTl3QfvL4C" width=1200 height=400></iframe>
  </template>
  
  <script>
  import NavBar from './NavBar.vue';
  
  export default {
    name: 'DashboardKlima',
    components: {
      NavBar,
    },
    data() {
      return {
        currentSection: '',
      };
    },
    methods: {
      openSection(section) {
        if (this.currentSection === section) {
          this.currentSection = '';
        } else {
          this.currentSection = section;
        }
      },
    },
  };
  </script>

<style scoped>

iframe {
    border: none;
    overflow: hidden;
    width: 82%;
    height: 86%;
    position: absolute;
    top: 100px;
    left: 270px;
    
    
}

.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 15%;
  padding-top: 150px;
 
  border-radius: 5px;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
}

.button-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 50px;
}

button {
  width: 225px;
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
  justify-content: flex-start;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  margin: 10px;
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

</style>