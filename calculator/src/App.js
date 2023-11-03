import { useEffect, useState } from 'react';
import './App.css';
import CalcButton from './components/calc-button';
import {IsNumeric} from './utils/utils';
import { GetLastSymbol, GetSymbolCount } from './utils/text-utils';
import { CalculateNumeric } from './utils/arithmetic';

function App() {
  const [currentNumeric, setCurrentNumeric] = useState("√((34%5+5))")
  const [currentSymbol, setCurrentSymbol] = useState()

  useEffect(() => {
    if (!currentSymbol) {
      return
    }
    if (currentSymbol === "=") {
      if (currentNumeric && GetSymbolCount(currentNumeric, "(") === GetSymbolCount(currentNumeric, ")")) {
        let lastSymbol = GetLastSymbol(currentNumeric)
        if (IsNumeric(lastSymbol) || lastSymbol === ")") {
          CalculateNumeric(currentNumeric)
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
      } else if (!IsNumeric(GetLastSymbol(currentNumeric)) && GetLastSymbol(currentNumeric) !== ")" && GetLastSymbol(currentNumeric) !== ".") {
        setCurrentNumeric(currentNumeric + currentSymbol)
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
        setCurrentNumeric(currentNumeric.slice(0, -1))
      } else {
        setCurrentNumeric(undefined)
      }
    } else if (currentSymbol === "sin" || currentSymbol === "cos" || currentSymbol === "tan" 
    || currentSymbol === "ctg" || currentSymbol === "ln" || currentSymbol === "log" || currentSymbol === "√") {
      if (currentNumeric) {
        let lastSymbol = GetLastSymbol(currentNumeric)
        if (!IsNumeric(lastSymbol) && lastSymbol !== ")" && lastSymbol !== ".") {
          setCurrentNumeric(currentNumeric + currentSymbol + "(")
        }
      } else {
        setCurrentNumeric(currentSymbol + "(")
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
      let lastSymbol = GetLastSymbol(currentNumeric)
      if (lastSymbol === ")") {
        setCurrentNumeric(currentNumeric ? (currentNumeric + "*" + currentSymbol) : currentSymbol)
      } else {
        setCurrentNumeric(currentNumeric ? currentNumeric + currentSymbol : currentSymbol)
      }
    }
    
    setCurrentSymbol(undefined)
  }, [currentSymbol, setCurrentNumeric, currentNumeric])


  return (
    <div className=" h-[100dvh] flex items-center justify-center">
      <div className='grid grid-cols-6 gap-2 p-4 rounded-xl bg-[#16191f]'>
        <div className='col-span-6 text-3xl max-w-[280px] overflow-x-scroll rounded-lg
        pb-1 pt-2 bg-[#202329] px-2 text-right'>{currentNumeric ?? 0}</div>
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
  );
}

export default App;
