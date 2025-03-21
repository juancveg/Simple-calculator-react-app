// src/components/Calculator.js
import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  // Estado para almacenar el valor actual, operador pendiente y valor previo
  const [currentValue, setCurrentValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  // Agrega dígitos al valor actual
  const inputDigit = (digit) => {
    if (waitingForNewValue) {
      setCurrentValue(digit);
      setWaitingForNewValue(false);
    } else {
      setCurrentValue(currentValue === "0" ? digit : currentValue + digit);
    }
  };

  // Agrega el punto decimal
  const inputDecimal = () => {
    if (waitingForNewValue) {
      setCurrentValue("0.");
      setWaitingForNewValue(false);
      return;
    }
    if (!currentValue.includes(".")) {
      setCurrentValue(currentValue + ".");
    }
  };

  // Limpia todos los estados
  const clearAll = () => {
    setCurrentValue("0");
    setOperator(null);
    setPreviousValue(null);
    setWaitingForNewValue(false);
  };

  // Cambia el signo del valor actual
  const toggleSign = () => {
    setCurrentValue((parseFloat(currentValue) * -1).toString());
  };

  // Convierte el valor actual a porcentaje
  const inputPercentage = () => {
    setCurrentValue((parseFloat(currentValue) / 100).toString());
  };

  // Maneja las operaciones aritméticas
  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(currentValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const result = calculate(previousValue, inputValue, operator);
      setPreviousValue(result);
      setCurrentValue(result.toString());
    }

    setOperator(nextOperator);
    setWaitingForNewValue(true);
  };

  // Función para calcular según el operador
  const calculate = (first, second, operator) => {
    switch (operator) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return second === 0 ? "Error" : first / second;
      default:
        return second;
    }
  };

  // Calcula el resultado al presionar "="
  const handleEquals = () => {
    const inputValue = parseFloat(currentValue);
    if (operator && previousValue !== null) {
      const result = calculate(previousValue, inputValue, operator);
      setCurrentValue(result.toString());
      setOperator(null);
      setPreviousValue(null);
      setWaitingForNewValue(true);
    }
  };

  return (
    <div className="calculator">
      <div className="display">{currentValue}</div>
      <div className="keypad">
        <button className="function" onClick={clearAll}>AC</button>
        <button className="function" onClick={toggleSign}>+/-</button>
        <button className="function" onClick={inputPercentage}>%</button>
        <button className="operator" onClick={() => performOperation('/')}>÷</button>

        <button onClick={() => inputDigit("7")}>7</button>
        <button onClick={() => inputDigit("8")}>8</button>
        <button onClick={() => inputDigit("9")}>9</button>
        <button className="operator" onClick={() => performOperation('*')}>×</button>

        <button onClick={() => inputDigit("4")}>4</button>
        <button onClick={() => inputDigit("5")}>5</button>
        <button onClick={() => inputDigit("6")}>6</button>
        <button className="operator" onClick={() => performOperation('-')}>−</button>

        <button onClick={() => inputDigit("1")}>1</button>
        <button onClick={() => inputDigit("2")}>2</button>
        <button onClick={() => inputDigit("3")}>3</button>
        <button className="operator" onClick={() => performOperation('+')}>+</button>

        <button className="zero" onClick={() => inputDigit("0")}>0</button>
        <button onClick={inputDecimal}>.</button>
        <button className="operator" onClick={handleEquals}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
