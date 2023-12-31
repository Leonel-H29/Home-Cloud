import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FileClass } from '../Class/FileClass';
//const UrlAPI = import.meta.env.VITE_BACKEND_URL + 'file';

interface CreateFileModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  createLocation: string;
  updateList: (location: string) => void;
}

const FileCreate: React.FC<CreateFileModalProps> = ({
  showModal,
  setShowModal,
  createLocation,
  updateList,
}) => {
  const [fileName, setFileName] = useState('');
  const [fileExtension, setFileExtension] = useState('');

  const IFile = new FileClass();

  const handleFileCreation = async () => {
    if (!showModal || !fileName || !fileExtension || !createLocation) {
      console.error('Missing data');
      return;
    }
    try {
      IFile.CreateFile(createLocation, fileName, fileExtension);
      setShowModal(false);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `The file created successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Error creating file!`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error('Error creating file!: ', error);
    } finally {
      //setShowModal(false);
      updateList(createLocation);
    }
  };

  return (
    <>
      <Modal.Body>
        <Form>
          <Form.Group controlId="fileName">
            <Form.Label>File Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="fileExtension">
            <Form.Label>File Extension</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter file extension"
              value={fileExtension}
              onChange={(e) => setFileExtension(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleFileCreation}>
          Create
        </Button>
      </Modal.Footer>
    </>
  );
};

export default FileCreate;
