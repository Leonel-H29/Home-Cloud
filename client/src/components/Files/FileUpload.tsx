import React, { useState, ChangeEvent } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FileClass } from '../Class/FileClass';
import { ModalProps } from '../Interfaces/IModal';

const FileUpload: React.FC<ModalProps> = ({
  show,
  handleClose,
  location,
  updateList,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const IFile = new FileClass();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleFileUpload = async () => {
    if (!location && files.length == 0 && !show) {
      console.error('Missing data');
      return;
    }
    files.forEach(async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        IFile.UploadFile(location, formData);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `The file ${file.name} uploaded successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Error uploading ${file.name} file`,
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        handleClose(false);
        updateList(location);
      }
    });
  };

  return (
    <div>
      <Modal.Body>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Select at least a file</Form.Label>
          <Form.Control
            type="file"
            size="sm"
            onChange={handleFileChange}
            multiple
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleFileUpload}>
          Save
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default FileUpload;
