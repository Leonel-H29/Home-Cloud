import { useState, useRef, useEffect } from 'react';
import './Terminal.css';
import { TerminalClass } from '../Class/TerminalClass';
import React from 'react';

const TerminalComponent = () => {
  const [commands, setCommands] = useState<string[]>([]); // Almacena todos los comandos
  const [output, setOutput] = useState<string[]>([]); // Almacena todas las salidas
  const inputRef = useRef<HTMLInputElement>(null); // Referencia al input de comando

  const IShell = new TerminalClass();

  useEffect(() => {
    inputRef.current?.focus(); // Enfocar automáticamente el input al iniciar
  }, []);

  const handleCommand = async (command: string) => {
    try {
      if (command == 'clear') {
        setOutput([]);
        setCommands([]);
        return;
      }
      const data = await IShell.Command(command);
      setOutput((prevOutput) => [...prevOutput, data]); // Agregar la nueva salida debajo de la existente
      setCommands((prevCommands) => [...prevCommands, command]); // Agregar el nuevo comando
      inputRef.current?.focus(); // Enfocar automáticamente el input después de ejecutar el comando
    } catch (error) {
      console.error('Error executing command:', error);
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal">
        <div className="terminal-header">Terminal</div>
        <div className="terminal-body">
          <div className="output-container">
            {' '}
            {output.map((out, index) => (
              <React.Fragment key={index}>
                <div className="input-line">
                  <span className="green-text">:{IShell.GetLocation()}$</span>
                  <input
                    className="command-input"
                    type="text"
                    value={commands[index]}
                    onChange={(e) => {
                      const newCommands = [...commands];
                      newCommands[index] = e.target.value;
                      setCommands(newCommands);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCommand(commands[index]);
                      }
                    }}
                    readOnly
                  />
                </div>
                <pre className="output">{out}</pre>
              </React.Fragment>
            ))}
          </div>
          <div className="input-line">
            <span className="green-text">:{IShell.GetLocation()}$</span>
            <input
              ref={inputRef}
              className="command-input"
              type="text"
              value={commands[output.length] || ''}
              onChange={(e) => {
                const newCommands = [...commands];
                newCommands[output.length] = e.target.value;
                setCommands(newCommands);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCommand(commands[output.length] || '');
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
