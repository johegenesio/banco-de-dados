const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['DS', 'Mecânico de usinagem', 'Soldagem', 'Elétrica', 'Assistente de ADM', 'Administração', 'Metalurgia', 'Mecânica', 'Outros'],
      datasets: [{
        label: 'Alunos',
        data: [12, 19, 3, 5, 2, 3, 10, 5, 5],
        backgroundColor: '#0094FF'
      }
    ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
