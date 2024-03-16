import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FileClass } from '../Class/FileClass';
import { ModalSelectProps } from '../Interfaces/IModal';
import { toast } from 'sonner';

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

    toast.promise(IFile.RenameOrMoveFile(selected, '', location, newLocation), {
      success: `The file has been moved successfully!`,
      error: `Error moving file!`,
      finally: () => {
        handleClose(false);
        updateList(location);
      },
      loading: 'Saving changes ...',
    });
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
