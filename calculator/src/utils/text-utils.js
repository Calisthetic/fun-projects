export function GetSymbolCount(str, symbol) {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === symbol) {
      result++
    }
  }
  return result
}

export function GetLastSymbol(str) {
  return str.slice(-1, str.length)
}