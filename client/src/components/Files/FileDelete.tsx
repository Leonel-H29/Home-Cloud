import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ModalSelectProps } from '../Interfaces/IModal';
import { FileClass } from '../Class/FileClass';

const FileDelete: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const IFile = new FileClass();

  const handleFileDelete = async () => {
    if (!show || !selected || !location) {
      console.error('Missing data');
      return;
    }
    try {
      const queryString = `${selected}?location=${location}`;
      IFile.DeleteFile(queryString);
      handleClose(false);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `The file deleted successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Error deleting file!`,
        showConfirmButton: false,
        timer: 1500,
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
