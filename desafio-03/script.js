const rounds = document.querySelector(".round > span");
let remainingRounds = 5;

rounds.textContent = addZero(remainingRounds);

function getComputerChoice() {
	const CHOICES = ["rock", "paper", "scissors"];

	const randomChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];
	return randomChoice;
}

function getHumanChoice(selectedValue) {
	return selectedValue;
}

function showResultCard(computerScore, humanScore) {
	const USER_INFORMATION = {
		player: {
			picture: "src/assets/img/player-picture.webp",
			name: "You",
			category: "Player",
			quote: "Guess I’ve got more skill<br>in me than I thought!",
		},
		machine: {
			picture: "src/assets/img/machine-picture.webp",
			name: "Lenny No-Loss",
			category: "Machine",
			quote: "Another one for the collection.<br>Losing? Never heard of it!",
		},
	};

	const overlay = document.querySelector(".overlay");
	const resultCard = document.querySelector(".result-card");
	const h2 = resultCard.querySelector("h2");
	const contentContainer = resultCard.querySelector(".user-content");
	const newGameButton = resultCard.querySelector("button");

	const userContainer = {
		picture: contentContainer.querySelector("img"),
		name: contentContainer.querySelector("div .name"),
		category: contentContainer.querySelector("div .category"),
		quote: contentContainer.querySelector("q"),
	};

	const result =
		computerScore > humanScore
			? "machine"
			: humanScore > computerScore
			? "player"
			: "draw";

	overlay.setAttribute("aria-hidden", "false");
	overlay.classList.toggle("show");

	if (result !== "draw") {
		h2.textContent = "THE WINNER IS...";

		if (result === "player") {
			userContainer.picture.setAttribute(
				"src",
				USER_INFORMATION.player.picture
			);
			userContainer.picture.classList.add("player");
			userContainer.name.textContent = USER_INFORMATION.player.name;
			userContainer.category.textContent = USER_INFORMATION.player.category;
			userContainer.quote.innerHTML = USER_INFORMATION.player.quote;
		} else {
			userContainer.picture.setAttribute(
				"src",
				USER_INFORMATION.machine.picture
			);
			userContainer.picture.classList.add("machine");
			userContainer.name.textContent = USER_INFORMATION.machine.name;
			userContainer.category.textContent = USER_INFORMATION.machine.category;
			userContainer.quote.innerHTML = USER_INFORMATION.machine.quote;
		}
	} else {
		h2.textContent = "DRAW! :/";
		contentContainer.style.display = "none";
	}

	newGameButton.addEventListener("click", () => window.location.reload());
}

function addZero(element) {
	return element.toString().padStart(2, "0");
}

function playGame() {
	const buttons = document.querySelectorAll(".moves > button");

	let score = {
		human: 0,
		computer: 0,
	};

	buttons.forEach((button) =>
		button.addEventListener("click", () => {
			if (remainingRounds !== 0) {
				playRound(getComputerChoice(), getHumanChoice(button.value));
			} else {
				buttons.disabled = true;
				showResultCard(score.computer, score.human);
			}
		})
	);

	function playRound(computerChoice, humanChoice) {
		const RULES = {
			rock: "scissors",
			scissors: "paper",
			paper: "rock",
		};
		const SELECTED_EMOTE = {
			rock: "✊",
			scissors: "✌️",
			paper: "👋",
		};

		const scores = document.querySelectorAll(".score > span");
		const emotes = document.querySelectorAll(".emote");
		const textBottom = document.querySelector(".select-move > p");

		let message = textBottom.textContent;

		if (humanChoice === computerChoice) {
			message = "Draw!";
		} else if (humanChoice === RULES[computerChoice]) {
			message = `Lenny No-Loss won! ${computerChoice} beats ${humanChoice}.`;
			score.computer++;
		} else {
			message = `You won! ${humanChoice} beats ${computerChoice}.`;
			score.human++;
		}

		remainingRounds--;
		scores[0].textContent = addZero(score.computer);
		scores[1].textContent = addZero(score.human);
		rounds.textContent = addZero(remainingRounds);
		emotes[0].textContent = SELECTED_EMOTE[computerChoice];
		emotes[1].textContent = SELECTED_EMOTE[humanChoice];
		textBottom.textContent = message;
	}
}

playGame();
