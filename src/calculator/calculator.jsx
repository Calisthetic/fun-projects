import { useEffect, useState } from "react"
import { GetLastSymbol, GetSymbolCount, IsNumeric } from "../utils/utils"
import CalcButton from './calc-button';
import { CalculateNumeric } from './arithmetic';
import "./styles.css"

export default function Calculator(params) {
  const [currentNumeric, setCurrentNumeric] = useState()
  const [lastNumeric, setlastNumeric] = useState()
  const [currentSymbol, setCurrentSymbol] = useState()

  useEffect(() => {
    if (!currentSymbol) {
      return
    }
    if (currentNumeric && currentNumeric.length === 0) {
      setCurrentNumeric(undefined)
    }
    if (currentSymbol === "=") {
      if (currentNumeric && GetSymbolCount(currentNumeric, "(") === GetSymbolCount(currentNumeric, ")")) {
        let lastSymbol = GetLastSymbol(currentNumeric)
        if (IsNumeric(lastSymbol) || lastSymbol === ")" || lastSymbol === "!") {
          setlastNumeric(currentNumeric)
          setCurrentNumeric(CalculateNumeric(currentNumeric))
        }
      }
    } else if (currentSymbol === "+" || currentSymbol === "/" || currentSymbol === "*" 
    || currentSymbol === "%" || currentSymbol === "!" || currentSymbol === "^") {
      if (currentNumeric) {
        let lastSymbol = GetLastSymbol(currentNumeric)
        if (IsNumeric(lastSymbol) || lastSymbol === ")" || (lastSymbol === "!" && currentSymbol !== "!")) {
          setCurrentNumeric(currentNumeric + currentSymbol)
        }
      }
    } else if (currentSymbol === "-") {
      if (!currentNumeric) {
        setCurrentNumeric(currentSymbol)
      } else if (GetLastSymbol(currentNumeric) !== "-" && GetLastSymbol(currentNumeric) !== ".") {
        setCurrentNumeric(currentNumeric + currentSymbol)
      }
    } else if (currentSymbol === "(") {
      if (!currentNumeric) {
        setCurrentNumeric(currentSymbol)
      } else {
        let passedLogSymbols = 0
        for (let i = currentNumeric.length - 1; i > -1; i--) {
          if (IsNumeric(currentNumeric[i])) {
            continue
          } else if("log".includes(currentNumeric[i])) {
            passedLogSymbols++
            if (passedLogSymbols === 3) {
              setCurrentNumeric(currentNumeric + currentSymbol)
              setCurrentSymbol(undefined)
              return
            }
          } else {
            break
          }
        }
        let lastSymbol = GetLastSymbol(currentNumeric)
        if (IsNumeric(lastSymbol)) {
          setCurrentNumeric(currentNumeric + "*" + currentSymbol)
        } else if (lastSymbol !== ")" && lastSymbol !== ".") {
          setCurrentNumeric(currentNumeric + currentSymbol)
        }
      }
    } else if (currentSymbol === ")") {
      let lastSymbol = GetLastSymbol(currentNumeric)
      if (currentNumeric && currentNumeric.length > 0 && lastSymbol !== "." && lastSymbol !== "(" 
      && GetSymbolCount(currentNumeric, "(") > GetSymbolCount(currentNumeric, ")")) {
        setCurrentNumeric(currentNumeric + currentSymbol)
      }
    } else if (currentSymbol === "C") {
      setCurrentNumeric(null)
    } else if (currentSymbol === "del") {
      if (currentNumeric && currentNumeric.length > 1) {
        if (currentNumeric.length > 1) {
          let lastSymbols = currentNumeric.slice(-2)
          if (lastSymbols === "√(") {
            setCurrentNumeric(currentNumeric.slice(0, -3))
            setCurrentSymbol(undefined)
            return
          }
        }
        if (currentNumeric.length > 2) {
          let lastSymbols = currentNumeric.slice(-3)
          if (lastSymbols === "ln(") {
            setCurrentNumeric(currentNumeric.slice(0, -3))
            setCurrentSymbol(undefined)
            return
          } else if (lastSymbols === "log") {
            setCurrentNumeric(currentNumeric.slice(0, -3))
            setCurrentSymbol(undefined)
            return
          }
        }
        if (currentNumeric.length > 3) {
          let lastSymbols = currentNumeric.slice(-4)
          if (lastSymbols === "sin(") {
            setCurrentNumeric(currentNumeric.slice(0, -3))
            setCurrentSymbol(undefined)
            return
          } else if (lastSymbols === "cos(") {
            setCurrentNumeric(currentNumeric.slice(0, -3))
            setCurrentSymbol(undefined)
            return
          } else if (lastSymbols === "tag(") {
            setCurrentNumeric(currentNumeric.slice(0, -3))
            setCurrentSymbol(undefined)
            return
          } else if (lastSymbols === "asn(") {
            setCurrentNumeric(currentNumeric.slice(0, -3))
            setCurrentSymbol(undefined)
            return
          }
        }
        setCurrentNumeric(currentNumeric.slice(0, -1))
      } else {
        setCurrentNumeric(undefined)
      }
    } else if (currentSymbol === "sin" || currentSymbol === "cos" || currentSymbol === "tan" 
    || currentSymbol === "ctg" || currentSymbol === "ln" || currentSymbol === "log" || currentSymbol === "√") {
      if (currentNumeric) {
        let lastSymbol = GetLastSymbol(currentNumeric)
        if (!IsNumeric(lastSymbol) && lastSymbol !== ")" && lastSymbol !== ".") {
          setCurrentNumeric(currentSymbol === "log" ? currentSymbol + "2(" : currentSymbol + "(")
        }
      } else {
        setCurrentNumeric(currentSymbol === "log" ? currentSymbol + "2(" : currentSymbol + "(")
      }
    } else if (currentSymbol === ".") {
      if (currentNumeric && currentNumeric.length > 0) {
        let lastSymbol = GetLastSymbol(currentNumeric)
        if (IsNumeric(lastSymbol)) {
          for (let i = currentNumeric.length - 1; i >= 0; i--) {
            if (IsNumeric(currentNumeric[i])) {
              continue
            } else if (currentNumeric[i] === ".") {
              break;
            } else {
              setCurrentNumeric(currentNumeric + currentSymbol)
            }
          }
        }
      }
    } else if (IsNumeric(currentSymbol)) {
      if (!currentNumeric) {
        setCurrentNumeric(currentNumeric ? currentNumeric + currentSymbol : currentSymbol)
      } else {
        let lastSymbol = GetLastSymbol(currentNumeric)
        if (lastSymbol === ")" || lastSymbol === "!") {
          setCurrentNumeric(currentNumeric ? (currentNumeric + "*" + currentSymbol) : currentSymbol)
        } else {
          setCurrentNumeric(currentNumeric ? currentNumeric + currentSymbol : currentSymbol)
        }
      }
    }
    
    setCurrentSymbol(undefined)
  }, [currentSymbol, setCurrentNumeric, currentNumeric])


  return (
    <div className="calculator min-h-[calc(100vh-56px)] flex items-center justify-center">
      <div className='grid grid-cols-6 gap-2 p-4 max-w-[300px] rounded-xl bg-[#16191b]'>
        <div className='col-span-6 text-sm overflow-x-scroll rounded-lg
        text-[#ccc] px-2 text-right whitespace-nowrap'>{lastNumeric ?? "..."}</div>
        <div className='col-span-6 text-3xl overflow-x-scroll rounded-lg
        pb-1 pt-2 bg-[#202329] px-2 text-right whitespace-nowrap'>{currentNumeric ?? 0}</div>
        <CalcButton action={() => setCurrentSymbol("C")} color="bg-[#333640]">C</CalcButton>
        <CalcButton action={() => setCurrentSymbol("!")} color="bg-[#333640]">x!</CalcButton>
        <CalcButton action={() => setCurrentSymbol("(")} color="bg-[#333640]">(</CalcButton>
        <CalcButton action={() => setCurrentSymbol(")")} color="bg-[#333640]">)</CalcButton>
        <CalcButton action={() => setCurrentSymbol("%")} color="bg-[#333640]">%</CalcButton>
        <CalcButton action={() => setCurrentSymbol("del")} color="bg-[#333640]">del</CalcButton>
        <CalcButton action={() => setCurrentSymbol("sin")} color="bg-[#333640]">sin</CalcButton>
        <CalcButton action={() => setCurrentSymbol("ln")} color="bg-[#333640]">ln</CalcButton>
        <CalcButton action={() => setCurrentSymbol("7")}>7</CalcButton>
        <CalcButton action={() => setCurrentSymbol("8")}>8</CalcButton>
        <CalcButton action={() => setCurrentSymbol("9")}>9</CalcButton>
        <CalcButton action={() => setCurrentSymbol("/")} color="bg-[#fb5154]" hoverColor="hover:bg-[#fb6669]">/</CalcButton>
        <CalcButton action={() => setCurrentSymbol("cos")} color="bg-[#333640]">cos</CalcButton>
        <CalcButton action={() => setCurrentSymbol("log")} color="bg-[#333640]">log</CalcButton>
        <CalcButton action={() => setCurrentSymbol("4")}>4</CalcButton>
        <CalcButton action={() => setCurrentSymbol("5")}>5</CalcButton>
        <CalcButton action={() => setCurrentSymbol("6")}>6</CalcButton>
        <CalcButton action={() => setCurrentSymbol("*")} color="bg-[#fb5154]" hoverColor="hover:bg-[#fb6669]">x</CalcButton>
        <CalcButton action={() => setCurrentSymbol("tan")} color="bg-[#333640]">tan</CalcButton>
        <CalcButton action={() => setCurrentSymbol("√")} color="bg-[#333640]">√</CalcButton>
        <CalcButton action={() => setCurrentSymbol("1")}>1</CalcButton>
        <CalcButton action={() => setCurrentSymbol("2")}>2</CalcButton>
        <CalcButton action={() => setCurrentSymbol("3")}>3</CalcButton>
        <CalcButton action={() => setCurrentSymbol("-")} color="bg-[#fb5154]" hoverColor="hover:bg-[#fb6669]">-</CalcButton>
        <CalcButton action={() => setCurrentSymbol("ctg")} color="bg-[#333640]">asn</CalcButton>
        <CalcButton action={() => setCurrentSymbol("^")} color="bg-[#333640]">^</CalcButton>
        <CalcButton action={() => setCurrentSymbol("0")}>0</CalcButton>
        <CalcButton action={() => setCurrentSymbol(".")}>.</CalcButton>
        <CalcButton action={() => setCurrentSymbol("=")} color="bg-[#fb2124]" hoverColor="hover:bg-[#fb4144]">=</CalcButton>
        <CalcButton action={() => setCurrentSymbol("+")} color="bg-[#fb5154]" hoverColor="hover:bg-[#fb6669]">+</CalcButton>
      </div>
    </div>
  )
}