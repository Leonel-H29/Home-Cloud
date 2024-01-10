import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FileClass } from '../Class/FileClass';
import { ModalSelectProps } from '../Interfaces/IModal';

const DirectoryMove: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const [newLocation, setNewLocation] = useState('');
  const IFile = new FileClass();

  const handleDirectoryMove = async () => {
    if (!show || !selected || !newLocation || !location) {
      console.error('Missing data');
      return;
    }
    try {
      const response = await IFile.RenameOrMoveFile(
        selected,
        '',
        location,
        newLocation
      );
      //setShowModal(false);
      if (response.status == 200) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `The directory has been moved successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Error moving directory!`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error('Error moving directory!: ', error);
    } finally {
      updateList(newLocation);
      handleClose(false);
    }
  };

  return (
    <>
      <Modal.Body>
        <Form>
          <Form.Group controlId="newLocation">
            <Form.Label>Select Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter file name"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDirectoryMove}>
          Move
        </Button>
      </Modal.Footer>
    </>
  );
};

export default DirectoryMove;
