<template>
  <div class="dashboard">
    <NavBar />
    <div class="cards-container">
      <div class="card">
        <div class="card-header">
          <h2>Fahrzeuge</h2>
          <i class="fas fa-car"></i>
        </div>
        <div class="card-body">
          <!-- Platz für zukünftige Chart -->
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Käufe</h2>
          <i class="fas fa-shopping-cart"></i>
        </div>
        <div class="card-body">
          <!-- Platz für zukünftige Chart -->
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Haus</h2>
          <i class="fas fa-home"></i>
        </div>
        <div class="card-body">
          <!-- Platz für zukünftige Chart -->
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Lebensmittel</h2>
          <i class="fas fa-utensils"></i>
        </div>
        <div class="card-body">
          <!-- Platz für zukünftige Chart -->
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Müll</h2>
          <i class="fas fa-trash"></i>
        </div>
        <div class="card-body">
          <!-- Platz für zukünftige Chart -->
        </div>
      </div>
    </div>

    <div class="charts-container">
      <div class="chart">
        <!-- Platz für erste Chart -->
      </div>
      <div class="chart">
        <!-- Platz für zweite Chart -->
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";

export default {
  name: "DashboardResult",
  components: {
    NavBar,
  },
  data() {
    return {
      vehicles: 10,
      purchases: 25,
      houses: 5,
      groceries: 50,
      waste: 3,
    };
  },
};
</script>

<style scoped>


.dashboard {
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

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 100px;
  
}

.card {
  width: 250px;
  margin: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.card-header {
  background-color: #cd801b;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.card-header h2 {
  font-size: 24px;
}

.card-header i {
  font-size: 36px;
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn {
  background-color: #4b7432;
  color: #fff;
  border: none;
  border-radius: 25px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.btn:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.charts-container {
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding: 20px;
  
}

.chart {
  width: 40%;
  height: 300px;
  background-color: #fff; /* Hintergrundfarbe der Charts anpassen */
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 0 50px
}

@media (max-width: 768px) {
  .cards-container {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 80%;
  }
}
</style>