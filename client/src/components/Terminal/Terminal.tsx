import React, { useState } from 'react';
import './Terminal.css';
const TerminalComponent = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');

  const handleCommand = async () => {
    // Lógica para ejecutar comandos
    try {
      // Ejemplo: ejecución de un comando 'ls'
      const response = await fetch('/api/execute-command', {
        method: 'POST',
        body: JSON.stringify({ command }), // Envía el comando al servidor
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setOutput(data.output); // Establece la salida del comando
    } catch (error) {
      console.error('Error executing command:', error);
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal">
        <div className="terminal-header">Terminal</div>
        <div className="terminal-body">
          <pre className="output">{output}</pre>
          <div className="input-line">
            <span className="green-text">$</span>
            <input
              className="command-input"
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCommand();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalComponent;
