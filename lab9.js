document.addEventListener("DOMContentLoaded", () => {
    const setupScreen = document.getElementById("setup-screen");
    const gameScreen = document.getElementById("game-screen");
    const usernameInput = document.getElementById("username-input");
    const startBtn = document.getElementById("start-btn");
    const errorMsg = document.getElementById("error-msg");

    const displayName = document.getElementById("display-name");
    const statusText = document.getElementById("status-text");
    const userScoreEl = document.getElementById("user-score");
    const compScoreEl = document.getElementById("comp-score");
    
    const userImgEl = document.getElementById("user-img");
    const compImgEl = document.getElementById("comp-img");
    const userCardInfoEl = document.getElementById("user-card-info");
    const compCardInfoEl = document.getElementById("comp-card-info");

    const userCard = document.getElementById("user-card");
    const compCard = document.getElementById("comp-card");
    const rollBtn = document.getElementById("roll-btn");
    const resetBtn = document.getElementById("reset-btn");
    const changeBtn = document.getElementById("chng-btn");

    const defaultImg = "https://img-cdn.hltv.org/eventlogo/PhVPy7kXO_J_nfTng7a87h.png?ixlib=java-2.1.0&w=200&s=7a1dd4079a079fb5c5133dea996cc5f0";

    const cards = [
        { name: "B8", value: 6, img: "https://img-cdn.hltv.org/teamlogo/rUIL5D299QDtRjXR2rxqV_.png?ixlib=java-2.1.0&w=100&s=4abc989b611fbbc5a8d2daea4dd261cf" },
        { name: "Astralis", value: 7, img: "https://img-cdn.hltv.org/teamlogo/9bgXHp-oh1oaXr7F0mTGmd.svg?ixlib=java-2.1.0&s=f567161ab183001be33948b98c4b2067" },
        { name: "MOUZ", value: 8, img: "https://img-cdn.hltv.org/teamlogo/IejtXpquZnE8KqYPB1LNKw.svg?ixlib=java-2.1.0&s=7fd33b8def053fbfd8fdbb58e3bdcd3c" },
        { name: "FUT", value: 9, img: "https://img-cdn.hltv.org/teamlogo/Os71GAOy8KDuQFc0M8HE6O.png?ixlib=java-2.1.0&w=100&s=828ea5ad48c3f170daf3ab9d983c8048" },
        { name: "Vitality", value: 10, img: "https://img-cdn.hltv.org/teamlogo/yeXBldn9w8LZCgdElAenPs.png?ixlib=java-2.1.0&w=100&s=a0731380d1075205aadb30905a49da55" },
        { name: "FaZe", value: 2, img: "https://img-cdn.hltv.org/teamlogo/Wo9goa1eRNUtd6NLvrmwW8.png?ixlib=java-2.1.0&w=100&s=6f96eec7c51667d10b964e8b69e8d336" },
        { name: "G2", value: 3, img: "https://img-cdn.hltv.org/teamlogo/zFLwAELOD15BjJSDMMNBWQ.png?ixlib=java-2.1.0&w=100&s=88aeba1564bc27de69fb2302e47e1a7c" },
        { name: "FNATIC", value: 4, img: "https://img-cdn.hltv.org/teamlogo/dLtWEdSV58lIX1amAFggy0.svg?ixlib=java-2.1.0&s=f24d0a7b3ef24ed57184a51d35202b4e" },
        { name: "NAVI", value: 11, img: "https://img-cdn.hltv.org/teamlogo/9iMirAi7ArBLNU8p3kqUTZ.svg?ixlib=java-2.1.0&s=4dd8635be16122656093ae9884675d0c" }
    ];

    let userName = "";
    let userScore = 0;
    let compScore = 0;
    let roundCount = 0;
    const maxRounds = 3;

    function startGame() {
        const trimmedName = usernameInput.value.trim();

        if (trimmedName.length < 1) {
            errorMsg.textContent = "Введіть ім'я (мінімум 1 символ)!";
            usernameInput.style.borderColor = "#ef4444";
            return;
        }

        userName = trimmedName;
        displayName.textContent = userName;
        errorMsg.textContent = "";
        
        setupScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");
    }

    startBtn.addEventListener("click", startGame);

    usernameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") startGame();
    });

    rollBtn.addEventListener("click", () => {
        if (roundCount >= maxRounds) return;

        roundCount++;

        const userRandomCard = cards[Math.floor(Math.random() * cards.length)];
        const compRandomCard = cards[Math.floor(Math.random() * cards.length)];

        userImgEl.src = userRandomCard.img;
        userCardInfoEl.textContent = `${userRandomCard.name} (+${userRandomCard.value} очок)`;

        compImgEl.src = compRandomCard.img;
        compCardInfoEl.textContent = `${compRandomCard.name} (+${compRandomCard.value} очок)`;

        // Додаємо номінал витягнутої карти до загального рахунку
        userScore += userRandomCard.value;
        compScore += compRandomCard.value;

        userScoreEl.textContent = userScore;
        compScoreEl.textContent = compScore;

        userCard.classList.remove("win-round");
        compCard.classList.remove("win-round");

        if (userRandomCard.value > compRandomCard.value) {
            userCard.classList.add("win-round");
        } else if (compRandomCard.value > userRandomCard.value) {
            compCard.classList.add("win-round");
        }

        if (roundCount < maxRounds) {
            statusText.textContent = `Раунд ${roundCount} з ${maxRounds}: ${userName} (+${userRandomCard.value}) vs Комп'ютер (+${compRandomCard.value})`;
        } else {
            userCard.classList.remove("win-round");
            compCard.classList.remove("win-round");

            if (userScore > compScore) {
                userCard.classList.add("win-round");
                statusText.textContent = `Гру завершено! Переміг ${userName} із рахунком ${userScore} : ${compScore} `;
            } else if (compScore > userScore) {
                compCard.classList.add("win-round");
                statusText.textContent = `Гру завершено! Переміг Комп'ютер із рахунком ${compScore} : ${userScore} `;
            } else {
                statusText.textContent = `Гру завершено! Нічия за сумою балів (${userScore} : ${compScore}) `;
            }

            rollBtn.classList.add("hidden");
            resetBtn.classList.remove("hidden");
        }
    });

    function resetBoard() {
        userScore = 0;
        compScore = 0;
        roundCount = 0;
        userScoreEl.textContent = "0";
        compScoreEl.textContent = "0";
        userImgEl.src = defaultImg;
        compImgEl.src = defaultImg;
        userCardInfoEl.textContent = "";
        compCardInfoEl.textContent = "";
        userCard.classList.remove("win-round");
        compCard.classList.remove("win-round");
        resetBtn.classList.add("hidden");
        rollBtn.classList.remove("hidden");
    }

    resetBtn.addEventListener("click", () => {
        resetBoard();
        statusText.textContent = "Нова гра! Раунд 0 / 3 — Натисніть кнопку нижче.";
    });

    changeBtn.addEventListener("click", () => {
        resetBoard();
        statusText.textContent = "Раунд 0 / 3 — Натисніть «Витягнути карту», щоб почати!";
        setupScreen.classList.remove("hidden");
        gameScreen.classList.add("hidden");
    });
});