import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { ModalSelectProps } from '../Interfaces/IModal';
import { DirectoryClass } from '../Class/DirectoryClass';
import { toast } from 'sonner';

const DirectoryRename: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const [newDirName, setNewDirName] = useState(selected);
  const IDir = new DirectoryClass();
  //const showAlert = useCustomSwalTopEnd();

  const handleDirsRename = async () => {
    if (!show || !newDirName || !selected || !location) {
      console.error('Missing data');
      return;
    }
    toast.promise(
      IDir.RenameOrMoveDirectory(selected, newDirName, location, ''),
      {
        success: `The directory has be rename successfully!`,
        error: `Error renaming directory`,
        finally: () => {
          handleClose(false);
          updateList(location);
        },
        loading: 'Saving changes ...',
      }
    );
    /*
    try {
      const response = await IDir.RenameOrMoveDirectory(
        selected,
        newDirName,
        location,
        ''
      );

      handleClose(false);

      if (response.status == 200) {
        showAlert({
          icon: 'success',
          title: `The directory has be rename successfully!`,
        });
      }
    } catch (error) {
      showAlert({
        icon: 'error',
        title: `Error renaming directory!`,
      });
      console.error('Error renaming directory!: ', error);
    } finally {
      //setShowModal(false);
      updateList(location);
    }
    */
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
