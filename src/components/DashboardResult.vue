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
          <canvas id="vehicle-chart"></canvas>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Käufe</h2>
          <i class="fas fa-shopping-cart"></i>
        </div>
        <div class="card-body">
          <canvas id="purchases-chart"></canvas>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Haus</h2>
          <i class="fas fa-home"></i>
        </div>
        <div class="card-body">
          <canvas id="house-chart"></canvas>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Lebensmittel</h2>
          <i class="fas fa-utensils"></i>
        </div>
        <div class="card-body">
          <canvas id="groceries-chart"></canvas>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Müll</h2>
          <i class="fas fa-trash"></i>
        </div>
        <div class="card-body">
          <canvas id="waste-chart"></canvas>
        </div>
      </div>
    </div>

    <div class="charts-container">
      <div class="chart">
        <canvas id="chart1"></canvas>
      </div>
      <div class="chart">
        <canvas id="chart2"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import NavBar from "./NavBar.vue";

export default {
  name: "DashboardResult",
  components: {
    NavBar
  },
  mounted() {
    this.createVehicleChart();
    this.createPurchasesChart();
    this.createHouseChart();
    this.createGroceriesChart();
    this.createWasteChart();
  },
  methods: {
    createVehicleChart() {
      const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Anzahl Fahrzeuge',
            data: [7, 4, 10, 8, 11, 9, 12, 10],
            backgroundColor: '#ff6384'
          }
        ]
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              stepSize: 1 
            }
          }]
        }
      };
      this.createChart('vehicle-chart', chartData, options);
    },
    createPurchasesChart() {
      const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Käufe in Euro',
            data: [200, 350, 400, 450, 600, 500, 550, 700],
            backgroundColor: '#36a2eb'
          }
        ]
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              stepSize: 100 
            }
          }]
        }
      };
      this.createChart('purchases-chart', chartData, options);
    },
    createHouseChart() {
      const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Anzahl der Zimmer',
            data: [3, 3, 4, 4, 4, 5, 5, 5],
            backgroundColor: '#ffcd56'
          }
        ]
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              stepSize: 1 
            }
          }]
        }
      };
      this.createChart('house-chart', chartData, options);
    },
    createGroceriesChart() {
      const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Lebensmittel in Euro',
            data: [150, 200, 250, 300, 350, 400, 450, 500],
            backgroundColor: '#ff9f40'
          }
        ]
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              stepSize: 50 
            }
          }]
        }
      };
      this.createChart('groceries-chart', chartData, options);
    },
    createWasteChart() {
      const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            label: 'Menge an Müll in Liter',
            data: [20, 18, 23, 25, 22, 19, 20, 21],
            backgroundColor: '#4bc0c0'
          }
        ]
      };
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              stepSize: 2 
            }
          }]
        }
      };
      this.createChart('waste-chart', chartData, options);
    },
    createChart(chartId, chartData, chartOptions) {
      const ctx = document.getElementById(chartId).getContext('2d');
      return new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
      });
    }
  }
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