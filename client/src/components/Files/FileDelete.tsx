import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ModalSelectProps } from '../Interfaces/IModal';
import { FileClass } from '../Class/FileClass';
import { useCustomSwalTopEnd } from '../../hooks/useSwal';

const FileDelete: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const IFile = new FileClass();
  const showAlert = useCustomSwalTopEnd();

  const handleFileDelete = async () => {
    if (!show || !selected || !location) {
      console.error('Missing data');
      return;
    }
    try {
      const queryString = `${selected}?location=${location}`;
      IFile.DeleteFile(queryString);
      handleClose(false);
      showAlert({
        icon: 'success',
        title: `The file deleted successfully!`,
      });
    } catch (error) {
      showAlert({
        icon: 'error',
        title: `Error deleting file!`,
      });
      console.error('Error deleting file!: ', error);
    } finally {
      //setShowModal(false);
      updateList(location);
    }
  };

  return (
    <>
      <Modal.Body>
        Do you want to delete the file `{location}/{selected}`?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
        <Button variant="danger" onClick={handleFileDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </>
  );
};

export default FileDelete;
