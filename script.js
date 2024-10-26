// Arrays iniciais, carregados do LocalStorage se disponíveis
let maquinas = JSON.parse(localStorage.getItem('maquinas')) || [];
let contas = JSON.parse(localStorage.getItem('contas')) || [];
let recebimentos = JSON.parse(localStorage.getItem('recebimentos')) || [];
let contratos = JSON.parse(localStorage.getItem('contratos')) || [];
let empresas = JSON.parse(localStorage.getItem('empresas')) || [];

// Função para exibir a aba correspondente do menu
function showSection(section) {
    // Esconde todas as seções
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
    });
    
    // Exibe a seção correta
    const currentSection = document.getElementById(section);
    currentSection.style.display = 'block';
    
    // Exibe os botões de "Confirmar", "Listar" e "Voltar" para cada aba de cadastro
    const buttonsSection = document.querySelector(`#${section} .buttons`);
    if (buttonsSection) {
        buttonsSection.style.display = 'block';
    }
}
// Função para salvar dados no LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('maquinas', JSON.stringify(maquinas));
    localStorage.setItem('contas', JSON.stringify(contas));
    localStorage.setItem('recebimentos', JSON.stringify(recebimentos));
    localStorage.setItem('contratos', JSON.stringify(contratos));
    localStorage.setItem('empresas', JSON.stringify(empresas));
}

// Função para retornar ao menu principal
function goBack(section) {
    document.getElementById(section).style.display = 'none';
}

// Função para exibir a lista com base no tipo
function showList(type) {
    let data, listId;
    switch (type) {
        case 'maquinas':
            data = maquinas;
            listId = '#maquinasList tbody';
            break;
        case 'contas':
            data = contas;
            listId = '#contasList tbody';
            break;
        case 'recebimentos':
            data = recebimentos;
            listId = '#recebimentosList tbody';
            break;
        case 'contratos':
            data = contratos;
            listId = '#contratosList tbody';
            break;
        case 'empresas':
            data = empresas;
            listId = '#empresasList tbody';
            break;
    }
    
    const listElement = document.querySelector(listId);
    listElement.innerHTML = ''; // Limpar tabela

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        // Adiciona as células com os dados
        for (const key in item) {
            const cell = document.createElement('td');
            cell.textContent = item[key];
            row.appendChild(cell);
        }
        // Adiciona botões de edição e exclusão
        const actionsCell = document.createElement('td');
        actionsCell.innerHTML = `
            <button onclick="${type === 'maquinas' ? 'editMaquina' : type === 'contas' ? 'editConta' : type === 'recebimentos' ? 'editRecebimento' : type === 'contratos' ? 'editContrato' : 'editEmpresa'}(${index})">Editar</button>
            <button onclick="${type === 'maquinas' ? 'deleteMaquina' : type === 'contas' ? 'deleteConta' : type === 'recebimentos' ? 'deleteRecebimento' : type === 'contratos' ? 'deleteContrato' : 'deleteEmpresa'}(${index})">Excluir</button>
        `;
        row.appendChild(actionsCell);
        listElement.appendChild(row);
    });

    document.querySelector(`#${type}List`).style.display = 'block';
}

// Funções de adicionar novos registros para cada categoria
document.getElementById('formMaquina').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('nomeMaquina').value;
    const serie = document.getElementById('serieMaquina').value;
    const anosUso = document.getElementById('anosUso').value;
    const horasTrabalhadas = document.getElementById('horasTrabalhadas').value;

    maquinas.push({ nome, serie, anosUso, horasTrabalhadas });
    saveToLocalStorage(); // Salvar no LocalStorage
    document.getElementById('formMaquina').reset();
    showList('maquinas');
});

document.getElementById('formConta').addEventListener('submit', function(e) {
    e.preventDefault();
    const tipo = document.getElementById('tipoConta').value;
    const dataVencimento = document.getElementById('dataVencimentoConta').value;
    const valor = document.getElementById('valorConta').value;

    contas.push({ tipo, dataVencimento, valor });
    saveToLocalStorage(); // Salvar no LocalStorage
    document.getElementById('formConta').reset();
    showList('contas');
});

document.getElementById('formRecebimento').addEventListener('submit', function(e) {
    e.preventDefault();
    const empresa = document.getElementById('empresaRecebimento').value;
    const valor = document.getElementById('valorRecebimento').value;
    const dataPagamento = document.getElementById('dataPagamento').value;
    const dataTermino = document.getElementById('dataTermino').value;
    const status = document.getElementById('statusRecebimento').value;

    recebimentos.push({ empresa, valor, dataPagamento, dataTermino, status });
    saveToLocalStorage(); // Salvar no LocalStorage
    document.getElementById('formRecebimento').reset();
    showList('recebimentos');
});

