let runningTotal = 0;
let buffer = '0';
let previousOperator;

const output = document.querySelector('.js-output');

function buttonClick(value) {
    if(isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    output.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case 'CE':
            previousOperator = null;
            break;
        case '<':
            if(buffer.length === 1) {
                buffer = '0';
            } else  {
                buffer = buffer.substring(0, buffer.length-1);
            }
            break;
        case '+':
        case '-':
        case '*':
        case '÷':
        case '%':
        case '+/-':
            handleMath(symbol);
            break;
    }
}
function handleMath(symbol) {
    if(buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);
    if(runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
        buffer = runningTotal;
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
        buffer = runningTotal;
    } else if(previousOperator === '-') {
        runningTotal -= intBuffer;
    } else  if(previousOperator === '*') {
        runningTotal *= intBuffer;
    } else if(previousOperator === '÷') {
        runningTotal /= intBuffer;
    }else if(previousOperator === '%') {
        runningTotal %= intBuffer;
    }else if (previousOperator === '+/-') {
        runningTotal = intBuffer * (-1);
    }
}

function handleNumber(numberString) {
    if(buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-numbers').addEventListener('click', function (event){
        buttonClick(event.target.innerText);
    })
}
init();