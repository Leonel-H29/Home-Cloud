import React from 'react';

interface InputTerm {
  index: number;
  location: string;
  listCommands: Array<string>;
  value: string;
  handleCommand: (command: string) => void;
  setCommands: (command: Array<string>) => void;
  readonly: boolean;
}

export const InputTerminalComponent: React.FC<InputTerm> = ({
  index,
  location,
  listCommands,
  value,
  handleCommand,
  setCommands,
  readonly,
}) => {
  return (
    <div className="input-line">
      <span className="green-text">:{location}$</span>
      <input
        className="command-input"
        type="text"
        value={value}
        onChange={(e) => {
          const newCommands = [...listCommands];
          newCommands[index] = e.target.value;
          setCommands(newCommands);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleCommand(value);
          }
        }}
        readOnly={readonly}
      />
    </div>
  );
};
