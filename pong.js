const gameContainer = document.querySelector('.game-container');
const playerPaddle = document.getElementById('player-paddle');
const aiPaddle = document.getElementById('ai-paddle');
const ball = document.getElementById('ball');
const playerScoreDisplay = document.getElementById('player-score');
const aiScoreDisplay = document.getElementById('ai-score');
const startButton = document.getElementById('start-button');

let ballX = 392.5, ballY = 192.5;
let ballSpeedX = 4, ballSpeedY = 4;
const paddleSpeed = 10;
let playerScore = 0, aiScore = 0;
let aiDifficulty = 0.8;
let gameStarted = false;

// Iniciar o jogo
startButton.addEventListener('click', () => {
    gameContainer.style.display = 'block';
    startButton.style.display = 'none';
    gameStarted = true;
    resetBall();
    updateBall();
});

// Movimento da raquete do jogador
document.addEventListener('mousemove', (e) => {
    if (!gameStarted) return;
    const rect = gameContainer.getBoundingClientRect();
    const mouseY = e.clientY - rect.top - playerPaddle.offsetHeight / 2;
    playerPaddle.style.top = `${Math.min(Math.max(mouseY, 0), gameContainer.offsetHeight - playerPaddle.offsetHeight)}px`;
});

// Movimento da bola
function updateBall() {
    if (!gameStarted) return;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colisão com as paredes superior e inferior
    if (ballY <= 0 || ballY >= gameContainer.offsetHeight - ball.offsetHeight) {
        ballSpeedY *= -1;
    }

    // Colisão com a raquete do jogador
    if (ballX <= playerPaddle.offsetWidth && ballY >= parseFloat(playerPaddle.style.top) && ballY <= parseFloat(playerPaddle.style.top) + playerPaddle.offsetHeight) {
        ballSpeedX *= -1;
    }

    // Colisão com a raquete da IA
    if (ballX >= gameContainer.offsetWidth - aiPaddle.offsetWidth - ball.offsetWidth && ballY >= parseFloat(aiPaddle.style.top) && ballY <= parseFloat(aiPaddle.style.top) + aiPaddle.offsetHeight) {
        ballSpeedX *= -1;
    }

    // Resetar a bola se ela sair da tela e atualizar o placar
    if (ballX <= 0) {
        aiScore++;
        aiScoreDisplay.textContent = aiScore;
        resetBall();
    } else if (ballX >= gameContainer.offsetWidth) {
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
        resetBall();
    }

    // Movimento da raquete da IA com dificuldade progressiva
    aiPaddle.style.top = `${ballY - aiPaddle.offsetHeight / 2 + (Math.random() - 0.5) * aiDifficulty * 50}px`;

    // Aumentar a dificuldade da IA ao longo do tempo
    if ((playerScore + aiScore) % 5 === 0) {
        aiDifficulty += 0.1;
    }

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    requestAnimationFrame(updateBall);
}

function resetBall() {
    ballX = 392.5;
    ballY = 192.5;
    ballSpeedX = 4;
    ballSpeedY = 4;
}