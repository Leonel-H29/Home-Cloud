export interface BtnConfigProps {
  handleRename: () => void;
  handleMove: () => void;
  handleDownload: () => void;
  handleDelete: () => void;
  selected: string[];
}

export interface BtnMediaProps {
  handlePlay: () => void;
  selected: string[];
  buttonText: string;
}
