export interface ModalSelectProps {
  show: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  location: string;
  updateList: (location: string) => void;
}

export interface ModalProps {
  show: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  location: string;
  updateList: (location: string) => void;
}

export interface ModalShowContentsProps {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  location: string;
  selected: string;
}
