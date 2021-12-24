const chartProperties = {
    width:1500,
    height:600,
    timeScale:{
      timeVisible:true,
      secondsVisible:false,
    }
  }
const domElement = document.getElementById('chart');
const chart = LightweightCharts.createChart(domElement,chartProperties);
const candleSeries = chart.addCandlestickSeries();



