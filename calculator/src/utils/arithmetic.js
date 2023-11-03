import { IsNumeric } from "./utils";

function factorial(n) {
  return (n !== 1) ? n * factorial(n - 1) : 1;
}

function power(n1, n2) {
  var result = 1;
  while(n1--) {
    result *= n2;
  }
  return result;
}

function multiply(n1, n2) {
  return n1 * n2
}

function divide(n1, n2) {
  return n1 / n2
}
function remainder(n1, n2) {
  return n1 % n2
}

function add(n1, n2) {
  return n1 + n2
}

function subtract(n1, n2) {
  return n1 - n2
}


const queue = "^*/%+-"
export function CalculateNumeric(str) {
  console.log(str)
  let bracketIndex = str.lastIndexOf("(")
  if (bracketIndex > -1) {
    let action = null
    let actionIndex = null
    for (let i = bracketIndex; i < str.length; i++) {
      if (!IsNumeric(str[i])) {
        if (str[i] === ".") {
          continue
        } // if factorial without actions
        else if (str[i] === "!" && action === null) {
          return CalculateNumeric(str.slice(0, bracketIndex + 1) 
          + factorial(parseInt(str.slice(bracketIndex + 1, i + 1))) + str.slice(i + 1, str.length))
        } // find action ^*/%+-
        else if (queue.includes(str[i])) {
          if (action === null || queue.indexOf(action) > queue.indexOf(str[i])) {
            action = str[i]
            actionIndex = i
          }
        } // if brackets closed
        else if (str[i] === ")") {
          // Do some action
          if (action) {
            // Get numbers
            let firstNum
            let firstNumIndex
            for (let j = actionIndex - 1; j > 0; j--) {
              if (!IsNumeric(str[j]) && str[j] !== ".") {
                firstNum = parseFloat(str.slice(j+1, actionIndex))
                firstNumIndex = j
                break;
              }
            }
            let secondNum
            let secondNumIndex
            for (let j = actionIndex + 1; j < str.length; j++) {
              if (!IsNumeric(str[j]) && str[j] !== ".") {
                secondNum = parseFloat(str.slice(actionIndex+1, j))
                secondNumIndex = j
                break;
              }
            }
            //console.log(firstNum + " " + secondNum)
            // Do action
            let result = 0
            if (action === "^") {
              result = power(firstNum, secondNum)
            } else if (action === "*") {
              result = multiply(firstNum, secondNum)
            } else if (action === "/") {
              result = divide(firstNum, secondNum)
            } else if (action === "%") {
              result = remainder(firstNum, secondNum)
            } else if (action === "+") {
              result = add(firstNum, secondNum)
            } else if (action === "-") {
              result = subtract(firstNum, secondNum)
            }
            return CalculateNumeric(str.slice(0, firstNumIndex+1) 
            + result + str.slice(secondNumIndex, str.length))
          }
          // if there's no atcion in brackets
          else {
            // first bracket at zero index
            if (bracketIndex === 0) {
              return CalculateNumeric(str.slice(0, bracketIndex) 
              + str.slice(bracketIndex + 1, i) + str.slice(i + 1, str.length))
            }
            if (bracketIndex > 0) {
              let lastSymbol = str.slice(bracketIndex-1, bracketIndex)
              if (lastSymbol === "√") {
                return CalculateNumeric(str.slice(0, bracketIndex - 1) 
                + Math.sqrt(parseInt(str.slice(bracketIndex + 1, i))) + str.slice(i + 1, str.length))
              } // no action before first bracket
              else if (lastSymbol === "(" || queue.includes(lastSymbol)) {
                return CalculateNumeric(str.slice(0, bracketIndex) 
                + str.slice(bracketIndex + 1, i) + str.slice(i + 1, str.length))
              } 
            }
          }
        }
      }
    }
  } else {
    return str
  }
}
