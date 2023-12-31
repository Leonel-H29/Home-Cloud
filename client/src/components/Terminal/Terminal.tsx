import { useState } from 'react';
import './Terminal.css';
import { TerminalClass } from '../Class/TerminalClass';

const TerminalComponent = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');

  const IShell = new TerminalClass();

  const handleCommand = async () => {
    try {
      const data = IShell.Command(command);
      //console.log('Response: ', response);
      console.log('Data: ', await data);
      setOutput(await data);
      if (command == 'cd') {
        IShell.setLocation(await data);
      }
    } catch (error) {
      console.error('Error executing command:', error);
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal">
        <div className="terminal-header">Terminal</div>
        <div className="terminal-body">
          <div className="input-line">
            {IShell.GetLocation()}
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
          <pre className="output">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default TerminalComponent;
