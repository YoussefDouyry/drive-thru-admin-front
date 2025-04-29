import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export const totalRevenueConfig = {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Revenue',
      data: [30, 20, 40, 60, 80, 100, 120],
      backgroundColor: '#7367f0',
      borderRadius: 4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false }
      },
      x: {
        grid: { display: false }
      }
    }
  }
};

export const growthChartConfig = {
  type: 'doughnut',
  data: {
    labels: ['Growth'],
    datasets: [{
      data: [62, 38],
      backgroundColor: ['#7367f0', '#e9ecef'],
      borderWidth: 0
    }]
  },
  options: {
    cutout: '80%',
    plugins: { legend: { display: false } }
  }
};

export const orderStatsConfig = {
  type: 'pie',
  data: {
    labels: ['Electronic', 'Fashion', 'Decor', 'Sports'],
    datasets: [{
      data: [82.5, 23.8, 84.9, 9.9],
      backgroundColor: ['#7367f0', '#28c76f', '#00cfe8', '#ea5455']
    }]
  },
  options: {
    plugins: { legend: { position: 'right' } }
  }
};