document.getElementById('formContrato').addEventListener('submit', function(event) {
    event.preventDefault();
    const empresa = document.getElementById('empresaContrato').value;
    const locatario = document.getElementById('locatarioContrato').value;
    const cnpj = document.getElementById('cnpjContrato').value;
    const representante = document.getElementById('representanteContrato').value;
    const periodo = document.getElementById('periodoContrato').value;
    const valor = document.getElementById('valorContrato').value;
    const dataTermino = document.getElementById('dataTerminoContrato').value;
    const equipamento = document.getElementById('equipamentoContrato').value;

    contratos.push({ empresa, locatario, cnpj, representante, periodo, valor, dataTermino, equipamento });
    saveToLocalStorage(); // Salvar no LocalStorage
    document.getElementById('formContrato').reset();
    showList('contratos');
});

document.getElementById('formEmpresa').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nomeEmpresa').value;
    const areaCnpj = document.getElementById('areaCnpj').value;
    const areaAtuacao = document.getElementById('areaAtuacao').value;
    const representante = document.getElementById('representanteEmpresa').value;
    const telefone = document.getElementById('telefoneEmpresa').value;
    const email = document.getElementById('emailEmpresa').value;

    empresas.push({ nome, areaCnpj, areaAtuacao, representante, telefone, email });
    saveToLocalStorage(); // Salvar no LocalStorage
    document.getElementById('formEmpresa').reset();
    showList('empresas');
});

// Funções para editar registros
function editMaquina(index) {
    const maquina = maquinas[index];
    document.getElementById('nomeMaquina').value = maquina.nome;
    document.getElementById('serieMaquina').value = maquina.serie;
    document.getElementById('anosUso').value = maquina.anosUso;
    document.getElementById('horasTrabalhadas').value = maquina.horasTrabalhadas;

    // Atualiza a lógica de edição, se necessário
    // Remover a máquina do array para não duplicar
    maquinas.splice(index, 1);
    saveToLocalStorage();
    showList('maquinas');
}

function editConta(index) {
    const conta = contas[index];
    document.getElementById('tipoConta').value = conta.tipo;
    document.getElementById('dataVencimentoConta').value = conta.dataVencimento;
    document.getElementById('valorConta').value = conta.valor;

    // Atualiza a lógica de edição, se necessário
    contas.splice(index, 1);
    saveToLocalStorage();
    showList('contas');
}

function editRecebimento(index) {
    const recebimento = recebimentos[index];
    document.getElementById('empresaRecebimento').value = recebimento.empresa;
    document.getElementById('valorRecebimento').value = recebimento.valor;
    document.getElementById('dataPagamento').value = recebimento.dataPagamento;
    document.getElementById('dataTermino').value = recebimento.dataTermino;
    document.getElementById('statusRecebimento').value = recebimento.status;

    recebimentos.splice(index, 1);
    saveToLocalStorage();
    showList('recebimentos');
}

function editContrato(index) {
    const contrato = contratos[index];
    document.getElementById('empresaContrato').value = contrato.empresa;
    document.getElementById('locatarioContrato').value = contrato.locatario;
    document.getElementById('cnpjContrato').value = contrato.cnpj;
    document.getElementById('representanteContrato').value = contrato.representante;
    document.getElementById('periodoContrato').value = contrato.periodo;
    document.getElementById('valorContrato').value = contrato.valor;
    document.getElementById('dataTerminoContrato').value = contrato.dataTermino;
    document.getElementById('equipamentoContrato').value = contrato.equipamento;

    contratos.splice(index, 1);
    saveToLocalStorage();
    showList('contratos');
}

function editEmpresa(index) {
    const empresa = empresas[index];
    document.getElementById('nomeEmpresa').value = empresa.nome;
    document.getElementById('areaCnpj').value = empresa.areaCnpj;
    document.getElementById('areaAtuacao').value = empresa.areaAtuacao;
    document.getElementById('representanteEmpresa').value = empresa.representante;
    document.getElementById('telefoneEmpresa').value = empresa.telefone;
    document.getElementById('emailEmpresa').value = empresa.email;

    empresas.splice(index, 1);
    saveToLocalStorage();
    showList('empresas');
}

// Funções para deletar registros
function deleteMaquina(index) {
    maquinas.splice(index, 1);
    saveToLocalStorage(); // Salvar no LocalStorage
    showList('maquinas');
}

function deleteConta(index) {
    contas.splice(index, 1);
    saveToLocalStorage(); // Salvar no LocalStorage
    showList('contas');
}

function deleteRecebimento(index) {
    recebimentos.splice(index, 1);
    saveToLocalStorage(); // Salvar no LocalStorage
    showList('recebimentos');
}

function deleteContrato(index) {
    contratos.splice(index, 1);
    saveToLocalStorage(); // Salvar no LocalStorage
    showList('contratos');
}

function deleteEmpresa(index) {
    empresas.splice(index, 1);
    saveToLocalStorage(); // Salvar no LocalStorage
    showList('empresas');
}

// --- Service Worker para Cache ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('Service Worker registrado com sucesso:', registration.scope);
        }).catch(error => {
            console.log('Falha ao registrar o Service Worker:', error);
        });
    });
}
