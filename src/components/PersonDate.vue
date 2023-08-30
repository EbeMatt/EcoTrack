<template>
  <div class="container">
    <div class="button-group">
      <button @click="$emit('showPersonalData')">
        <span class="icon-wrapper"><i class="bx bxs-user"></i></span>
        <span class="text">Person</span>
      </button>
      <button @click="$emit('openVehicleCar')">
        <span class="icon-wrapper"><i class='bx bx-car'></i></span>
        <span class="text">Fahrzeuge</span>
      </button>
      <button @click="$emit('showHouseFlat')">
        <span class="icon-wrapper"><i class='bx bxs-building-house'></i></span>
        <span class="text">Haus</span>
      </button>
      <button @click="$emit('showGroceriesFood')">
        <span class="icon-wrapper"><i class='bx bxs-bowl-hot'></i></span>
        <span class="text">Lebensmittel</span>
      </button>
      <button @click="$emit('showPurchasesBuy')">
        <span class="icon-wrapper"><i class='bx bxs-cart-alt'></i></span>
        <span class="text">Käufe</span>
      </button>
      <button @click="$emit('showTrashWaste')">
        <span class="icon-wrapper"><i class='bx bx-trash'></i></span>
        <span class="text">Müll</span>
      </button>
      <button @click="$emit('showDashboard')">
        <span class="icon-wrapper"><i class='bx bxs-dashboard'></i></span>
        <span class="text">Dashboard</span>
      </button>
    </div>
  </div>
</template>

<script>
import 'boxicons/css/boxicons.min.css';

export default {
  name: 'NavBar',
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 15%;
  padding-top: 150px;
  background: #4b4c52;
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
}

button {
  width: 180px;
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

.icon-wrapper {
  margin-right: 5px;
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

