import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [input, setInput] = useState('0');
  const symbols = [
    'c',
    '<-',
    '%',
    '/',
    '7',
    '8',
    '9',
    'X',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '+',
    '.',
    '0',
    '='
  ];

  const handleSymbol = symbol => {
    if (symbol != 'c' && symbol != '<-' && symbol != '=') {
      if (symbol == '.') {
        let temp = input.match(/[\d\.]+|\D+/g);

        if (!temp[temp.length - 1].includes('.')) {
          if (temp.length % 2 != 2) setInput(prev => prev + '0.');
          else setInput(prev => prev + symbol);
        }
      } else {
        let temp = input.match(/[^\d]+|\d+/g);

        if (
          temp[temp.length - 1] == '+' ||
          temp[temp.length - 1] == '-' ||
          temp[temp.length - 1] == 'X' ||
          temp[temp.length - 1] == '/' ||
          temp[temp.length - 1] == '%'
        ) {
          if (
            symbol == '+' ||
            symbol == '-' ||
            symbol == 'X' ||
            symbol == '/' ||
            symbol == '%'
          ) {
            setInput(prev => prev.slice(0, -1));
            setInput(prev => prev + symbol);
          } else {
            setInput(prev => prev + symbol);
          }
        } else {
          setInput(prev => prev + symbol);
        }
      }
    } else if (symbol == 'c') {
      setInput('0');
    } else if (symbol == '<-' && input != '0') {
      setInput(prev => prev.slice(0, -1));
    } else if (symbol == '=') {
      let temp = input.match(/[\d\.]+|\D+/g);

      if (
        temp[temp.length - 1] == '+' ||
        temp[temp.length - 1] == '-' ||
        temp[temp.length - 1] == '/' ||
        temp[temp.length - 1] == 'X'
      ) {
        temp.pop();
      }

      while (temp.includes('%')) {
        const index = temp.indexOf('%');
        const num1 = parseFloat(temp[index - 1]);
        let tempResult = (num1 / 100).toFixed(2).toString();
        temp.splice(index, 1, 'X');
        temp.splice(index - 1, 1, tempResult);
      }

      while (temp.includes('/')) {
        const index = temp.indexOf('/');
        const num1 = parseFloat(temp[index - 1]);
        const num2 = parseFloat(temp[index + 1]);
        const tempResult = (num1 / num2).toFixed(2).toString();
        temp.splice(index, 1);
        temp.splice(index, 1);
        temp.splice(index - 1, 1, tempResult);
      }

      while (temp.includes('X')) {
        const index = temp.indexOf('X');
        const num1 = parseFloat(temp[index - 1]);
        const num2 = parseFloat(temp[index + 1]);
        let tempResult = (num1 * num2).toFixed(2).toString();
        temp.splice(index, 1);
        temp.splice(index, 1);
        temp.splice(index - 1, 1, tempResult);
      }

      while (temp.includes('+')) {
        const index = temp.indexOf('+');
        const num1 = parseFloat(temp[index - 1]);
        const num2 = parseFloat(temp[index + 1]);
        let tempResult = (num1 + num2).toFixed(2).toString();
        temp.splice(index, 1);
        temp.splice(index, 1);
        temp.splice(index - 1, 1, tempResult);
      }

      while (temp.includes('-')) {
        const index = temp.indexOf('-');
        const num1 = parseFloat(temp[index - 1]);
        const num2 = parseFloat(temp[index + 1]);
        let tempResult = (num1 - num2).toFixed(2).toString();
        temp.splice(index, 1);
        temp.splice(index, 1);
        temp.splice(index - 1, 1, tempResult);
      }

      setInput(temp[0]);
    }
  };
  return (
    <div>
      <form>
        <input
          type="text"
          onChange={e => setInput(e.target.value)}
          value={input}
        />
      </form>
      <div>
        {symbols.map((symbol, i) => (
          <button key={i} onClick={() => handleSymbol(symbol)}>
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );
}
