import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FileClass } from '../Class/FileClass';

interface RenameFileModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  file: string;
  location: string;
  updateList: (location: string) => void;
}

const FileRename: React.FC<RenameFileModalProps> = ({
  showModal,
  setShowModal,
  file,
  location,
  updateList,
}) => {
  const [newfileName, setNewFileName] = useState(file);
  const IFile = new FileClass();

  const handleFileRename = async () => {
    if (!showModal || !newfileName || !file || !location) {
      console.error('Missing data');
      return;
    }
    try {
      IFile.RenameOrMoveFile(file, newfileName, location, '');

      //alert(`Archivo creado correctamente.`);
      setShowModal(false);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `The file has be rename successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Error renaming file!`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error('Error renaming file!: ', error);
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
            <Form.Label>New File Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter file name"
              value={newfileName}
              onChange={(e) => setNewFileName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleFileRename}>
          Create
        </Button>
      </Modal.Footer>
    </>
  );
};

export default FileRename;
