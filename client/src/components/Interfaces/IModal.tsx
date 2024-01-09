export interface ModalSelectProps {
  show: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  currentLocation: string;
  updateList: (location: string) => void;
}

export interface ModalProps {
  show: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  currentLocation: string;
  updateList: (location: string) => void;
}
