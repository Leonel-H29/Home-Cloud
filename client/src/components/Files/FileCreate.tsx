import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FileClass } from '../Class/FileClass';
import { ModalProps } from '../Interfaces/IModal';
import { useCustomSwalTopEnd } from '../../hooks/useSwal';

const FileCreate: React.FC<ModalProps> = ({
  show,
  handleClose,
  location,
  updateList,
}) => {
  const [fileName, setFileName] = useState('');
  const [fileExtension, setFileExtension] = useState('');
  const showAlert = useCustomSwalTopEnd();

  const IFile = new FileClass();

  const handleFileCreation = async () => {
    if (!show || !fileName || !fileExtension || !location) {
      console.error('Missing data');
      return;
    }
    try {
      IFile.CreateFile(location, fileName, fileExtension);
      handleClose(false);
      showAlert({
        icon: 'success',
        title: `The file created successfully!`,
      });
    } catch (error) {
      showAlert({
        icon: 'error',
        title: `Error creating file!`,
      });
      console.error('Error creating file!: ', error);
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
        <Button variant="secondary" onClick={() => handleClose(false)}>
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
