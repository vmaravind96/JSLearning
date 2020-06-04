let curResult = 0;
let logEntries = [];

function getUserInputNumber() {
  return parseInt(userInput.value);
}

function generateDescription(prevResult, operation, inputNumber) {
  return `${prevResult} ${operation} ${inputNumber}`;
}

function generateLogs(operation, result) {
  let logEntry = {
    operation: operation,
    result: result,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

function calculateResult(calculationType) {
  const inputNumber = getUserInputNumber();
  if (
    (calculationType !== "ADD" &&
      calculationType !== "SUB" &&
      calculationType !== "MUL" &&
      calculationType !== "DIV") ||
    !inputNumber
  )
    return;

  let mathOperator;
  const prevResult = curResult;
  if (calculationType === "ADD") {
    curResult += inputNumber;
    mathOperator = "+";
  } else if (calculationType === "SUB") {
    curResult -= inputNumber;
    mathOperator = "-";
  } else if (calculationType === "MUL") {
    curResult *= inputNumber;
    mathOperator = "*";
  } else {
    curResult /= inputNumber;
    mathOperator = "/";
  }
  const description = generateDescription(
    prevResult,
    mathOperator,
    inputNumber
  );
  outputResult(curResult, description);
  generateLogs(calculationType, curResult);
}

function add() {
  calculateResult("ADD");
}

function subtract() {
  calculateResult("SUB");
}

function multiply() {
  calculateResult("MUL");
}

function divide() {
  calculateResult("DIV");
}

addBtn.addEventListener("click", add);

subtractBtn.addEventListener("click", subtract);

multiplyBtn.addEventListener("click", multiply);

divideBtn.addEventListener("click", divide);
