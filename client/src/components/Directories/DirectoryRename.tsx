import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { ModalSelectProps } from '../Interfaces/IModal';
import { DirectoryClass } from '../Class/DirectoryClass';

const DirectoryRename: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const [newDirName, setNewDirName] = useState(selected);
  const IDir = new DirectoryClass();

  const handleDirsRename = async () => {
    if (!show || !newDirName || !selected || !location) {
      console.error('Missing data');
      return;
    }
    try {
      IDir.RenameOrMoveDirectory(selected, newDirName, location, '');

      handleClose(false);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `The directory has be rename successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Error renaming directory!`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error('Error renaming directory!: ', error);
    } finally {
      //setShowModal(false);
      updateList(location);
    }
  };

  return (
    <>
      <Modal.Body>
        <Form>
          <Form.Group controlId="fileName">
            <Form.Label>New Directoy Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter file name"
              value={newDirName}
              onChange={(e) => setNewDirName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDirsRename}>
          Save
        </Button>
      </Modal.Footer>
    </>
  );
};

export default DirectoryRename;
