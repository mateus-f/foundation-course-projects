const ROUNDS = 5;

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomChoice = choices[Math.floor(Math.random() * choices.length)];

  return randomChoice;
}

function getHumanChoice() {
  const selectedValue = prompt(
    `Choose a value:
    1. Rock
    2. Paper
    3. Scissors`
  );

  const choices = {
    1: 'rock',
    2: 'paper',
    3: 'scissors'
  };

  return choices[selectedValue];
}

function playGame() {
  const selection = {
    computer: '',
    human: ''
  }

  let score = {
    human: 0,
    computer: 0
  };

  function playRound(computerChoice, humanChoice) {
    const rules = {
      rock: 'scissors',
      scissors: 'paper',
      paper: 'rock'
    };

    let message = "";

    if (humanChoice === computerChoice) {
      message = 'Draw!';
    } else if (humanChoice === rules[computerChoice]) {
      message = `Computer won! ${computerChoice} beats ${humanChoice}.`;
      score.computer++;
    } else {
      message = `Human won! ${humanChoice} beats ${computerChoice}.`;
      score.human++;
    }

    console.group('%cROUND', 'color: #fcfcfcff; background-color: #323233ff; padding: 5px; font-weight: bold;')
    console.log(message);
    console.log(`Computer: ${score.computer} | Human: ${score.human}`);
    console.groupEnd()
  }

  console.log('%cTHE GAME HAS BEGUN!!!', 'color: #dcdc00; background-color: #404000ff; padding: 5px; font-weight: bold;');

  for (let i = 1; i <= ROUNDS; i++) {
    selection.computer = getComputerChoice();
    selection.human = getHumanChoice();
    playRound(selection.computer, selection.human);
  }

  console.log('%cTHE GAME IS OVER!!!', 'color: #dc0000ff; background-color: #400000ff; padding: 5px; font-weight: bold;');
  console.log(`%cTHE FINAL WINNER IS... ${selection.computer > selection.human ? 'COMPUTER' : 'HUMAN'}! CONGRATULATIONS!`, 'color: #21dc00ff; background-color: #004003ff; padding: 5px; font-weight: bold;');
}

playGame();
