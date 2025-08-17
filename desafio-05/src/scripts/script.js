const display = document.querySelector("input");
const clearButton = document.querySelector(".clear-btn");
const submitButton = document.querySelector(".submit-btn");
const buttons = document.querySelectorAll(".digits");

let firstNumber = null
let secondNumber = null;
let operator = null;
let content = '';

display.disabled = true;

buttons.forEach(button => {
  button.addEventListener('click', () => populateDisplay(button.textContent))
})


submitButton.addEventListener("click", () => {
  isMathExpression();

  display.value = content;
})


clearButton.addEventListener("click", () => clearValues())

const populateDisplay = function (value) {
  if (isNaN(value)) {
    hasOperatorBefore()
    isMathExpression();
    setOperator(value);
  }

  content += value;
  display.value = content;
  console.log(content)
}

const isMathExpression = function () {
  if (isNaN(content)) {
    setNumbersValue();
    calculate();
  }
}

const setOperator = function (sign) {
  operator = sign;
}

const showResult = function (resultValue) {
  content = resultValue;
}

const hasOperatorBefore = function () {
  if (isNaN(content.at(-1))) {
    content = content.slice(0, -1);
  }
}

const setNumbersValue = function () {
  firstNumber = content.split(operator)[0];
  secondNumber = content.split(operator)[1];
}

const calculate = function () {
  if (firstNumber && secondNumber) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);

    const operatorCases = {
      "+": firstNumber + secondNumber,
      "-": firstNumber - secondNumber,
      "*": firstNumber * secondNumber,
      "/": firstNumber / secondNumber
    }

    showResult(operatorCases[operator].toString());
  }
}

const clearValues = function () {
  firstNumber = null;
  secondNumber = null;
  operator = null;
  content = "";
  display.value = "";
}