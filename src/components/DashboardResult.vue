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
          <h2>Erspartes C02 und Geld. Wöchentlich</h2>
          <i class="fas fa-shopping-cart"></i>
        </div>
        <div class="card-body">
          <canvas id="savingsData"></canvas>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2>Haus</h2>
          <i class="fas fa-home"></i>
        </div>
        <div class="card-body">
          <canvas id="chartHouseData"></canvas>
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
import axios from 'axios';
import { parseToken } from './tokenUtils';

export default {
  name: "DashboardResult",
  components: {
    NavBar
  },
  data() {
    return {
      vehicleCarData: [],
      savingsData: [],
      houseData: [],
      chart: null,
      chartSavings: null,
      chartHouseData: null,
    };
  },
  mounted() {
    this.fetchCarData();
    this.fetchSavingsData();
    this.fetchHouseData();
  },
  methods: {
    async fetchCarData() {
      try {
          
        const token = localStorage.getItem('token');
        const decodedToken = parseToken(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Setze den Token als Authentifizierungs-Header
      },
      params: {
        userId: decodedToken.id, // Füge den userId als Parameter hinzu
      },
    };
    


          const response = await axios.get('http://localhost:3000/saveVehicleCar', config);
          const data = response.data.data;
          console.log('Response Data:', response.data);

        

          const labels = data.map((item) => item.Brand); // Beachte den Spaltennamen 'Brand'
          const Co2Emission = data.map((item) => item.Co2Emission); // Beachte den Spaltennamen 'Co2Emission'
          const footprint = data.map((item) => item.Footprint);

        const chartData = {
          labels: labels,
          datasets: [
            {
              label: 'CO2-Emission',
              data: Co2Emission,
              backgroundColor: 'rgba(75, 192, 192, 0.7)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Ökologischer Fußabdruck',
              data: footprint,
              backgroundColor: 'rgba(255, 159, 64, 0.7)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
            },
          ],
        };

        if (this.chart) {
          this.chart.destroy();
        }

        const ctx = document.getElementById('vehicle-chart').getContext('2d');
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
                stepSize: 2,
                ticks: {
                  color: 'black',
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: 'CO2-Emission und Ökologischer Fußabdruck',
                color: 'black',
              },
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  color: 'black',
                },
              },
              datalabels: {
                display: false,
              },
            },
            doughnut: {
              borderWidth: 1,
              categoryPercentage: 0.5,
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    },

    async fetchSavingsData() {
  try {
    const token = localStorage.getItem('token');
    const decodedToken = parseToken(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        userId: decodedToken.id,
      },
    };

    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

    // Füge das Startdatum der aktuellen Woche als Parameter hinzu
    config.params.weekStartDate = startOfWeek.toISOString();

    const response = await axios.get('http://localhost:3000/saveSavingData', config);

    if (response.status === 200) {
      const data = response.data.data;
      console.log("Response Data", data);

      if (Array.isArray(data) && data.length > 0) {
        const co2_savings = data.map((item) => parseFloat(item.co2_savings));
        const money_savings = data.map((item) => parseFloat(item.money_savings));

        const chartDataSavings = {
  labels: ['Woche 1', 'Woche 2', 'Woche 3'], // Hier fügen Sie Ihre Zeitpunkte oder Labels ein
  datasets: [
    {
      label: "C02-Ersparnis",
      data: co2_savings,
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    {
      label: "Geldersparnis",
      data: money_savings,
      backgroundColor: 'rgba(255, 159, 64, 0.7)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
    },
  ],
};

        if (this.chartSavings) {
          this.chartSavings.destroy();
        }

        const ctx = document.getElementById('savingsData').getContext('2d');
        this.chartSavings = new Chart(ctx, {
          type: 'line',
          data: chartDataSavings,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                min: 0,
                stepSize: 2,
                ticks: {
                  color: 'black',
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: 'C02-Ersparnis und Geldersparnis',
                color: 'black',
              },
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  color: 'black',
                },
              },
              datalabels: {
                display: false,
              },
            },
            doughnut: {
              borderWidth: 1,
              categoryPercentage: 0.5,
            },
          },
        });
      } else {
        console.error('Keine Daten in der API-Antwort gefunden oder leeres Array.');
      }
    } else {
      console.error('Fehler bei der API-Anfrage. Statuscode:', response.status);
    }
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
},

async fetchHouseData() {
  try {
    const token = localStorage.getItem('token');
    const decodedToken = parseToken(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        userId: decodedToken.id,
      },
    };

    const currentYear = new Date().getFullYear();
    config.params.year = currentYear;

    

    const response = await axios.get('http://localhost:3000/saveHouseData', config);

    if (response.status === 200) {
      const data = response.data.data;

      if (Array.isArray(data) && data.length > 0) {
        const co2_emissionHeat = data.map((item) => parseFloat(item.co2_emissionHeat));
        const co2_emission_electricity = data.map((item) => parseFloat(item.co2_emission_electricity));

        const chartHouseData = {
  labels: ['House'],
  datasets: [
    {
      label: 'C02 Emission Heizung',
      data: co2_emissionHeat,
      backgroundColor: 'rgba(75, 192, 192, 0.7)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      yAxisID: 'y-axis-1', // Verweis auf die erste Y-Achse
    },
    {
      label: 'C02 Emission Strom',
      data: co2_emission_electricity,
      backgroundColor: 'rgba(255, 159, 64, 0.7)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
      yAxisID: 'y-axis-2', // Verweis auf die zweite Y-Achse
    },
  ],
};

if (this.chartHouseData) {
          this.chartHouseData.destroy();
        }

const ctx = document.getElementById('chartHouseData').getContext('2d');
this.chartHouseData = new Chart(ctx, {
  type: 'bar',
  data: chartHouseData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: [
        {
          id: 'y-axis-1', // ID der ersten Y-Achse
          position: 'left', // Position der ersten Y-Achse
          ticks: {
            beginAtZero: true,
            min: 0,
            stepSize: 500, // Passen Sie den Schritt nach Bedarf an
            color: 'black',
          },
          scaleLabel: {
            display: true,
            labelString: 'C02 Emission Heizung',
          },
        },
        {
          id: 'y-axis-2', // ID der zweiten Y-Achse
          position: 'right', // Position der zweiten Y-Achse
          ticks: {
            beginAtZero: true,
            min: 0,
            stepSize: 100, // Passen Sie den Schritt nach Bedarf an
            color: 'black',
          },
          scaleLabel: {
            display: true,
            labelString: 'C02 Emission Strom',
          },
        },
      ],
    },
    plugins: {
      title: {
        display: true,
        text: 'C02-Ersparnis und Geldersparnis',
        color: 'black',
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: 'black',
        },
      },
      datalabels: {
        display: false,
      },
    },
    doughnut: {
      borderWidth: 1,
      categoryPercentage: 0.5,
    },
  },
});
      } else {
        console.error('Keine Daten in der API-Antwort gefunden oder leeres Array.');
      }
    } else {
      console.error('Fehler bei der API-Anfrage. Statuscode:', response.status);
    }
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
},
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