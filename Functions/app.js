const startGameBtn = document.getElementById("start-game-btn");

let isGameRunning = false;

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_CHOICE = ROCK;
const DRAW = "MATCH DRAW";
const PLAYER_WIN = "YOU WIN..!";
const COMPUTER_WIN = "COMPUTER WINS..!";

const getPlayerChoice = () => {
  const choice = prompt(`${ROCK} , ${PAPER} or ${SCISSORS}`).toUpperCase();
  if (choice != ROCK && choice != PAPER && choice != SCISSORS) {
    alert(`Invalid Choice.. Using ${DEFAULT_CHOICE} as the choice`);
    return DEFAULT_CHOICE;
  }
  return choice;
};

const getComputerChoice = () => {
  const randNum = Math.random();
  if (randNum < 0.33) return ROCK;
  else if (randNum > 0.33 && randNum < 0.67) return PAPER;
  return SCISSORS;
};

const getWinner = (pChoice, cChoice) =>
  pChoice === cChoice
    ? DRAW
    : (pChoice === ROCK && cChoice === SCISSORS) ||
      (pChoice === PAPER && cChoice === ROCK) ||
      (pChoice === SCISSORS && cChoice === PAPER)
    ? PLAYER_WIN
    : COMPUTER_WIN;

const getGameResultMessage = (pChoice, cChoice, winner) =>
  `You chose ${pChoice} and Computer chose ${cChoice} therefore ${winner}`;

startGameBtn.addEventListener("click", () => {
  if (isGameRunning) return;
  isGameRunning = true;
  console.log("Game is starting..!");
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  const message = getGameResultMessage(playerChoice, computerChoice, winner);
  console.log(message);
  isGameRunning = false;
});
