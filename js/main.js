// ========================================
// OMNI PLATFORM - COMPLETE JAVASCRIPT
// Save this as: js/main.js
// ========================================

// ========== HOMEPAGE FEATURES ==========

// Quick Calculator
function quickCalculate() {
  const input = document.getElementById('quickCalc');
  const output = document.getElementById('quickCalcResult');
  
  if (!input || !output) return;
  
  if (!input.value.trim()) {
    output.textContent = 'Please enter a calculation';
    output.style.color = '#f87171';
    return;
  }
  
  try {
    const result = eval(input.value);
    output.textContent = `Result: ${result}`;
    output.style.color = '#38bdf8';
  } catch (error) {
    output.textContent = 'Invalid expression';
    output.style.color = '#f87171';
  }
}

// Random Facts
const facts = [
  "The human brain can process images in as little as 13 milliseconds.",
  "Honey never spoils. Archaeologists have found 3000-year-old honey that's still edible.",
  "Octopuses have three hearts and blue blood.",
  "A day on Venus is longer than a year on Venus.",
  "Bananas are berries, but strawberries aren't.",
  "The shortest war in history lasted 38 minutes.",
  "Your brain uses 20% of your body's energy despite being only 2% of its weight.",
  "There are more stars in the universe than grains of sand on Earth.",
  "A single bolt of lightning contains enough energy to toast 100,000 slices of bread."
];

function showFact() {
  const output = document.getElementById('randomFact');
  if (!output) return;
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  output.textContent = randomFact;
}

// Animated counter
let toolCount = 0;
const countInterval = setInterval(() => {
  if (toolCount < 12847) {
    toolCount += Math.floor(Math.random() * 50) + 10;
    const el = document.getElementById('toolsUsed');
    if (el) {
      el.textContent = toolCount.toLocaleString();
    }
  } else {
    clearInterval(countInterval);
  }
}, 100);

// ========== TOOLS PAGE ==========

function openTool(id) {
  document.querySelectorAll('.tool-box').forEach(box => box.classList.add('hidden'));
  const tool = document.getElementById(id);
  if (tool) tool.classList.remove('hidden');
}

// Text Summarizer
function summarize() {
  const text = document.getElementById('textInput');
  const output = document.getElementById('summaryOutput');
  if (!text || !output) return;
  
  if (!text.value.trim()) {
    output.textContent = 'Please enter some text to summarize';
    return;
  }
  
  const words = text.value.split(' ');
  const summary = words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');
  output.textContent = summary;
}

// Calculator
function calculate() {
  const input = document.getElementById('calcInput');
  const output = document.getElementById('calcOutput');
  if (!input || !output) return;
  
  try {
    const result = eval(input.value);
    output.textContent = 'Result: ' + result;
  } catch {
    output.textContent = 'Invalid expression';
  }
}

// Unit Converter
function convert() {
  const cm = document.getElementById('convInput');
  const output = document.getElementById('convOutput');
  if (!cm || !output) return;
  
  const value = parseFloat(cm.value);
  if (isNaN(value)) {
    output.textContent = 'Please enter a valid number';
    return;
  }
  output.textContent = `${value} cm = ${(value / 2.54).toFixed(2)} inches`;
}

// ========== AI CHAT ==========

