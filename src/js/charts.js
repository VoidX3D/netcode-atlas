// Chart.js configuration and data visualization
class ChartManager {
  constructor() {
    this.charts = new Map();
    this.defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: '#f0f6fc',
            font: {
              family: 'Inter, sans-serif'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(13, 17, 23, 0.9)',
          titleColor: '#00d4ff',
          bodyColor: '#f0f6fc',
          borderColor: 'rgba(0, 212, 255, 0.3)',
          borderWidth: 1,
          padding: 10,
          boxPadding: 5
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(240, 246, 252, 0.1)'
          },
          ticks: {
            color: '#f0f6fc'
          }
        },
        y: {
          grid: {
            color: 'rgba(240, 246, 252, 0.1)'
          },
          ticks: {
            color: '#f0f6fc'
          }
        }
      }
    };
  }
  
  // Load data from JSON/CSV files
  async loadData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      if (url.endsWith('.csv')) {
        return this.parseCSV(await response.text());
      } else {
        return await response.json();
      }
    } catch (error) {
      console.error('Error loading data:', error);
      showToast('Failed to load chart data', 'error');
      return null;
    }
  }
  
  parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(header => header.trim());
    
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(value => value.trim());
      const entry = {};
      
      headers.forEach((header, index) => {
        let value = values[index];
        // Try to convert to number if possible
        if (!isNaN(value) && value !== '') {
          value = Number(value);
        }
        entry[header] = value;
      });
      
      data.push(entry);
    }
    
    return data;
  }
  
  // Create a bar chart
  createBarChart(canvasId, data, options = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    const mergedOptions = { ...this.defaultOptions, ...options };
    const chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: mergedOptions
    });
    
    this.charts.set(canvasId, chart);
    return chart;
  }
  
  // Create a line chart
  createLineChart(canvasId, data, options = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    const mergedOptions = { ...this.defaultOptions, ...options };
    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: mergedOptions
    });
    
    this.charts.set(canvasId, chart);
    return chart;
  }
  
  // Create a pie chart
  createPieChart(canvasId, data, options = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    const mergedOptions = { ...this.defaultOptions, ...options };
    const chart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: mergedOptions
    });
    
    this.charts.set(canvasId, chart);
    return chart;
  }
  
  // Create a doughnut chart
  createDoughnutChart(canvasId, data, options = {}) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    
    const mergedOptions = { ...this.defaultOptions, ...options };
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: mergedOptions
    });
    
    this.charts.set(canvasId, chart);
    return chart;
  }
  
  // Export chart as PNG
  exportChart(canvasId, filename) {
    const chart = this.charts.get(canvasId);
    if (!chart) return;
    
    const link = document.createElement('a');
    link.download = filename || `${canvasId}.png`;
    link.href = chart.toBase64Image();
    link.click();
  }
  
  // Update chart data
  updateChart(canvasId, newData) {
    const chart = this.charts.get(canvasId);
    if (!chart) return;
    
    chart.data = newData;
    chart.update();
  }
}

// Initialize chart manager
const chartManager = new ChartManager();

// DNS Latency Chart
async function renderDNSLatencyChart() {
  const data = await chartManager.loadData('/public/data/dns-latency.json');
  if (!data) return;
  
  const chartData = {
    labels: data.map(item => item.resolver),
    datasets: [{
      label: 'Average Latency (ms)',
      data: data.map(item => item.latency),
      backgroundColor: 'rgba(0, 212, 255, 0.5)',
      borderColor: 'rgba(0, 212, 255, 1)',
      borderWidth: 1
    }]
  };
  
  chartManager.createBarChart('dns-latency-chart', chartData, {
    plugins: {
      title: {
        display: true,
        text: 'DNS Resolver Latency Comparison',
        color: '#f0f6fc',
        font: {
          size: 16
        }
      }
    }
  });
}

