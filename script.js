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
    const resultadoTabela = document.getElementById('resultado');
    const noResultMessage = document.getElementById('noResultMessage');
    const quantidadeRegistros = document.getElementById('quantidadeRegistros');

    // Limpar a tabela de resultados antes de adicionar novos resultados
    resultadoTabela.innerHTML = '';

    if (resultados.length > 0) {
        resultados.forEach(item => {
            const linha = document.createElement('tr');
            linha.innerHTML = `<td class="curso">${item.curso}</td><td class="dia">${item.dia}</td><td class="hora">${item.hora}</td><td class="mes">${item.mes}</td><td class="cpf">${item.usuario}</td>`;
            resultadoTabela.appendChild(linha);
        });

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
    document.getElementById('mesInput').value = ''; 
}



document.addEventListener('DOMContentLoaded', carregarUltimosRegistros);






function pesquisarPorCursoEMesSeparadamente() {
    const curso = document.getElementById('cursoMesInput').value;
    const mes = document.getElementById('mesMesInput').value;
    pesquisarPorCursoEMes('curso', curso, 'mes', mes);
}

function pesquisarPorCursoEMes(cursoCampo, cursoValor, mesCampo, mesValor) {
    const apiUrl = 'https://biblioteca-senai-5b3e9-default-rtdb.firebaseio.com/.json';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Resposta da API:', data);

            if (data !== null) {
                const registros = Object.values(data)
                    .filter(item => {
                        const cursoString = (typeof item[cursoCampo] === 'string') ? item[cursoCampo] : item[cursoCampo].toString();
                        const mesString = (typeof item[mesCampo] === 'string') ? item[mesCampo] : item[mesCampo].toString();

                        return cursoString.toLowerCase().includes(cursoValor.toLowerCase()) &&
                               mesString.toLowerCase().includes(mesValor.toLowerCase());
                    });

                if (registros.length > 0) {
                    exibirResultados(registros);
                } else {
                    console.error(`Nenhum registro encontrado para ${cursoCampo} = ${cursoValor} e ${mesCampo} = ${mesValor}.`);
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
