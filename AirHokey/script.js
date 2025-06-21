// MIT License
// Copyright (c) 2024 The Project Contributors
// See LICENSE file for full license text.

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const playerScoreEl = document.getElementById('player-score');
    const botScoreEl = document.getElementById('bot-score');
    const resetButton = document.getElementById('reset-score');
    const themeToggleButton = document.getElementById('theme-toggle');
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsMenu = document.getElementById('settings-menu');
    const gameOverScreen = document.getElementById('game-over-screen');
    const winnerMessage = document.getElementById('winner-message');
    const playAgainButton = document.getElementById('play-again');

    // --- Game Configuration ---
    canvas.width = 800;
    canvas.height = 400;

    const paddleWidth = 15; // This will be the radius
    const puckRadius = 10;
    const botSpeed = 4; // Max speed for the bot paddle
    const WINNING_SCORE = 7;

    // --- Game State ---
    let scores = {
        player: 0,
        bot: 0
    };

    const player = {
        x: paddleWidth * 2,
        y: canvas.height / 2,
        radius: paddleWidth
    };

    const bot = {
        x: canvas.width - (paddleWidth * 2),
        y: canvas.height / 2,
        radius: paddleWidth
    };

    const puck = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: puckRadius,
        speed: 6,
        vx: 0, // velocity x
        vy: 0, // velocity y
        trail: [],
        hitEffect: 0 // counter for hit flash effect
    };

    let particles = [];
    let themeColors = {};
    let isGameOver = false;

    // --- Initialization ---
    function init() {
        loadState();
        updateScoreboard();
        resetPuck(1); // Start with puck moving towards player
        addEventListeners();
        gameLoop();
    }

    function loadState() {
        // Load scores
        const savedScores = localStorage.getItem('airHockeyScores');
        if (savedScores) {
            scores = JSON.parse(savedScores);
        }
        // Load theme
        const savedTheme = localStorage.getItem('airHockeyTheme');
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
        }
    }

    function saveState() {
        localStorage.setItem('airHockeyScores', JSON.stringify(scores));
        localStorage.setItem('airHockeyTheme', document.body.getAttribute('data-theme'));
    }

    function addEventListeners() {
        // Player paddle movement
        canvas.addEventListener('mousemove', movePlayerPaddle);

        // Settings menu toggle
        settingsToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click from closing menu immediately
            settingsMenu.classList.toggle('hidden');
        });

        // Hide settings menu if clicking elsewhere
        document.addEventListener('click', () => {
            if (!settingsMenu.classList.contains('hidden')) {
                settingsMenu.classList.add('hidden');
            }
        });

        // Reset button
        resetButton.addEventListener('click', () => {
            startNewGame();
            saveState();
        });

        // Theme toggle button
        themeToggleButton.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.body.removeAttribute('data-theme');
            } else {
                document.body.setAttribute('data-theme', 'dark');
            }
            saveState();
        });

        // Play Again button
        playAgainButton.addEventListener('click', startNewGame);
    }

    // --- Game Loop ---
    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    // --- Update Logic ---
    function update() {
        if (isGameOver) return; // Stop all game logic updates if game is over

        movePuck();
        moveBotPaddle();
        checkCollisions();
        updateParticles();
    }

    function movePuck() {
        // Add current position to trail
        puck.trail.push({ x: puck.x, y: puck.y });
        if (puck.trail.length > 15) { // Trail length
            puck.trail.shift();
        }

        puck.x += puck.vx;
        puck.y += puck.vy;
    }

    function moveBotPaddle() {
        // --- Y-axis movement (reactive) ---
        const dy = puck.y - bot.y;
        if (Math.abs(dy) > botSpeed) {
            bot.y += Math.sign(dy) * botSpeed;
        } else {
            bot.y += dy;
        }

        // --- X-axis movement (strategic) ---
        // If puck is coming towards bot, move forward to attack
        // If puck is moving away, retreat to a defensive position
        let targetX;
        if (puck.vx > 0 && puck.x > canvas.width / 2) {
            // Attack: move towards the puck
            targetX = Math.max(canvas.width / 2 + 100, puck.x);
        } else {
            // Defend: return to base position
            targetX = canvas.width - (paddleWidth * 2);
        }

        const dx = targetX - bot.x;
        bot.x += dx * 0.1; // Use a fraction to make the movement smooth

        // Clamp bot paddle position
        bot.x = Math.max(canvas.width / 2 + bot.radius, Math.min(canvas.width - bot.radius, bot.x));
        bot.y = Math.max(bot.radius, Math.min(canvas.height - bot.radius, bot.y));
    }

    function movePlayerPaddle(e) {
        const rect = canvas.getBoundingClientRect();
        player.x = e.clientX - rect.left;
        player.y = e.clientY - rect.top;

        // Clamp player paddle position to their half
        player.x = Math.max(player.radius, Math.min(canvas.width / 2 - player.radius, player.x));
        player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));
    }

    function checkCollisions() {
        // Puck with top/bottom walls
        if (puck.y - puck.radius < 0 || puck.y + puck.radius > canvas.height) {
            puck.vy *= -1;
            puck.y = Math.max(puck.radius, Math.min(canvas.height - puck.radius, puck.y)); // clamp position
            createParticles(puck.x, puck.y, 10, themeColors.tableLineColor || '#e0e0e0');
        }

        // Puck with paddles
        let paddle = (puck.x < canvas.width / 2) ? player : bot;
        if (isColliding(puck, paddle)) {
            // Calculate collision angle
            let collidePoint = (puck.y - paddle.y) / paddle.radius;
            let angleRad = (Math.PI / 4) * collidePoint;

            // Calculate new velocity
            let direction = (puck.x < canvas.width / 2) ? 1 : -1;
            puck.vx = direction * puck.speed * Math.cos(angleRad);
            puck.vy = puck.speed * Math.sin(angleRad);

            // Increase speed slightly on hit for more dynamic gameplay
            puck.speed = Math.min(puck.speed + 0.2, 15);
            
            // Trigger particle effect
            const particleColor = (paddle === player) ? themeColors.playerPaddleColor : themeColors.botPaddleColor;
            createParticles(puck.x, puck.y, 20, particleColor || '#000');
            
            // Trigger hit effect
            puck.hitEffect = 10; // frames for the effect to last
        }

        // Score detection
        if (puck.x - puck.radius < 0) {
            scores.bot++;
            updateScoreboard();
            saveState();
            if (scores.bot >= WINNING_SCORE) {
                handleGameOver('Bot');
            } else {
                resetPuck(-1); // Bot scored, puck goes to bot
            }
        } else if (puck.x + puck.radius > canvas.width) {
            scores.player++;
            updateScoreboard();
            saveState();
            if (scores.player >= WINNING_SCORE) {
                handleGameOver('Player');
            } else {
                resetPuck(1); // Player scored, puck goes to player
            }
        }
    }
    function isColliding(circle1, circle2) {
        const dx = circle1.x - circle2.x;
        const dy = circle1.y - circle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < circle1.radius + circle2.radius;
    }

    function resetPuck(direction) {
        puck.x = canvas.width / 2;
        puck.y = canvas.height / 2;
        puck.speed = 6;
        puck.trail = [];
        
        // Give puck a random starting angle towards the 'direction'
        const angle = (Math.random() * Math.PI / 2) - (Math.PI / 4); // -45 to +45 degrees
        puck.vx = direction * puck.speed * Math.cos(angle);
        puck.vy = puck.speed * Math.sin(angle);
    }

    function updateScoreboard() {
        playerScoreEl.textContent = scores.player;
        botScoreEl.textContent = scores.bot;
    }

    // --- Game State Functions ---
    function handleGameOver(winner) {
        isGameOver = true;
        winnerMessage.textContent = `${winner} Wins!`;
        gameOverScreen.classList.remove('hidden');
    }

    function startNewGame() {
        scores.player = 0;
        scores.bot = 0;
        updateScoreboard();

        if (!gameOverScreen.classList.contains('hidden')) {
            gameOverScreen.classList.add('hidden');
        }

        isGameOver = false;
        resetPuck(1);
    }

    // --- Particle System Logic ---
    function createParticles(x, y, count, color) {
        for (let i = 0; i < count; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4, // random velocity
                vy: (Math.random() - 0.5) * 4,
                radius: Math.random() * 2 + 1,
                lifespan: 50, // frames
                color: color
            });
        }
    }

    function updateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.lifespan--;
            if (p.lifespan <= 0) {
                particles.splice(i, 1);
            }
        }
    }

    function drawParticles() {
        for (const p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.globalAlpha = p.lifespan / 50; // Fade out
            ctx.fillStyle = p.color;
            ctx.fill();
        }
        ctx.globalAlpha = 1.0; // Reset alpha
    }

    // --- Draw Logic ---
    function draw() {
        // Get current theme colors and store them for the update loop
        const style = getComputedStyle(document.body);
        themeColors.tableBg = style.getPropertyValue('--table-bg');
        themeColors.tableLineColor = style.getPropertyValue('--table-line-color');
        themeColors.playerPaddleColor = style.getPropertyValue('--player-paddle-color');
        themeColors.botPaddleColor = style.getPropertyValue('--bot-paddle-color');
        themeColors.puckColor = style.getPropertyValue('--puck-color');

        // Clear canvas with table background
        ctx.fillStyle = themeColors.tableBg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw table markings
        drawTable(themeColors.tableLineColor);

        // Draw particles, puck trail, then puck and paddles
        drawParticles();
        // Draw puck trail
        drawPuckTrail(themeColors.puckColor);
        // Draw puck
        drawPuck(themeColors.puckColor);
        // Draw paddles
        drawPaddle(player, themeColors.playerPaddleColor);
        drawPaddle(bot, themeColors.botPaddleColor);
    }

    function drawTable(color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;

        // Center line
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();

        // Center circle
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
        ctx.stroke();
        
        // Goals
        ctx.lineWidth = 10;
        const goalHeight = 120;
        // Player goal
        ctx.beginPath();
        ctx.moveTo(2, canvas.height / 2 - goalHeight / 2);
        ctx.lineTo(2, canvas.height / 2 + goalHeight / 2);
        ctx.stroke();
        // Bot goal
        ctx.beginPath();
        ctx.moveTo(canvas.width - 2, canvas.height / 2 - goalHeight / 2);
        ctx.lineTo(canvas.width - 2, canvas.height / 2 + goalHeight / 2);
        ctx.stroke();
    }

    function drawPaddle(paddle, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(paddle.x, paddle.y, paddle.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner circle for aesthetics
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--table-bg');
        ctx.beginPath();
        ctx.arc(paddle.x, paddle.y, paddle.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawPuck(color) {
        if (puck.hitEffect > 0) {
            // Flash effect on hit
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(puck.x, puck.y, puck.radius + 3, 0, Math.PI * 2);
            ctx.fill();
            puck.hitEffect--;
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(puck.x, puck.y, puck.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    function drawPuckTrail(color) {
        for (let i = 0; i < puck.trail.length; i++) {
            const pos = puck.trail[i];
            const opacity = (i / puck.trail.length) * 0.5; // Fade out
            ctx.fillStyle = `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, puck.radius * (i / puck.trail.length), 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // --- Start the game ---
    init();
});