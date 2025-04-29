import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const ChartComponent = ({ config }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, config);
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [config]);

  return <canvas ref={chartRef} />;
};

export default ChartComponent;