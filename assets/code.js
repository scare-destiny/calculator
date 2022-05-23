const display = document.getElementById('display');
const nums = Array.from(document.getElementsByClassName('num'));
const ops = Array.from(document.getElementsByClassName('op'));
const calc = document.getElementById('calc');

let firstNum;
let secondNum;
let userOp;

let isOpClicked = false;

function add(x, y) {
	return Number(x) + Number(y);
}

function subtract(x, y) {
	return x - y;
}

function multiply(x, y) {
	return x * y;
}

function divide(x, y) {
	return x / y;
}


function operate(op, num1, num2) {
	switch (op) {
		case '+':
			return add(num1, num2);
		case '-':
			return subtract(num1, num2);
		case '*':
			return multiply(num1, num2);
		case '/':
			return divide(num1, num2);
		default:
			console.log('Operator not found, srry:(');
	}
}

function clearDisplay() {
	display.value = '';
}

function setFirstNum(num) {
	display.value += num;
	firstNum = display.value;
}

function setSecondNum(num) {
	display.value += num;
	secondNum = display.value;
}

function setNums(input) {
	if (isOpClicked && firstNum !== undefined) {
		if (secondNum === undefined) {
			clearDisplay()
		}
		setSecondNum(input);
	}
	else {
		setFirstNum(input);
	}
}

function showResult(result) {
	display.value = result;
	firstNum = result;
	secondNum = undefined;
}

nums.forEach(num => {
	num.addEventListener('click', e => {
		setNums(e.target.value);
	})
})

ops.forEach(op => {
	op.addEventListener('click', e => {
		if (secondNum !== undefined && isOpClicked) {
			let result = operate(userOp, firstNum, secondNum);
			showResult(result);
			userOp = e.target.value;
		}
		else {
			isOpClicked = true;
			userOp = e.target.value;
			console.log(firstNum, userOp);
		}
	})
})

calc.addEventListener('click', e => {
	if (firstNum !== undefined && secondNum !== undefined && isOpClicked === true) {
		let result = operate(userOp, firstNum, secondNum);
		showResult(result)
	}
})