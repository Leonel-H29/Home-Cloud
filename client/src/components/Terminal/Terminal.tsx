import React, { useState } from 'react';
//import './Terminal.css'; // Asegúrate de tener los estilos adecuados para tu terminal

const TerminalComponent = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([]);

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCommand(event.target.value);
  };

  const handleEnterPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      executeCommand();
    }
  };

  const executeCommand = () => {
    const commandArgs = command.split(' '); // Separa el comando y los argumentos
    const cmd = commandArgs[0]; // Extrae el comando
    //const args = commandArgs.slice(1); // Extrae los argumentos

    // Ejecutar el comando (aquí puedes incluir lógica para diferentes comandos)
    switch (cmd) {
      case 'ls':
        // Ejemplo: Simular el comando 'ls'
        setOutput([]);
        break;
      case 'echo':
        // Ejemplo: Simular el comando 'echo'
        setOutput([]);
        break;
      case 'clear':
        // Limpiar la salida
        setOutput([]);
        break;
      default:
        setOutput([]);
    }
    setCommand('');
  };

  return (
    <div className="terminal">
      <h1>Shell</h1>
      <div className="terminal-output">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div className="terminal-input">
        <span>$</span>
        <input
          type="text"
          value={command}
          onChange={handleInputChange}
          onKeyDown={handleEnterPress}
        />
      </div>
    </div>
  );
};

export default TerminalComponent;
