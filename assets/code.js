const display = document.getElementById('display')
const nums = Array.from(document.getElementsByClassName('num'))
const ops = Array.from(document.getElementsByClassName('op'))
const calc = document.getElementById('calc')
const clrBtn = document.getElementById('ac')

let firstNum
let secondNum
let userOp

let isOpClicked = false

function add(x, y) {
  return Number(x) + Number(y)
}

function subtract(x, y) {
  return Number(x) - Number(y)
}

function multiply(x, y) {
  return Number(x) * Number(y)
}

function divide(x, y) {
  return Number(x) / Number(y)
}

function operate(op, num1, num2) {
  switch (op) {
    case '+':
      return add(num1, num2)
    case '-':
      return subtract(num1, num2)
    case '*':
      return multiply(num1, num2)
    case '/':
      if (Number(num2) === 0) {
        return null
      } else return divide(num1, num2)
  }
}

function clearDisplay() {
  display.value = ''
}

function setFirstNum(num) {
  display.value += num
  firstNum = display.value
  console.log(`first num is ${firstNum}`)
}

function setSecondNum(num) {
  display.value += num
  secondNum = display.value
  console.log(`second num is ${secondNum}`)
}

function setNums(input) {
  if (isOpClicked && (firstNum || firstNum === 0)) {
    if (!secondNum) {
      clearDisplay()
    }
    setSecondNum(input)
  } else {
    setFirstNum(input)
  }
}

function showResult(result) {
  if (userOp === '/' && secondNum === '0') {
    display.value = 'error noticed ☹️'
    setTimeout(clearAllData, 700)
  } else {
    display.value = result
    firstNum = result
    secondNum = ''
  }
}

function getResult(op, x, y) {
  let result = operate(op, x, y)
  if (!Number.isInteger(result) && result) {
    result = Math.round(result * 100) / 100
  }
  showResult(result)
}

function clearAllData() {
  isOpClicked = false
  firstNum = ''
  secondNum = ''
  clearDisplay()
}

nums.forEach((num) => {
  num.addEventListener('click', (e) => {
    setNums(e.target.value)
  })
})

ops.forEach((op) => {
  op.addEventListener('click', (e) => {
    if (secondNum && isOpClicked) {
      getResult(userOp, firstNum, secondNum)
      userOp = e.target.value
    } else {
      isOpClicked = true
      userOp = e.target.value
    }
  })
})

calc.addEventListener('click', (e) => {
  if (secondNum && isOpClicked) {
    getResult(userOp, firstNum, secondNum)
  }
})

clrBtn.addEventListener('click', (e) => {
  clearAllData()
})
