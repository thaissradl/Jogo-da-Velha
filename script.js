const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X";
let isGameOver = false;

// Array de arrays representando as combinações vencedoras
let positions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function init() {
  selected = Array(9).fill(null); // Inicializa o array de seleções com null
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = "";
    item.disabled = false; // Ativa os botões novamente após um jogador ganhar ou perder
    item.addEventListener("click", newMove);
  });
}

init();

function newMove(e) {
  const index = e.target.getAttribute("data-i");

  // Verifica se a célula já foi selecionada
  if (!selected[index] && !isGameOver) {
    selected[index] = player; // Marca a posição com o jogador atual
    e.target.innerHTML = player; // Atualiza o botão com "X" ou "O"

    if (checkWin(player)) {
      // Verifica se o jogador atual ganhou
      currentPlayer.innerHTML = `JOGADOR ${player} VENCEU!`;
      document.querySelectorAll(".game button").forEach((item) => {
        item.disabled = true; // Desativa os botões
      });
      isGameOver = true; // Define que o jogo acabou
      return; // Sai da função se um jogador ganhou
    }

    if (selected.every((cell) => cell !== null)) {
      currentPlayer.innerHTML = "EMPATE!";
      isGameOver = true;
      return;
    }

    // Alterna o jogador
    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
  }
}

function checkWin(currentPlayer) {
  // Verifica se alguma das combinações vencedoras foi preenchida pelo jogador atual
  return positions.some((combination) => {
    return combination.every((index) => {
      return selected[index] === currentPlayer;
    });
  });
}

function resetGame() {
  selected = Array(9).fill(null); // Reseta o array de seleções
  player = "X"; // Reseta o jogador para X
  isGameOver = false; // Marca o jogo como não finalizado
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`; // Atualiza o status do jogador

  // Limpa e reativa os botões
  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = ""; // Limpa o texto do botão
    item.disabled = false; // Reativa os botões
  });
}
