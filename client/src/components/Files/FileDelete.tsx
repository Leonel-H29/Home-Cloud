import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ModalSelectProps } from '../Interfaces/IModal';
import { FileClass } from '../Class/FileClass';
import { toast } from 'sonner';

const FileDelete: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const IFile = new FileClass();

  const handleFileDelete = async () => {
    if (!show || !selected || !location) {
      console.error('Missing data');
      return;
    }

    const queryString = `${selected}?location=${location}`;

    toast.promise(IFile.DeleteFile(queryString), {
      success: `The file '${selected}' deleted successfully!`,
      error: `Error deleting file!`,
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
        Do you want to delete the file `{location}/{selected}`?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
        <Button variant="danger" onClick={handleFileDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </>
  );
};

export default FileDelete;
