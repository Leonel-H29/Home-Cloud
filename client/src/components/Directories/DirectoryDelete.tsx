import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ModalSelectProps } from '../Interfaces/IModal';
import { DirectoryClass } from '../Class/DirectoryClass';
import { useCustomSwalTopEnd } from '../../hooks/useSwal';

const DirectoryDelete: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const IDir = new DirectoryClass();
  const showAlert = useCustomSwalTopEnd();

  const handleDirectoryDelete = async () => {
    if (!show || !selected || !location) {
      console.error('Missing data');
      return;
    }
    try {
      const queryString = `${selected}/?location=${location}`;

      const response = await IDir.DeleteDirectory(queryString);

      if (response.status == 200) {
        showAlert({
          icon: 'success',
          title: `The directory deleted successfully!`,
        });
      }
    } catch (error) {
      showAlert({
        icon: 'error',
        title: `Error deleting directory!`,
      });
      console.error('Error deleting directory!: ', error);
    } finally {
      handleClose(false);
      updateList(location);
    }
  };

  return (
    <>
      <Modal.Body>
        Do you want to delete the directory `{location}/{selected}`?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDirectoryDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </>
  );
};

export default DirectoryDelete;