function sendMessage() {
  const input = document.getElementById('userInput');
  const chatBox = document.getElementById('chatBox');
  if (!input || !chatBox) return;
  
  const text = input.value.trim();
  if (!text) return;
  
  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.textContent = text;
  chatBox.appendChild(userMsg);
  
  input.value = '';
  
  setTimeout(() => {
    const aiMsg = document.createElement('div');
    aiMsg.className = 'message ai';
    aiMsg.textContent = 'Thanks for your message! AI features coming soon.';
    chatBox.appendChild(aiMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);
}

function handleEnter(e) {
  if (e.key === 'Enter') sendMessage();
}

// ========== LEARN PAGE ==========

function openLesson(id) {
  document.querySelectorAll('.tool-box').forEach(box => box.classList.add('hidden'));
  const lesson = document.getElementById(id);
  if (lesson) lesson.classList.remove('hidden');
}

const tips = [
  "Break big tasks into smaller steps for better focus.",
  "Practice consistently, even if just 15 minutes a day.",
  "Teach others what you learn — it reinforces your knowledge.",
  "Take breaks every 25-30 minutes to stay sharp.",
  "Use tools to work smarter, not harder."
];

function showTip() {
  const output = document.getElementById('tipOutput');
  if (!output) return;
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  output.textContent = randomTip;
}

// ========== GAMES - MODAL SYSTEM ==========

function openGame(gameId) {
  const modal = document.getElementById('gameModal');
  if (!modal) return;
  
  modal.classList.remove('hidden');
  document.querySelectorAll('.game-container').forEach(g => g.classList.add('hidden'));
  const game = document.getElementById(gameId);
  if (game) game.classList.remove('hidden');
  
  // Initialize specific games
  if (gameId === 'color') startColor();
  if (gameId === 'reaction') resetReaction();
}

function closeGame() {
  const modal = document.getElementById('gameModal');
  if (modal) modal.classList.add('hidden');
}

function filterGames(category) {
  document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  document.querySelectorAll('.game-card').forEach(card => {
    if (category === 'all' || card.dataset.category === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// ========== GAME 1: NUMBER GUESS ==========

let secretNumber = Math.floor(Math.random() * 10) + 1;
let guessAttempts = 0;

function checkGuess() {
  const guess = Number(document.getElementById('guessInput').value);
  const output = document.getElementById('guessOutput');
  const attemptsEl = document.getElementById('guessAttempts');
  
  if (!output) return;
  
  guessAttempts++;
  if (attemptsEl) attemptsEl.textContent = guessAttempts;
  
  if (guess === secretNumber) {
    output.textContent = `🎉 Correct! You got it in ${guessAttempts} attempts!`;
    output.style.background = 'rgba(34,197,94,0.2)';
    secretNumber = Math.floor(Math.random() * 10) + 1;
    guessAttempts = 0;
    if (attemptsEl) attemptsEl.textContent = '0';
  } else if (guess < secretNumber) {
    output.textContent = '📈 Too low! Try higher.';
    output.style.background = 'rgba(56,189,248,0.2)';
  } else {
    output.textContent = '📉 Too high! Try lower.';
    output.style.background = 'rgba(56,189,248,0.2)';
  }
  
  document.getElementById('guessInput').value = '';
}

// ========== GAME 2: REACTION TEST ==========

let reactionState = 'idle';
let reactionStart = 0;
let reactionTimeout = null;

function resetReaction() {
  const btn = document.getElementById('reactionBtn');
  if (!btn) return;
  btn.textContent = 'Click to Start';
  btn.className = 'reaction-btn';
  reactionState = 'idle';
  if (reactionTimeout) clearTimeout(reactionTimeout);
}

function handleReactionClick() {
  const btn = document.getElementById('reactionBtn');
  const output = document.getElementById('reactionOutput');
  if (!btn || !output) return;
  
  if (reactionState === 'idle') {
    reactionState = 'waiting';
    btn.textContent = 'Wait...';
    btn.className = 'reaction-btn waiting';
    output.textContent = '';
    
    reactionTimeout = setTimeout(() => {
      reactionState = 'ready';
      btn.textContent = 'CLICK NOW!';
      btn.className = 'reaction-btn ready';
      reactionStart = Date.now();
    }, Math.random() * 3000 + 2000);
    
  } else if (reactionState === 'waiting') {
    clearTimeout(reactionTimeout);
    output.textContent = '❌ Too early! Wait for green.';
    resetReaction();
    
  } else if (reactionState === 'ready') {
    const time = Date.now() - reactionStart;
    output.textContent = `⚡ Your reaction time: ${time}ms`;
    resetReaction();
  }
}

// ========== GAME 3: MEMORY GAME ==========

let memoryPattern = '';
let memoryRound = 0;

function startMemory() {
  memoryRound = 0;
  memoryPattern = '';
  const startBtn = document.getElementById('memoryStartBtn');
  if (startBtn) startBtn.style.display = 'none';
  nextMemoryRound();
}

function nextMemoryRound() {
  memoryRound++;
  memoryPattern += Math.floor(Math.random() * 9) + 1;
  
  const display = document.getElementById('memoryDisplay');
  const inputGroup = document.getElementById('memoryInputGroup');
  const output = document.getElementById('memoryOutput');
  const roundEl = document.getElementById('memoryRound');
  
  if (!display) return;
  
  display.textContent = memoryPattern;
  if (inputGroup) inputGroup.style.display = 'none';
  if (output) output.textContent = 'Watch the pattern...';
  if (roundEl) roundEl.textContent = memoryRound;
  
  setTimeout(() => {
    display.textContent = '❓❓❓';
    if (inputGroup) inputGroup.style.display = 'flex';
    if (output) output.textContent = 'Type what you saw!';
    document.getElementById('memoryInput').value = '';
    document.getElementById('memoryInput').focus();
  }, 1500 + (memoryRound * 300));
}

function checkMemory() {
  const input = document.getElementById('memoryInput').value;
  const output = document.getElementById('memoryOutput');
  const startBtn = document.getElementById('memoryStartBtn');
  
  if (!output) return;
  
  if (input === memoryPattern) {
    output.textContent = `✅ Round ${memoryRound} complete! Get ready...`;
    setTimeout(nextMemoryRound, 1500);
  } else {
    output.textContent = `❌ Game over! You reached round ${memoryRound}`;
    memoryPattern = '';
    if (startBtn) startBtn.style.display = 'block';
  }
}

// ========== GAME 4: TYPING SPEED ==========

let typingStart = null;

function checkTyping() {
  const target = document.getElementById('typingText').textContent.trim();
  const input = document.getElementById('typingInput').value;
  const output = document.getElementById('typingOutput');
  
  if (!output) return;
  
  if (!typingStart) typingStart = Date.now();
  
  if (input === target) {
    const time = (Date.now() - typingStart) / 1000;
    const wpm = Math.round((target.split(' ').length / time) * 60);
    output.textContent = `✅ Done! Speed: ${wpm} WPM in ${time.toFixed(1)}s`;
    typingStart = null;
  } else {
    const accuracy = Math.round((input.split('').filter((c, i) => c === target[i]).length / target.length) * 100);
    output.textContent = `Keep typing... ${accuracy}% accurate`;
  }
}

// ========== GAME 5: MATH CHALLENGE ==========

let mathAnswer = 0;
let mathCount = 0;

function startMath() {
  mathCount = 0;
  const startBtn = document.getElementById('mathStartBtn');
  const inputGroup = document.getElementById('mathInputGroup');
  const scoreEl = document.getElementById('mathScore');
  
  if (startBtn) startBtn.style.display = 'none';
  if (inputGroup) inputGroup.style.display = 'flex';
  if (scoreEl) scoreEl.textContent = '0';
  
  nextMathQuestion();
}

function nextMathQuestion() {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  const ops = ['+', '-', '*'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  
  mathAnswer = eval(`${a} ${op} ${b}`);
  const question = document.getElementById('mathQuestion');
  if (question) question.textContent = `${a} ${op} ${b} = ?`;
  
  const input = document.getElementById('mathInput');
  if (input) {
    input.value = '';
    input.focus();
  }
}

function checkMath() {
  const input = Number(document.getElementById('mathInput').value);
  const output = document.getElementById('mathOutput');
  const scoreEl = document.getElementById('mathScore');
  const startBtn = document.getElementById('mathStartBtn');
  const inputGroup = document.getElementById('mathInputGroup');
  
  if (!output) return;
  
  if (input === mathAnswer) {
    mathCount++;
    output.textContent = `✅ Correct!`;
    if (scoreEl) scoreEl.textContent = mathCount;
    nextMathQuestion();
  } else {
    output.textContent = `❌ Wrong! The answer was ${mathAnswer}. Final score: ${mathCount}`;
    mathCount = 0;
    if (startBtn) startBtn.style.display = 'block';
    if (inputGroup) inputGroup.style.display = 'none';
  }
}

// ========== GAME 6: CLICK SPEED ==========

let clickCount = 0;
let clickActive = false;

function startClicker() {
  clickCount = 0;
  clickActive = true;
  const btn = document.getElementById('clickButton');
  const output = document.getElementById('clickerOutput');
  
  if (btn) btn.disabled = false;
  if (output) output.textContent = 'Clicks: 0';
  
  setTimeout(() => {
    clickActive = false;
    if (btn) btn.disabled = true;
    if (output) output.textContent = `🎉 Final: ${clickCount} clicks in 5 seconds!`;
  }, 5000);
}

function clickGame() {
  if (clickActive) {
    clickCount++;
    const output = document.getElementById('clickerOutput');
    if (output) output.textContent = `Clicks: ${clickCount}`;
  }
}

// ========== GAME 7: COLOR MATCH ==========

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
let currentColorMatch = '';
let colorScore = 0;

function startColor() {
  const word = colors[Math.floor(Math.random() * colors.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  currentColorMatch = color;
  
  const display = document.getElementById('colorWord');
  if (display) {
    display.textContent = word.toUpperCase();
    display.style.color = color;
  }
  
  const buttons = document.getElementById('colorButtons');
  if (buttons) {
    buttons.innerHTML = '';
    colors.forEach(c => {
      const btn = document.createElement('button');
      btn.textContent = c.toUpperCase();
      btn.onclick = () => checkColor(c);
      buttons.appendChild(btn);
    });
  }
  
  const output = document.getElementById('colorOutput');
  if (output) output.textContent = '';
}

function checkColor(guess) {
  const output = document.getElementById('colorOutput');
  const scoreEl = document.getElementById('colorScore');
  
  if (guess === currentColorMatch) {
    colorScore++;
    if (output) output.textContent = '✅ Correct!';
    if (scoreEl) scoreEl.textContent = colorScore;
    setTimeout(startColor, 1000);
  } else {
    if (output) output.textContent = `❌ Wrong! It was ${currentColorMatch}. Score: ${colorScore}`;
    colorScore = 0;
    if (scoreEl) scoreEl.textContent = '0';
  }
}

// ========== GAME 8: AIM TRAINER ==========

let aimHits = 0;
let aimStart = null;

function startAim() {
  aimHits = 0;
  aimStart = Date.now();
  const target = document.getElementById('aimTarget');
  const hitsEl = document.getElementById('aimHits');
  const output = document.getElementById('aimOutput');
  
  if (target) target.style.display = 'block';
  if (hitsEl) hitsEl.textContent = '0/10';
  if (output) output.textContent = '';
  
  moveTarget();
}

function moveTarget() {
  const target = document.getElementById('aimTarget');
  const area = document.getElementById('aimArea');
  if (!target || !area) return;
  
  const maxX = area.offsetWidth - 60;
  const maxY = area.offsetHeight - 60;
  
  target.style.left = Math.random() * maxX + 'px';
  target.style.top = Math.random() * maxY + 'px';
}

function hitTarget() {
  aimHits++;
  const hitsEl = document.getElementById('aimHits');
  if (hitsEl) hitsEl.textContent = `${aimHits}/10`;
  
  if (aimHits < 10) {
    moveTarget();
  } else {
    const time = ((Date.now() - aimStart) / 1000).toFixed(2);
    const output = document.getElementById('aimOutput');
    const target = document.getElementById('aimTarget');
    
    if (output) output.textContent = `🎯 Completed in ${time}s!`;
    if (target) target.style.display = 'none';
  }
}

// ========== END OF FILE ==========
