let retorno = []
    function consultarAPI() {
        // Obter o valor do input date
        var dataInput = document.getElementById("dataInput").value;
        
            // Separar o ano, mês e dia
            var [hora, mes, dia] = dataInput.split("-");

            // Construir a URL da API com os parâmetros da consulta
            var apiUrl = `https://biblioteca-senai-5b3e9-default-rtdb.firebaseio.com/.json?`;

            // Realizar a requisição à API
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    retorno = data
                    return retorno
                })
                .catch(error => {
                    console.error("Erro na requisição:", error);
                });
                console.log(retorno)
        }



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
      