// Protocols Adoption Chart
async function renderProtocolsAdoptionChart() {
  const data = await chartManager.loadData('/public/data/protocols-adoption.json');
  if (!data) return;
  
  const protocols = Object.keys(data[0]).filter(key => key !== 'year');
  const years = data.map(item => item.year);
  
  const datasets = protocols.map((protocol, index) => {
    const colors = [
      'rgba(0, 212, 255, 0.7)',
      'rgba(255, 77, 244, 0.7)',
      'rgba(135, 245, 66, 0.7)',
      'rgba(255, 184, 0, 0.7)',
      'rgba(122, 82, 255, 0.7)'
    ];
    
    return {
      label: protocol,
      data: data.map(item => item[protocol]),
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length].replace('0.7', '0.2'),
      tension: 0.3,
      fill: true
    };
  });
  
  const chartData = {
    labels: years,
    datasets: datasets
  };
  
  chartManager.createLineChart('protocols-adoption-chart', chartData, {
    plugins: {
      title: {
        display: true,
        text: 'Internet Protocols Adoption Over Time',
        color: '#f0f6fc',
        font: {
          size: 16
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  });
}

// HTML Tags Usage Chart
async function renderHTMLTagsChart() {
  const data = await chartManager.loadData('/public/data/html-tags.csv');
  if (!data) return;
  
  // Sort by usage percentage and take top 10
  const sortedData = data.sort((a, b) => b.usage - a.usage).slice(0, 10);
  
  const chartData = {
    labels: sortedData.map(item => item.tag),
    datasets: [{
      label: 'Usage Percentage',
      data: sortedData.map(item => item.usage),
      backgroundColor: [
        'rgba(0, 212, 255, 0.7)',
        'rgba(255, 77, 244, 0.7)',
        'rgba(135, 245, 66, 0.7)',
        'rgba(255, 184, 0, 0.7)',
        'rgba(122, 82, 255, 0.7)',
        'rgba(255, 87, 87, 0.7)',
        'rgba(45, 206, 172, 0.7)',
        'rgba(247, 37, 133, 0.7)',
        'rgba(80, 250, 123, 0.7)',
        'rgba(225, 225, 225, 0.7)'
      ],
      borderWidth: 1
    }]
  };
  
  chartManager.createBarChart('html-tags-chart', chartData, {
    indexAxis: 'y',
    plugins: {
      title: {
        display: true,
        text: 'Top 10 Most Used HTML Tags',
        color: '#f0f6fc',
        font: {
          size: 16
        }
      }
    },
    scales: {
      x: {
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  });
}

// TLD Market Share Chart
async function renderTLDShareChart() {
  const data = await chartManager.loadData('/public/data/tld-share.json');
  if (!data) return;
  
  const chartData = {
    labels: data.map(item => item.tld),
    datasets: [{
      data: data.map(item => item.share),
      backgroundColor: [
        'rgba(0, 212, 255, 0.7)',
        'rgba(255, 77, 244, 0.7)',
        'rgba(135, 245, 66, 0.7)',
        'rgba(255, 184, 0, 0.7)',
        'rgba(122, 82, 255, 0.7)',
        'rgba(255, 87, 87, 0.7)',
        'rgba(45, 206, 172, 0.7)',
        'rgba(247, 37, 133, 0.7)',
        'rgba(80, 250, 123, 0.7)',
        'rgba(225, 225, 225, 0.7)'
      ],
      borderWidth: 1,
      hoverOffset: 12
    }]
  };
  
  chartManager.createDoughnutChart('tld-share-chart', chartData, {
    plugins: {
      title: {
        display: true,
        text: 'Top-Level Domain Market Share',
        color: '#f0f6fc',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    }
  });
}

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Check which page we're on and render appropriate charts
  const path = window.location.pathname;
  
  if (path.includes('dns.html')) {
    renderDNSLatencyChart();
  } else if (path.includes('internet.html')) {
    renderProtocolsAdoptionChart();
  } else if (path.includes('html.html')) {
    renderHTMLTagsChart();
  } else if (path.includes('charts.html')) {
    // Render all charts on the charts dashboard
    renderDNSLatencyChart();
    renderProtocolsAdoptionChart();
    renderHTMLTagsChart();
    renderTLDShareChart();
    
    // Add export functionality
    const exportButtons = document.querySelectorAll('.export-btn');
    exportButtons.forEach(button => {
      button.addEventListener('click', function() {
        const chartId = this.getAttribute('data-chart');
        const filename = `netcode-atlas-${chartId}.png`;
        chartManager.exportChart(chartId, filename);
      });
    });
  }
});