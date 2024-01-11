import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FileClass } from '../Class/FileClass';
import { ModalSelectProps } from '../Interfaces/IModal';
import { useCustomSwalTopEnd } from '../../hooks/useSwal';

const FileRename: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const [newfileName, setNewFileName] = useState(selected);
  const IFile = new FileClass();
  const showAlert = useCustomSwalTopEnd();

  const handleFileRename = async () => {
    if (!show || !newfileName || !selected || !location) {
      console.error('Missing data');
      return;
    }
    try {
      const response = await IFile.RenameOrMoveFile(
        selected,
        newfileName,
        location,
        ''
      );

      if (response.status == 200) {
        handleClose(false);
        showAlert({
          icon: 'success',
          title: `The file has be rename successfully!`,
        });
      }
    } catch (error) {
      showAlert({
        icon: 'error',
        title: `Error renaming file!`,
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
        <Button variant="secondary" onClick={() => handleClose(false)}>
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
