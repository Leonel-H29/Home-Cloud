import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FileClass } from '../Class/FileClass';
import { ModalProps } from '../Interfaces/IModal';
import { toast } from 'sonner';

const FileCreate: React.FC<ModalProps> = ({
  show,
  handleClose,
  location,
  updateList,
}) => {
  const [fileName, setFileName] = useState('');
  const [fileExtension, setFileExtension] = useState('');

  const IFile = new FileClass();

  const handleFileCreation = async () => {
    if (!show || !fileName || !fileExtension || !location) {
      console.error('Missing data');
      return;
    }

    toast.promise(IFile.CreateFile(location, fileName, fileExtension), {
      success: `The file '${fileName}.${fileExtension}' created  successfully!`,
      error: `Error creating '${fileName}.${fileExtension}' file`,
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
