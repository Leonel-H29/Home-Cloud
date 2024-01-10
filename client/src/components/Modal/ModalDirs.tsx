import { ModalProps, ModalSelectProps } from '../Interfaces/IModal';
import DirectoryCreate from '../Directories/DirectoryCreate';
import DirectoryDelete from '../Directories/DirectoryDelete';

export const ModalDirsCreate: React.FC<ModalProps> = ({
  show,
  handleClose,
  location,
  updateList,
}) => (
  <>
    <DirectoryCreate
      show={show}
      handleClose={handleClose}
      location={location}
      updateList={updateList}
    />
  </>
);

export const ModalDirsDelete: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => (
  <>
    <DirectoryDelete
      show={show}
      handleClose={handleClose}
      selected={selected}
      location={location}
      updateList={updateList}
    />
  </>
);
