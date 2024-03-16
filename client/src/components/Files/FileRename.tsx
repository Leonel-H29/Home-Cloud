import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FileClass } from '../Class/FileClass';
import { ModalSelectProps } from '../Interfaces/IModal';
import { toast } from 'sonner';

const FileRename: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const [newfileName, setNewFileName] = useState(selected);
  const IFile = new FileClass();
  // const showAlert = useCustomSwalTopEnd();

  const handleFileRename = async () => {
    if (!show || !newfileName || !selected || !location) {
      console.error('Missing data');
      return;
    }

    toast.promise(IFile.RenameOrMoveFile(selected, newfileName, location, ''), {
      success: `The file has be rename successfully!`,
      error: `Error renaming file`,
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
