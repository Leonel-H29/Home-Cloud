import React, { useState } from 'react';
import { Button, Form, Modal, ModalProps } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { DirectoryClass } from '../Class/DirectoryClass';

const DirectoryCreate: React.FC<ModalProps> = ({
  show,
  handleClose,
  location,
  updateList,
}) => {
  const [dir_name, setDir] = useState<string>('');
  const IDir = new DirectoryClass();

  const handleDirCreate = async () => {
    if (!location && !dir_name && !show) {
      console.error('Missing data');
      return;
    }
    try {
      const queryString = `${dir_name}?location=${location}`;

      IDir.CreateDirectory(queryString);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `The directory ${dir_name} createed successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Error creating ${dir_name} directory`,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      handleClose(false);
      updateList(location);
    }
  };

  return (
    <>
      <Modal.Body>
        <Form>
          <Form.Group controlId="fileName">
            <Form.Label>Direcory Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter file name"
              value={dir_name}
              onChange={(e) => setDir(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDirCreate}>
          Create
        </Button>
      </Modal.Footer>
    </>
  );
};
export default DirectoryCreate;
