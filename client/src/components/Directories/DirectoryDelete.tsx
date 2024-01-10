import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ModalSelectProps } from '../Interfaces/IModal';
import { DirectoryClass } from '../Class/DirectoryClass';

const DirectoryDelete: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const IDir = new DirectoryClass();

  const handleDirectoryDelete = async () => {
    if (!show || !selected || !location) {
      console.error('Missing data');
      return;
    }
    try {
      const queryString = `${selected}/?location=${location}`;
      //IDir.DeleteDirectory(queryString);

      const response = await IDir.DeleteDirectory(queryString);
      //console.log('Response: ', await IDir.DeleteDirectory(queryString));

      if (response.status == 200) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `The directory deleted successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Error deleting directory!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Error deleting directory!`,
        showConfirmButton: false,
        timer: 1500,
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
