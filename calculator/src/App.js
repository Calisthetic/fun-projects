import { useEffect, useRef, useState } from 'react';
import './App.css';
import CalcButton from './components/calc-button';

function App() {
  const textFieldRef = useRef()
  const [currentNumeric, setCurrentNumeric] = useState()
  const [currentSymbol, setCurrentSymbol] = useState()

  useEffect(() => {
    if (currentSymbol === "=") {
      CalculateNumeric()
    } else if (currentSymbol === "C") {
      setCurrentNumeric("")
    } else if (currentSymbol === "del") {
      setCurrentNumeric(currentNumeric.slice(0, -1))
    } else if (currentSymbol === "sin" || currentSymbol === "cos") {
      setCurrentNumeric(currentNumeric + currentSymbol + "(")
    }
  }, [currentSymbol])

  function CalculateNumeric() {

  }


  return (
    <div className=" h-[100dvh] flex items-center justify-center">
      <div className='grid grid-cols-6'>
        <div ref={textFieldRef} className='col-span-6 text-3xl'></div>
        <CalcButton action={() => setCurrentSymbol("C")}>C</CalcButton>
        <CalcButton action={() => setCurrentSymbol("x!")}>x!</CalcButton>
        <CalcButton action={() => setCurrentSymbol("(")}>(</CalcButton>
        <CalcButton action={() => setCurrentSymbol(")")}>)</CalcButton>
        <CalcButton action={() => setCurrentSymbol("%")}>%</CalcButton>
        <CalcButton action={() => setCurrentSymbol("del")}>del</CalcButton>
        <CalcButton action={() => setCurrentSymbol("sin")}>sin</CalcButton>
        <CalcButton action={() => setCurrentSymbol("ln")}>ln</CalcButton>
        <CalcButton action={() => setCurrentSymbol("7")}>7</CalcButton>
        <CalcButton action={() => setCurrentSymbol("8")}>8</CalcButton>
        <CalcButton action={() => setCurrentSymbol("9")}>9</CalcButton>
        <CalcButton action={() => setCurrentSymbol("/")}>/</CalcButton>
        <CalcButton action={() => setCurrentSymbol("cos")}>cos</CalcButton>
        <CalcButton action={() => setCurrentSymbol("log")}>log</CalcButton>
        <CalcButton action={() => setCurrentSymbol("4")}>4</CalcButton>
        <CalcButton action={() => setCurrentSymbol("5")}>5</CalcButton>
        <CalcButton action={() => setCurrentSymbol("6")}>6</CalcButton>
        <CalcButton action={() => setCurrentSymbol("x")}>x</CalcButton>
        <CalcButton action={() => setCurrentSymbol("tan")}>tan</CalcButton>
        <CalcButton action={() => setCurrentSymbol("sqr")}>√</CalcButton>
        <CalcButton action={() => setCurrentSymbol("1")}>1</CalcButton>
        <CalcButton action={() => setCurrentSymbol("2")}>2</CalcButton>
        <CalcButton action={() => setCurrentSymbol("3")}>3</CalcButton>
        <CalcButton action={() => setCurrentSymbol("-")}>-</CalcButton>
        <CalcButton action={() => setCurrentSymbol("asn")}>asn</CalcButton>
        <CalcButton action={() => setCurrentSymbol("^")}>^</CalcButton>
        <CalcButton action={() => setCurrentSymbol("0")}>0</CalcButton>
        <CalcButton action={() => setCurrentSymbol(".")}>.</CalcButton>
        <CalcButton action={() => setCurrentSymbol("=")}>=</CalcButton>
        <CalcButton action={() => setCurrentSymbol("+")}>+</CalcButton>
      </div>
    </div>
  );
}

export default App;
