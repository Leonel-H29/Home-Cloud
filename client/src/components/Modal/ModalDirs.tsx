import { ModalProps } from '../Interfaces/IModal';
import DirectoryCreate from '../Directories/DirectoryCreate';

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
