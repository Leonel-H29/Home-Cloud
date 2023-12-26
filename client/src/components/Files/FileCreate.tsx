import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const UrlAPI = import.meta.env.VITE_BACKEND_URL + 'file';

interface CreateFileModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  createLocation: string;
}

const FileCreate: React.FC<CreateFileModalProps> = ({
  showModal,
  setShowModal,
  createLocation,
}) => {
  const [fileName, setFileName] = useState('');
  const [fileExtension, setFileExtension] = useState('');

  const handleFileCreation = async () => {
    if (!showModal || !fileName || !fileExtension || !createLocation) {
      console.error('Missing data');
      return;
    }
    try {
      const queryString = `?location=${createLocation}&name=${fileName}&extension=${fileExtension}`;
      await axios.post(UrlAPI + `/create${queryString}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: false,
      });

      alert(`Archivo creado correctamente.`);
      setShowModal(false);
    } catch (error) {
      console.error('Error al crear el archivo:', error);
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
