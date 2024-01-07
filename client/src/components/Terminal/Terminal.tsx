import { useState, useRef, useEffect } from 'react';
import './Terminal.css';
import { TerminalClass } from '../Class/TerminalClass';
import React from 'react';
import { useLocationServer } from '../../hooks/useLocation';

const TerminalComponent = () => {
  const [commands, setCommands] = useState<string[]>([]); // Store all commands
  const [output, setOutput] = useState<string[]>([]); // Store all outputs
  const [listLocations, setListLocations] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null); // Reference to command input

  const IShell = new TerminalClass();

  const { location, setLocation } = useLocationServer();

  useEffect(() => {
    inputRef.current?.focus(); // Automatically focus input on startup
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await IShell.Command('pwd');
        const currentLocation = data.location;

        if (currentLocation) {
          setLocation(currentLocation);
        }
        setListLocations([...listLocations, location]);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCommand = async (command: string) => {
    try {
      if (command === 'clear') {
        setOutput([]);
        setCommands([]);
        return;
      }

      const data = await IShell.Command(command);
      if (data.error) {
        setOutput((prevOutput) => [...prevOutput, `Error: ${data.error}`]);
      } else {
        setOutput((prevOutput) => [...prevOutput, data.output]);
        setCommands((prevCommands) => [...prevCommands, command]);
        setLocation(data.location || location);
        setListLocations((prevLocation) => [...prevLocation, location]);
      }

      inputRef.current?.focus();
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
                  <span className="green-text">:{listLocations[index]}$</span>
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
            <span className="green-text">:{location}$</span>
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
