function carregarUltimosRegistros() {
    const apiUrl = 'https://biblioteca-senai-5b3e9-default-rtdb.firebaseio.com/.json';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Resposta da API:', data);

            if (data !== null) {
                const registros = Object.values(data)
                    .slice(-20);

                if (registros.length > 0) {
                    exibirResultados(registros);
                } else {
                    console.error('Nenhum registro encontrado no banco de dados.');
                }
            } else {
                console.error('Resposta da API é null. Não há dados disponíveis.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}

function exibirResultados(resultados) {
    const resultadoDiv = document.getElementById('resultado');
    const noResultMessage = document.getElementById('noResultMessage');
    const quantidadeRegistros = document.getElementById('quantidadeRegistros');

    resultadoDiv.innerHTML = '';

    if (resultados.length > 0) {
        const lista = document.createElement('ul');
        resultados.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `Curso: ${item.curso}, Dia: ${item.dia}, Hora: ${item.hora}, Mês: ${item.mes}, Usuário: ${item.usuario}`;
            lista.appendChild(listItem);
        });
        resultadoDiv.appendChild(lista);
        noResultMessage.style.display = 'none';
    } else {
        noResultMessage.style.display = 'block';
    }

    // Exibir a quantidade de registros encontrados
    quantidadeRegistros.textContent = `Registros encontrados: ${resultados.length}`;
}

function pesquisarPorCampo(campo, valor) {
    const apiUrl = 'https://biblioteca-senai-5b3e9-default-rtdb.firebaseio.com/.json';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Resposta da API:', data);

            if (data !== null) {
                const registros = Object.values(data)
                    .filter(item => {
                        const campoValue = item[campo];

                        // Verifica se o campo é uma string ou converte para string
                        const campoString = (typeof campoValue === 'string') ? campoValue : campoValue.toString();

                        return campoString.toLowerCase().includes(valor.toLowerCase());
                    });

                if (registros.length > 0) {
                    exibirResultados(registros);
                } else {
                    console.error(`Nenhum registro encontrado para ${campo} = ${valor}.`);
                    exibirResultados([]);
                }
            } else {
                console.error('Resposta da API é null. Não há dados disponíveis.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
        limparCampos();
}

function pesquisarPorIntervaloDeHorasEDia(diaInicio, horaInicio, diaFim, horaFim) {
    const apiUrl = 'https://biblioteca-senai-5b3e9-default-rtdb.firebaseio.com/.json';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Resposta da API:', data);

            if (data !== null) {
                const registros = Object.values(data)
                    .filter(item => {
                        const diaItem = item.dia;
                        const horaItem = item.hora;

                        // Verifica se o dia e a hora do item estão dentro do intervalo fornecido
                        return (diaItem >= diaInicio && diaItem <= diaFim) &&
                               (horaItem >= horaInicio && horaItem <= horaFim);
                    });

                if (registros.length > 0) {
                    exibirResultados(registros);
                } else {
                    console.error(`Nenhum registro encontrado para dia entre ${diaInicio} e ${diaFim} e hora entre ${horaInicio} e ${horaFim}.`);
                    exibirResultados([]);
                }
            } else {
                console.error('Resposta da API é null. Não há dados disponíveis.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
        limparCampos();
}

function limparCampos() {
    // Limpar campos de pesquisa
    document.getElementById('cursoInput').value = '';
    document.getElementById('usuarioInput').value = '';
    document.getElementById('diaInput').value = '';
    document.getElementById('horaInicioInput').value = '';
    document.getElementById('horaFimInput').value = '';
    document.getElementById('diaHoraInicioInput').value = '';
    document.getElementById('diaHoraFimInput').value = '';
}

document.addEventListener('DOMContentLoaded', carregarUltimosRegistros);