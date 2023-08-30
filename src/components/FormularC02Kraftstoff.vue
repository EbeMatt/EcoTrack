<template>
   <div class="image-container">
        <div class="image-wrapper">
          <img src="../assets/C02EmissionsFaktorKraftstoff.png" alt="C02EmissionsFaktorKraftstoff">
        </div>
        <div class="formularPosition">
          <img src="../assets/BerechnungsFormelKraftstoff.png" alt="BerechnungsFormelKraftstoff">
        </div>
      </div>
  </template>
  
  <script>
  export default {
    name: 'FormularC02Kraftstoff',
  };
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