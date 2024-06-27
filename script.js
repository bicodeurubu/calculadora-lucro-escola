const numCursosInput = document.getElementById('numCursos');
const ticketMedioInput = document.getElementById('ticketMedio');
const alunosTurmaInput = document.getElementById('alunosTurma');
const turmasAnoInput = document.getElementById('turmasAno');
const comissaoProfessorInput = document.getElementById('comissaoProfessor');
const resultadosTable = document.getElementById('resultados').getElementsByTagName('tbody')[0];
const calcularButton = document.getElementById('calcular');

calcularButton.addEventListener('click', calcularLucro);

function calcularLucro() {
  const numCursos = parseInt(numCursosInput.value);
  const ticketMedio = parseFloat(ticketMedioInput.value);
  const alunosTurma = parseInt(alunosTurmaInput.value);
  const turmasAno = parseInt(turmasAnoInput.value);
  const comissaoProfessor = parseFloat(comissaoProfessorInput.value) / 100;

  resultadosTable.innerHTML = ''; // Limpa resultados anteriores

  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  let lucroAnual = 0;

  meses.forEach(mes => {
    const fatorSazonalidade = (mes === "Nov" || mes === "Dez" || mes === "Jan" || mes === "Fev") ? 0.7 : 1; 

    const receitaBruta = alunosTurma * ticketMedio * turmasAno * fatorSazonalidade;
    const taxaPagamento = receitaBruta * 0.04;
    const comissaoProf = (receitaBruta - taxaPagamento) * comissaoProfessor;
    const comissaoEsc = (receitaBruta - taxaPagamento) * (1 - comissaoProfessor);
    const custoFixo = calcularCustoFixo(numCursos);
    const lucroLiquido = comissaoEsc - custoFixo;

    lucroAnual += lucroLiquido;

    const row = resultadosTable.insertRow();
    row.insertCell().textContent = mes;
    row.insertCell().textContent = receitaBruta.toFixed(2);
    row.insertCell().textContent = taxaPagamento.toFixed(2);
    row.insertCell().textContent = comissaoProf.toFixed(2);
    row.insertCell().textContent = comissaoEsc.toFixed(2);
    row.insertCell().textContent = custoFixo.toFixed(2);
    row.insertCell().textContent = lucroLiquido.toFixed(2);
  });

  // Adiciona linha de total anual
  const totalRow = resultadosTable.insertRow();
  totalRow.insertCell().textContent = "Total Anual";
  totalRow.insertCell().textContent = ""; 
  totalRow.insertCell().textContent = ""; 
  totalRow.insertCell().textContent = ""; 
  totalRow.insertCell().textContent = ""; 
  totalRow.insertCell().textContent = (calcularCustoFixo(numCursos) * 12).toFixed(2); 
  totalRow.insertCell().textContent = lucroAnual.toFixed(2);
}

function calcularCustoFixo(numCursos) {
  let custoFixo = 5000;
  if (numCursos > 30) {
    custoFixo += Math.ceil((numCursos - 30) / 50) * 1500; 
  }
  return custoFixo;
}
