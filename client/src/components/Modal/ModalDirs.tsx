import { ModalProps, ModalSelectProps } from '../Interfaces/IModal';
import DirectoryCreate from '../Directories/DirectoryCreate';
import DirectoryDelete from '../Directories/DirectoryDelete';
import DirectoryRename from '../Directories/DirectoryRename';
import DirectoryMove from '../Directories/DirectoryMove';
import DirectoryDownload from '../Directories/DirectoryDownload';

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
export const ModalDirsMove: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => (
  <>
    <DirectoryMove
      show={show}
      handleClose={handleClose}
      selected={selected}
      location={location}
      updateList={updateList}
    />
  </>
);

export const ModalDirsRename: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => (
  <>
    <DirectoryRename
      show={show}
      handleClose={handleClose}
      selected={selected}
      location={location}
      updateList={updateList}
    />
  </>
);

export const ModalDirsDownload: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => (
  <>
    <DirectoryDownload
      show={show}
      selected={selected}
      handleClose={handleClose}
      location={location}
      updateList={updateList}
    />
  </>
);
