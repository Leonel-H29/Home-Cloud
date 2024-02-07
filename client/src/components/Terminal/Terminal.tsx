import { useState, useRef, useEffect } from 'react';
import './Terminal.css';
import { TerminalClass } from '../Class/TerminalClass';
import React from 'react';
import { useLocationServer } from '../../hooks/useLocation';
import { InputTerminalComponent } from './Input';

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
                <InputTerminalComponent
                  index={index}
                  location={listLocations[index]}
                  listCommands={commands}
                  value={commands[index]}
                  handleCommand={handleCommand}
                  setCommands={setCommands}
                  readonly={true}
                />
                <pre className="output">{out}</pre>
              </React.Fragment>
            ))}
          </div>
          <InputTerminalComponent
            index={output.length}
            location={location}
            listCommands={commands}
            value={commands[output.length] || ''}
            handleCommand={handleCommand}
            setCommands={setCommands}
            readonly={false}
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalComponent;
