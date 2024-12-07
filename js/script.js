const batsmanInput = document.getElementById("batsman");
const bowlerInput = document.getElementById("bowler");
const oversInput = document.getElementById("overs");
const startGameBtn = document.getElementById("startGame");
const rollDiceBtn = document.getElementById("rollDice");
const batsmanDiceEl = document.getElementById("batsmanDice");
const bowlerDiceEl = document.getElementById("bowlerDice");
const turnEl = document.getElementById("turn");
const scoreBoardEl = document.getElementById("scoreBoard");
const gameSection = document.querySelector(".game");
const formSection = document.querySelector(".form");
const replayBtn = document.createElement("button");

let batsmanName, bowlerName, overs;
let batsmanScore = 0;
let bowlerScore = 0;
let balls = 0;
let maxBalls;
let isOut = false;
let isFirstInnings = true;

replayBtn.textContent = "Replay Game";
replayBtn.style.background = "#4CAF50";
replayBtn.style.marginTop = "20px";
replayBtn.style.padding = "10px 20px";
replayBtn.style.fontSize = "1rem";
replayBtn.style.color = "#fff";
replayBtn.style.border = "none";
replayBtn.style.borderRadius = "5px";
replayBtn.style.cursor = "pointer";
replayBtn.style.transition = "background 0.3s";

replayBtn.addEventListener("click", () => {
    // Reset the game state and UI
    formSection.classList.remove("hidden");
    gameSection.classList.add("hidden");
    rollDiceBtn.disabled = false;
    replayBtn.style.display = "none"; // Hide replay button after clicking
    batsmanInput.value = '';
    bowlerInput.value = '';
    oversInput.value = '';
});

function rollDice() {
    if ((balls >= maxBalls || isOut) && isFirstInnings) {
        // End first innings
        isFirstInnings = false;
        isOut = false;
        balls = 0;
        turnEl.textContent = `${bowlerName}'s Turn to Bat`;
        [batsmanName, bowlerName] = [bowlerName, batsmanName]; // Swap roles
        scoreBoardEl.textContent = `${batsmanName}: ${bowlerScore}`;
        batsmanDiceEl.textContent = "🎲";
        bowlerDiceEl.textContent = "🎲";
        return;
    }

    if ((balls >= maxBalls || isOut) && !isFirstInnings) {
        // End second innings and declare the winner
        const winner =
            batsmanScore > bowlerScore
                ? `🏆 ${batsmanInput.value || "Batsman"} Wins!`
                : batsmanScore < bowlerScore
                    ? `🏆 ${bowlerInput.value || "Bowler"} Wins!`
                    : "It's a Tie!";

        turnEl.textContent = `Game Over! ${winner}`;
        scoreBoardEl.textContent = `Final Scores:\n${batsmanInput.value || "Batsman"}: ${batsmanScore}\n${bowlerInput.value || "Bowler"}: ${bowlerScore}`;
        rollDiceBtn.disabled = true;
        gameSection.appendChild(replayBtn); // Show replay button
        replayBtn.style.display = "inline-block"; // Show replay button
        return;
    }

    // Roll the dice for both batsman and bowler
    const batsmanRoll = Math.floor(Math.random() * 6) + 1;
    const bowlerRoll = Math.floor(Math.random() * 6) + 1;

    // Display dice rolls
    batsmanDiceEl.textContent = `🎲 ${batsmanRoll}`;
    bowlerDiceEl.textContent = `🎲 ${bowlerRoll}`;
    
    if (bowlerRoll > batsmanRoll) {
        isOut = true; // Current batsman is out
        turnEl.textContent = `${batsmanName} is OUT! Final Score: ${isFirstInnings ? batsmanScore : bowlerScore
            }`;
    } else {
        // Add to the current batsman's score
        if (isFirstInnings) {
            batsmanScore += batsmanRoll;
        } else {
            bowlerScore += batsmanRoll;
        }
        turnEl.textContent = `${batsmanName} scores ${batsmanRoll}`;
    }

    balls++;

    // Update scoreboard
    if (isFirstInnings) {
        scoreBoardEl.textContent = `${batsmanName}: ${batsmanScore}`;
    } else {
        scoreBoardEl.textContent = `${batsmanName}: ${bowlerScore}`;
    }
}

startGameBtn.addEventListener("click", () => {
    // Get input values
    batsmanName = batsmanInput.value || "Batsman";
    bowlerName = bowlerInput.value || "Bowler";
    overs = parseInt(oversInput.value) || 1;

    // Initialize game state
    batsmanScore = 0;
    bowlerScore = 0;
    balls = 0;
    maxBalls = overs * 6;
    isOut = false;
    isFirstInnings = true;

    // Reset UI
    batsmanDiceEl.textContent = "🎲";
    bowlerDiceEl.textContent = "🎲";
    turnEl.textContent = `${batsmanName}'s Turn to Bat`;
    scoreBoardEl.textContent = `${batsmanName}: 0`;

    // Show game section and enable dice rolling
    formSection.classList.add("hidden");
    gameSection.classList.remove("hidden");
    rollDiceBtn.disabled = false;
});

rollDiceBtn.addEventListener("click", rollDice);
