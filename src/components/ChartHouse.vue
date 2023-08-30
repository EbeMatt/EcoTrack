<template>
  <div class="container-chart">
    <canvas ref="myChartCanvas" width="400" height="200"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'ChartHouse',
  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  methods: {
    createChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = this.$refs.myChartCanvas.getContext('2d');

      const stromverbrauch = parseInt(this.chartData[0]);
      const heizung = parseInt(this.chartData[1]);
      const temperatur = parseInt(this.chartData[2]);

      const chartData = [stromverbrauch, heizung, temperatur];

      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Stromverbrauch', 'Heizung', 'Temperatur'],
          datasets: [{
            label: 'Energieverbrauch',
            data: chartData,
            backgroundColor: [
              'rgba(255, 0, 0, 0.6)',
              'rgba(0, 0, 255, 0.6)',
              'rgba(255, 206, 0, 0.6)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              labels: {
                color: 'black'
              }
            }
          }
        }
      });
    },
  },
  watch: {
    chartData: {
      handler() {
        this.$nextTick(() => {
          this.createChart();
        });
      },
      immediate: true,
    },
  },
};
</script>

<style>

</style>