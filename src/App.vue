<template>
  <div id="app">
    <router-view :showHouseData="showHouseData"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      houseData: {}
    }
  },
  methods: {
    showHouseData(houseData) {
      this.houseData = houseData;
    },
    closeHouseFlat() {
      this.houseData = {};
    }
  },
};
</script>

<style>



body {
  margin: 0;
  padding: 0;
  background-image: url('./assets/Background13.png');
  background-size: cover; /* oder die gewünschte Größe */
  background-repeat: no-repeat; /* Keine Wiederholung des Hintergrundbilds */
  background-attachment: fixed; /* Hintergrundbild bleibt bei Bildschirmscrollen an Ort und Stelle */
 
}

</style>



