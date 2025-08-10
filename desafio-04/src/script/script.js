const frame = document.querySelector(".frame");
const setLayoutButton = document.querySelector("button");
const squares = document.querySelectorAll(".square");

let layoutOfSquares = 0;

setLayoutButton.addEventListener("click", () =>
	setLayoutOfSquares(getLayoutOfSquares())
);

attachRandomColorOnHover(squares);

function getLayoutOfSquares() {
	while (true) {
		const userInput = prompt(
			"Defina como deve ser o layout.\nInsira um número entre (1-100):"
		);

		layoutOfSquares = Number(userInput.trim());

		if (layoutOfSquares > 0 && layoutOfSquares <= 100) {
			return layoutOfSquares;
		}
	}
}

function setLayoutOfSquares(amount) {
	clearLayout();

	for (let i = 1; i <= amount; i++) {
		const row = document.createElement("div");
		row.classList.add("row");
		frame.appendChild(row);

		for (let j = 1; j <= amount; j++) {
			const square = document.createElement("div");
			square.classList.add("square");
			row.appendChild(square);
		}
	}

	const squares = document.querySelectorAll(".square");
	attachRandomColorOnHover(squares);
}

function clearLayout() {
	while (frame.firstChild) {
		frame.removeChild(frame.firstChild);
	}
}

function setRandomColor(color, square) {
	square.style.backgroundColor = color;
}

function getRandomColor() {
	const randomNumber = Math.floor(Math.random() * 16777215);
	let hexColor = randomNumber.toString(16);

	hexColor = `#${hexColor.padStart(6, "0")}`;

	return hexColor;
}

function attachRandomColorOnHover(elements) {
	elements.forEach((element) =>
		element.addEventListener("mouseover", () =>
			setRandomColor(getRandomColor(), element)
		)
	);
}
