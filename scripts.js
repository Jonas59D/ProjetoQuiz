const perguntas = [
  {
    pergunta: "O que significa a sigla “TI”?",
    opcoes: [
      "Tecnologia da Informação",
      "Teoria da Internet",
      "Terminal Inteligente",
      "Telecomunicações Internas",
    ],
    resposta: 0,
  },
  {
    pergunta: "Qual tag é usada para criar um parágrafo em HTML?",
    opcoes: ["<p>", "<h1>", "<div>", "<span>"],
    resposta: 0,
  },
  {
    pergunta: "O que é CSS?",
    opcoes: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Creative Style Syntax",
      "Computer Style System",
    ],
    resposta: 1,
  },
  {
    pergunta: "Qual destes dispositivos é usado para entrada de dados?",
    opcoes: ["Monitor", "Impressora", "Teclado", "Caixa de som"],
    resposta: 2,
  },
  {
    pergunta: "Qual atributo define o endereço de uma imagem em HTML?",
    opcoes: ["alt", "src", "href", "link"],
    resposta: 1,
  },
  {
    pergunta: "O que é um backup?",
    opcoes: [
      "Aumentar a velocidade do computador",
      "Um jogo de computador",
      "Cópia de segurança dos dados",
      "Um erro no sistema",
    ],
    resposta: 2,
  },
  {
    pergunta: "Qual unidade mede pixels relativos ao tamanho da fonte?",
    opcoes: ["px", "em", "%", "vh"],
    resposta: 0,
  },
  {
    pergunta: "O que o comando console.log() faz?",
    opcoes: [
      "Cria um alerta na tela",
      "Mostra uma mensagem no console",
      "Exibe texto no HTML",
      "Limpa o console",
    ],
    resposta: 1,
  },
  {
    pergunta: "Qual propriedade CSS altera a cor do texto?",
    opcoes: ["font-color", "text-color", "color", "background-color"],
    resposta: 2,
  },
  {
    pergunta: "A internet é:",
    opcoes: [
      "Um software instalado no computador",
      "Um conjunto de redes interligadas mundialmente",
      "Um tipo de antivírus",
      "Um aplicativo de mensagens",
    ],
    resposta: 1,
  },
  {
    pergunta: "Qual tag HTML cria um link?",
    opcoes: ["<a>", "<link>", "<href>", "<nav>"],
    resposta: 0,
  },
  {
    pergunta: "O que é a CPU?",
    opcoes: [
      "Um tipo de software",
      "Um cabo de energia",
      "Um disco de armazenamento",
      "O processador do computador",
    ],
    resposta: 3,
  },
  {
    pergunta: "Qual é a função do CSS?",
    opcoes: [
      "Adicionar lógica",
      "Estruturar o conteúdo",
      "Definir estilo e layout",
      "Gerenciar o banco de dados",
    ],
    resposta: 2,
  },
  {
    pergunta:
      "Qual unidade de medida representa o tamanho de arquivos digitais?",
    opcoes: ["Volt", "Watt", "Byte", "Pixel"],
    resposta: 2,
  },
  {
    pergunta: "Qual tag contém o conteúdo visível de uma página HTML?",
    opcoes: ["<head>", "<meta>", "<title>", "<body>"],
    resposta: 3,
  },
];

// Elementos do DOM
const inicio = document.getElementById("inicio");
const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");
const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const btnProximo = document.getElementById("btn-proximo");
const btnIniciar = document.getElementById("btn-iniciar");
const btnReiniciar = document.getElementById("btn-reiniciar");

let indiceAtual = 0;
let acertos = 0;
let usuario = "";

// Iniciar quiz
btnIniciar.addEventListener("click", () => {
  const nomeInput = document.getElementById("nome");
  if (nomeInput.value.trim() === "") {
    alert("Por favor, digite seu nome!");
    return;
  }
  usuario = nomeInput.value.trim();
  inicio.classList.add("hidden");
  quiz.classList.remove("hidden");
  mostrarPergunta();
});

// Mostrar pergunta
function mostrarPergunta() {
  const atual = perguntas[indiceAtual];
  perguntaEl.textContent = atual.pergunta;
  opcoesEl.innerHTML = "";
  btnProximo.classList.add("hidden");

  atual.opcoes.forEach((opc, i) => {
    const div = document.createElement("div");
    div.classList.add("opcao");
    div.textContent = opc;
    div.addEventListener("click", () => selecionarOpcao(i));
    opcoesEl.appendChild(div);
  });
}

// Selecionar opção
function selecionarOpcao(i) {
  const atual = perguntas[indiceAtual];
  const opcoes = document.querySelectorAll(".opcao");
  opcoes.forEach((opc) => (opc.style.pointerEvents = "none"));

  if (i === atual.resposta) {
    acertos++;
    opcoes[i].style.background = "rgba(76, 175, 80, 0.6)";
  } else {
    opcoes[i].style.background = "rgba(244, 67, 54, 0.6)";
    opcoes[atual.resposta].style.background = "rgba(76, 175, 80, 0.6)";
  }

  btnProximo.classList.remove("hidden");
}

// Próxima questão
btnProximo.addEventListener("click", () => {
  indiceAtual++;
  if (indiceAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
});

// Resultado final
function mostrarResultado() {
  quiz.classList.add("hidden");
  resultado.classList.remove("hidden");

  const erros = perguntas.length - acertos;
  const percentual = ((acertos / perguntas.length) * 100).toFixed(1);

  document.getElementById(
    "mensagem"
  ).textContent = `Parabéns, ${usuario}! Seu desempenho foi:`;
  document.getElementById("acertos").textContent = `Acertos: ${acertos}`;
  document.getElementById("erros").textContent = `Erros: ${erros}`;
  document.getElementById(
    "percentual"
  ).textContent = `Aproveitamento: ${percentual}%`;

  let desempenho = "";
  let classeDesempenho = "";

  if (percentual >= 80) {
    desempenho = "Excelente!";
    classeDesempenho = "excelente";
  } else if (percentual >= 50) {
    desempenho = "Bom desempenho.";
    classeDesempenho = "bom";
  } else {
    desempenho = "Precisa melhorar.";
    classeDesempenho = "ruim";
  }

  const mensagemFinal = document.createElement("p");
  mensagemFinal.textContent = desempenho;
  mensagemFinal.classList.add("mensagem-final", classeDesempenho);
  resultado.appendChild(mensagemFinal);

  // Gráfico Chart.js
  new Chart(document.getElementById("grafico"), {
    type: "pie",
    data: {
      labels: ["Acertos", "Erros"],
      datasets: [
        {
          data: [acertos, erros],
          backgroundColor: ["#4caf50", "#f44336"],
        },
      ],
    },
  });
}

// Reiniciar quiz
btnReiniciar.addEventListener("click", () => {
  indiceAtual = 0;
  acertos = 0;
  resultado.classList.add("hidden");
  inicio.classList.remove("hidden");
});
