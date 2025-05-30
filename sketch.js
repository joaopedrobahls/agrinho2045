let target;         // posição e tamanho do alvo
let score = 0;      // pontuação
let startTime;      // momento do início
let gameDuration = 30 * 1000; // 30 segundos
let gameOver = false;

function setup() {
  createCanvas(600, 400);
  target = novaPosicao();
  startTime = millis();
  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() {
  background(50, 80, 150);

  if (!gameOver) {
    // Desenha alvo
    fill(255, 0, 0);
    ellipse(target.x, target.y, target.size);
    fill(255);
    ellipse(target.x, target.y, target.size * 0.6);
    fill(255, 0, 0);
    ellipse(target.x, target.y, target.size * 0.3);

    // Mostra pontuação e tempo
    fill(255);
    let elapsed = millis() - startTime;
    let remaining = max(0, ceil((gameDuration - elapsed) / 1000));
    text(`Pontos: ${score}`, width / 4, 30);
    text(`Tempo: ${remaining}s`, (width / 4) * 3, 30);

    // Verifica fim de jogo
    if (elapsed >= gameDuration) {
      gameOver = true;
    }
  } else {
    // Tela de fim
    background(0, 0, 80);
    fill(255);
    textSize(36);
    text(`Tempo esgotado!`, width / 2, height / 2 - 40);
    text(`Sua pontuação: ${score}`, width / 2, height / 2 + 10);
    textSize(20);
    text(`Recarregue a página para jogar novamente`, width / 2, height / 2 + 50);
  }
}
 
function mousePressed() {
  if (gameOver) return;
  let d = dist(mouseX, mouseY, target.x, target.y);
  if (d < target.size / 2) {
    score++;
    target = novaPosicao();
  }
}

// Gera um alvo de tamanho e posição aleatória
function novaPosicao() {
  let size = random(40, 80);
  let x = random(size / 2, width - size / 2);
  let y = random(size / 2 + 50, height - size / 2); // deixa espaço para o texto
  return { x, y, size };
}