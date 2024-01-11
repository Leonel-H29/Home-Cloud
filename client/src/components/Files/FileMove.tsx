import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FileClass } from '../Class/FileClass';
import { ModalSelectProps } from '../Interfaces/IModal';
import { useCustomSwalTopEnd } from '../../hooks/useSwal';

const FileMove: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const [newLocation, setNewLocation] = useState('');
  const IFile = new FileClass();
  const showAlert = useCustomSwalTopEnd();

  const handleFileMove = async () => {
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
        showAlert({
          icon: 'success',
          title: `The file has been moved successfully!`,
        });
      }
    } catch (error) {
      showAlert({
        icon: 'error',
        title: `Error moving file!`,
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
