<template>
    <div>
      <div class="image-container">
        <div class="image-wrapper">
          <img src="../assets/C02Heizwerte.png" alt="C02heizwerte">
        </div>
        <div class="formularPosition">
          <img src="../assets/BerechnungsformelHeizwerte.png" alt="BerechnungsformelHeizwerte">
        </div>
      </div>
      <div class="image-container">
        <div class="image-wrapper">
          <img src="../assets/C02Stromwerte.png" alt="C02Stromwerte">
        </div>
        <div class="formularPosition">
          <img src="../assets/BerechnungsformelStrom.png" alt="BerechnungsformelStrom">
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FormularC02',
  }
  </script>
  
  <style scoped>
  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 150px;
    margin-left: 50px;
  }
  
  .image-wrapper {
    margin-right: 10px;
  }
  
  img {
    width: 80%;
    height: auto;
  }
  
  .formularPosition {
    margin-left: 10px;
  }
  </style>