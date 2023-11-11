import { IsNumeric } from "../utils/utils";

function baseLog(n1, n2) {
  return Math.round(Math.log(n2) / Math.log(n1) * 100) / 100;
}

function factorial(n) {
  return (n !== 1) ? n * factorial(n - 1) : 1;
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


const queue = [
  {
    symbol: "^",
    priority: 1
  },
  {
    symbol: "*",
    priority: 2
  },
  {
    symbol: "/",
    priority: 2
  },
  {
    symbol: "%",
    priority: 2
  },
  {
    symbol: "+",
    priority: 3
  },
  {
    symbol: "-",
    priority: 3
  }
]
export function CalculateNumeric(str) {
  console.log(str)
  let bracketIndex = str.lastIndexOf("(")
  let action = null
  let actionIndex = null
  for (let i = bracketIndex > 0 ? bracketIndex : 0; i < str.length; i++) {
    if (!IsNumeric(str[i])) {
      if (str[i] === ".") {
        continue
      } // if factorial
      else if (str[i] === "!") {
        // Get number
        let num
        let numIndex
        for (let j = i - 1; j > -1; j--) {
          if ((!IsNumeric(str[j]) && str[j] !== ".") || j === 0) {
            num = parseFloat(str.slice(j === 0 ? 0 : j+1, i))
            numIndex = j
            break;
          }
        }
        return CalculateNumeric(str.slice(0, numIndex === 0 ? 0 : numIndex + 1) 
        + factorial(num) + str.slice(i + 1, str.length))
      } // find action ^*/%+-
      else if (queue.filter(x => x.symbol === str[i]).length > 0) {
        // eslint-disable-next-line
        if (action === null || queue.filter(x => x.symbol === action)[0].priority > queue.filter(x => x.symbol === str[i])[0].priority) {
          action = str[i]
          actionIndex = i
        }
      } // if brackets closed
      else if (str[i] === ")" || i + 1 === str.length) {
        // Do some action
        if (action) {
          // Get numbers
          let firstNum
          let firstNumIndex
          for (let j = actionIndex - 1; j > -1; j--) {
            if ((!IsNumeric(str[j]) && str[j] !== ".") || j === 0) {
              firstNum = parseFloat(str.slice(j+1, actionIndex))
              firstNumIndex = j
              break;
            }
          }
          let secondNum
          let secondNumIndex
          for (let j = actionIndex + 1; j < str.length; j++) {
            if ((!IsNumeric(str[j]) && str[j] !== ".") || j + 1 === str.length) {
              secondNum = parseFloat(str.slice(actionIndex+1, j))
              secondNumIndex = j
              break;
            }
          }
          // Do action
          let result = 0
          if (action === "^") {
            result = Math.pow(firstNum, secondNum)
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
              + Math.sqrt(parseFloat(str.slice(bracketIndex + 1, i))) + str.slice(i + 1, str.length))
            } // no action before first bracket
            else if (lastSymbol === "(" || queue.filter(x => x.symbol === lastSymbol).length > 0) {
              return CalculateNumeric(str.slice(0, bracketIndex) 
              + str.slice(bracketIndex + 1, i) + str.slice(i + 1, str.length))
            } 
          }
          if (bracketIndex > 1) {
            let lastSymbols = str.slice(bracketIndex-2, bracketIndex)
            if (lastSymbols === "ln") {
              return CalculateNumeric(str.slice(0, bracketIndex - 2) 
              + Math.sqrt(parseFloat(str.slice(bracketIndex + 1, i))) + str.slice(i + 1, str.length))
            }
          }
          if (bracketIndex > 2) {
            let lastSymbols = str.slice(bracketIndex-3, bracketIndex)
            if (lastSymbols === "sin") {
              return CalculateNumeric(str.slice(0, bracketIndex - 3) 
              + Math.sin(parseFloat(str.slice(bracketIndex + 1, i))) + str.slice(i + 1, str.length))
            } else if (lastSymbols === "cos") {
              return CalculateNumeric(str.slice(0, bracketIndex - 3) 
              + Math.cos(parseFloat(str.slice(bracketIndex + 1, i))) + str.slice(i + 1, str.length))
            } else if (lastSymbols === "tan") {
              return CalculateNumeric(str.slice(0, bracketIndex - 3) 
              + Math.tan(parseFloat(str.slice(bracketIndex + 1, i))) + str.slice(i + 1, str.length))
            } else if (lastSymbols === "asn") {
              return CalculateNumeric(str.slice(0, bracketIndex - 3) 
              + Math.asin(parseFloat(str.slice(bracketIndex + 1, i))) + str.slice(i + 1, str.length))
            }
          }
          if (bracketIndex > 3) {
            let passedLogSymbols = 0
            for (let j = bracketIndex - 1; j > -1; j--) {
              if (IsNumeric(str[j])) {
                continue
              } else if("log".includes(str[j])) {
                passedLogSymbols++
                if (passedLogSymbols === 3) {
                  return CalculateNumeric(str.slice(0, j) 
                  + baseLog(parseFloat(str.slice(j + 3, bracketIndex)), parseFloat(str.slice(bracketIndex + 1, i))) 
                  + str.slice(i + 1, str.length))
                }
              } else {
                break
              }
            }
          }
        }
      }
    }
    // end of the string
    else if (i === str.length - 1) {
      if (action) {
        // Get numbers
        let firstNum
        let firstNumIndex
        for (let j = actionIndex - 1; j > -1; j--) {
          if ((!IsNumeric(str[j]) && str[j] !== ".") || j === 0) {
            firstNum = parseFloat(str.slice(j === 0 ? j : j+1, actionIndex))
            firstNumIndex = j
            break;
          }
        }
        let secondNum
        let secondNumIndex
        for (let j = actionIndex + 1; j < str.length; j++) {
          if ((!IsNumeric(str[j]) && str[j] !== ".") || j + 1 === str.length) {
            secondNum = parseFloat(str.slice(actionIndex+1, j + 1 === str.length ? undefined : j))
            secondNumIndex = j
            break;
          }
        }
        // Do action
        let result = 0
        if (action === "^") {
          result = Math.pow(firstNum, secondNum)
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
        return CalculateNumeric(str.slice(0, firstNumIndex === 0 ? firstNumIndex : firstNumIndex+1) 
        + result + str.slice(secondNumIndex + 1 === str.length ? str.length : secondNumIndex, str.length))
      }
      return str
    }
  }
}
