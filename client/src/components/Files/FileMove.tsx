import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FileClass } from '../Class/FileClass';

interface MoveFileModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  file: string;
  currentLocation: string;
  updateList: (location: string) => void;
}

const FileMove: React.FC<MoveFileModalProps> = ({
  showModal,
  setShowModal,
  file,
  currentLocation,
  updateList,
}) => {
  const [newLocation, setNewLocation] = useState('');
  const IFile = new FileClass();

  const handleFileMove = async () => {
    if (!showModal || !file || !newLocation || !currentLocation) {
      console.error('Missing data');
      return;
    }
    try {
      IFile.RenameOrMoveFile(file, '', currentLocation, newLocation);
      setShowModal(false);
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
        <Button variant="secondary" onClick={() => setShowModal(false)}>
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
