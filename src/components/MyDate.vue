<template>
  <div>
    <NavBar />

    <div>
      <PersonDate @showPersonalData="showPersonalData" @showGroceriesFood="showGroceriesFood" @openVehicleCar="openVehicleCar"
        @showHouseFlat="openHouseFlat" @showTrashWaste="openTrashWaste" @showPurchasesBuy="openPurchasesBuy" @showDashboard="showDashboard" />
      
      <MyPersonalData v-if="showData" @closePersonalData="closePersonalData" />
    </div>
    <div>
      <PurchasesBuy v-if="showPurchasesBuy" @closePurchasesBuy="closePurchasesBuy" />
      <TrashWaste v-if="showTrashWaste" @closeTrashWaste="closeTrashWaste" />
      <HouseFlat v-if="showHouseFlat" @closeHouseFlat="closeHouseFlat" />
      <VehicleCar v-if="showVehicleCar" @closeVehicleCar="closeVehicleCar" />
      <GroceriesFood v-if="showGroceries" @closeGroceriesFood="closeGroceriesFood" />
      <DashboardResult v-if="showDashboardResult" @closeDashboardResult="closeDashboard" />
    </div>
  </div>
</template>

<script>
import PersonDate from './PersonDate.vue';
import MyPersonalData from './MyPersonalData.vue';
import NavBar from './NavBar.vue';

import GroceriesFood from './GroceriesFood.vue';
import VehicleCar from './VehicleCar.vue';
import HouseFlat from './HouseFlat.vue';
import TrashWaste from './TrashWaste.vue';
import PurchasesBuy from './PurchasesBuy.vue';
import DashboardResult from './DashboardResult.vue';

export default {
  name: 'MyDate',
  components: {
    PersonDate,
    MyPersonalData,
    NavBar,
    GroceriesFood,
    VehicleCar,
    HouseFlat,
    TrashWaste,
    PurchasesBuy,
    DashboardResult,
  },
  data() {
    return {
      showData: false,
      showGroceries: false,
      showVehicleCar: false,
      showHouseFlat: false,
      showTrashWaste: false,
      showPurchasesBuy: false,
      showDashboardResult: false,
    };
  },
  methods: {
    showPersonalData() {
      this.showData = true;
    },
    closePersonalData() {
      this.showData = false;
    },
    showGroceriesFood() { 
      this.showGroceries = true;
    },
    closeGroceriesFood() {
      this.showGroceries = false;
    },
    openVehicleCar() {
      this.showVehicleCar = true;
    },
    closeVehicleCar() {
      this.showVehicleCar = false;
    },
    openHouseFlat() {
      this.showHouseFlat = true;
    },
    closeHouseFlat() {
      this.showHouseFlat = false;
    },
    openTrashWaste() {
      this.showTrashWaste = true;
    },
    closeTrashWaste() {
      this.showTrashWaste = false;
    },
    openPurchasesBuy() {
      this.showPurchasesBuy = true;
    },
    closePurchasesBuy() {
      this.showPurchasesBuy = false;
    },
    showDashboard() {
      this.showDashboardResult = true;
    },
    closeDashboard() {
      this.showDashboardResult = false;
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
</style>