// Import the required libraries
import Papa from 'papaparse';
import Prophet from 'prophet-js';
import Chart from 'chart.js';

// Load the CSV file using PapaParse
Papa.parse('webdev5.csv', {
  header: true,
  download: true,
  complete: function(results) {
    // Extract the relevant data from the CSV file
    const data = results.data.map(d => ({
      x: new Date(d.Date),  // Assuming date is a column in the CSV file
      y: parseInt(d.Layoffs)  // Assuming layoffs is a column in the CSV file
    }));

    // Generate the forecast using Prophet
    const prophet = new Prophet();
    prophet.fit(data);
    const future = prophet.make_future_dataframe({ periods: 12 });
    const forecast = prophet.predict(future);

    // Plot the data and forecast using Chart.js
    const ctx = document.getElementById('layoff-chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Actual',
            data: data,
            borderColor: 'blue',
            fill: false
          },
          {
            label: 'Forecast',
            data: forecast,
            borderColor: 'red',
            fill: false
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month'
            }
          }]
        }
      }
    });
  }
});
