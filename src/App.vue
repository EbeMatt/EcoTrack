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
  background: #4b7432;
}


</style>



