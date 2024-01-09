import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FileClass } from '../Class/FileClass';
import { ModalSelectProps } from '../Interfaces/IModal';

const FileMove: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const [newLocation, setNewLocation] = useState('');
  const IFile = new FileClass();

  const handleFileMove = async () => {
    if (!show || !selected || !newLocation || !location) {
      console.error('Missing data');
      return;
    }
    try {
      IFile.RenameOrMoveFile(selected, '', location, newLocation);
      //setShowModal(false);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `The file has been moved successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Error moving file!`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error('Error moving file!: ', error);
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
        <Button variant="primary" onClick={handleFileMove}>
          Move
        </Button>
      </Modal.Footer>
    </>
  );
};

export default FileMove;
