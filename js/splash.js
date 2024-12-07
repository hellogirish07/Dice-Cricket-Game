// Splash Screen Logic with Play Button
document.getElementById("playButton").addEventListener("click", () => {
    document.getElementById("splashScreen").classList.add("hidden");
    document.querySelector(".form").classList.remove("hidden");
});

// Start Game Logic
document.getElementById("startGame").addEventListener("click", () => {
    document.querySelector(".form").classList.add("hidden");
    document.querySelector(".game").classList.remove("hidden");
});