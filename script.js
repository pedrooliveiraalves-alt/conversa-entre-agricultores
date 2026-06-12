let dinheiro = 250;
let agua = 100;
let solo = 85;
let sustentabilidade = 70;
let temporada = 1;

let farm = Array(25).fill(null);

const culturas = [
  { nome: "Milho", emoji: "🌾", valor: 80, agua: 25, sustentabilidade: 5 },
  { nome: "Cenoura", emoji: "🥕", valor: 65, agua: 15, sustentabilidade: 8 },
  { nome: "Brócolis", emoji: "🥦", valor: 95, agua: 30, sustentabilidade: 12 }
];

function atualizarStats() {
  document.getElementById("dinheiro").textContent = `R$ ${dinheiro}`;
  document.getElementById("agua").textContent = agua;
  document.getElementById("solo").textContent = solo;
  document.getElementById("sustentabilidade").textContent = sustentabilidade;
  document.getElementById("temporada").textContent = temporada;
}

function log(mensagem) {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML += `<p>> ${mensagem}</p>`;
  logDiv.scrollTop = logDiv.scrollHeight;
}

function renderFarm() {
  const grid = document.getElementById("farmGrid");
  grid.innerHTML = "";

  farm.forEach((planta) => {
    const celula = document.createElement("div");
    celula.className = "celula";
    celula.textContent = planta ? planta.emoji : "🌱";
    celula.title = planta ? planta.nome : "Parcela vazia";
    grid.appendChild(celula);
  });
}

function plantar(tipo) {
  const cultura = culturas[tipo];
  const custos = [30, 25, 40];
  const custo = custos[tipo];

  if (dinheiro < custo) {
    log("❌ Dinheiro insuficiente!");
    return;
  }

  const indexVazia = farm.findIndex(p => p === null);
  if (indexVazia === -1) {
    log("❌ Todas as parcelas estão ocupadas!");
    return;
  }

  farm[indexVazia] = { ...cultura }; // cópia do objeto
  dinheiro -= custo;
  agua = Math.max(0, agua - cultura.agua);

  log(`🌱 Plantou ${cultura.nome} na parcela ${indexVazia + 1}`);
  atualizarStats();
  renderFarm();
}

function irrigar() {
  agua = Math.min(100, agua + 25);
  solo = Math.min(100, solo + 5);
  log("💧 Irrigação sustentável realizada!");
  atualizarStats();
}

function adubar() {
  solo = Math.min(100, solo + 15);
  sustentabilidade = Math.min(100, sustentabilidade + 10);
  log("🌿 Composto orgânico aplicado!");
  atualizarStats();
}

function proximaTemporada() {
  let colheita = 0;

  farm = farm.map(parcela => {
    if (parcela) {
      colheita += parcela.valor;
      return null;
    }
    return null;
  });

  if (sustentabilidade > 80) {
    colheita = Math.floor(colheita * 1.3);
    log("🌟 Bônus de agricultura sustentável!");
  }

  dinheiro += colheita;
  agua = Math.max(30, agua - 20);
  solo = Math.max(40, solo - 10);
  temporada++;

  log(`🎉 Temporada finalizada! Colheita: R$ ${colheita}`);
  atualizarStats();
  renderFarm();
}

// Inicialização
window.onload = () => {
  atualizarStats();
  renderFarm();
  log("Bem-vindo à sua Fazenda Sustentável! 🌱 Comece plantando.");
};
