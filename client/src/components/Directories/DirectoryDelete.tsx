import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ModalSelectProps } from '../Interfaces/IModal';
import { DirectoryClass } from '../Class/DirectoryClass';
import { toast } from 'sonner';

const DirectoryDelete: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const IDir = new DirectoryClass();

  const handleDirectoryDelete = async () => {
    if (!show || !selected || !location) {
      console.error('Missing data');
      return;
    }

    const queryString = `${selected}/?location=${location}`;

    toast.promise(IDir.DeleteDirectory(queryString), {
      success: `The directory '${selected}' deleted successfully!`,
      error: `Error deleting directory!`,
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
        Do you want to delete the directory `{location}/{selected}`?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDirectoryDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </>
  );
};

export default DirectoryDelete;
