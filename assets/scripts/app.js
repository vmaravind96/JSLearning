let curResult = 0;

function getUserInputNumber(){
    return parseInt(userInput.value);
}

function generateDescription(operation, inputNumber){
    return `${curResult} ${operation} ${inputNumber}`
}

function add(){
    const inputNumber = getUserInputNumber();
    const description = generateDescription('+', inputNumber);
    curResult += inputNumber; 
    outputResult(curResult, description);
}

function subtract(){
    const inputNumber = getUserInputNumber();
    const description = generateDescription('-', inputNumber);
    curResult -= inputNumber; 
    outputResult(curResult, description);
}

function multiply(){
    const inputNumber = getUserInputNumber();
    const description = generateDescription('*', inputNumber);
    curResult *= inputNumber; 
    outputResult(curResult, description);
}

function divide(){
    const inputNumber = getUserInputNumber();
    const description = generateDescription('/', inputNumber);
    curResult /= inputNumber; 
    outputResult(curResult, description);
}

addBtn.addEventListener('click', add);

subtractBtn.addEventListener('click', subtract);

multiplyBtn.addEventListener('click', multiply);

divideBtn.addEventListener('click', divide);

