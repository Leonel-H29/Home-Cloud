import React, { useState, ChangeEvent } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FileClass } from '../Class/FileClass';

interface FileUploadProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  location: string;
  updateList: (location: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  showModal,
  setShowModal,
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
    if (!location && files.length == 0 && !showModal) {
      console.error('Missing data');
      return;
    }
    files.forEach(async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        IFile.UploadFile(location, formData);
        //alert(`The file ${file.name} uploaded successfully!`);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `The file ${file.name} uploaded successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        //setToastMessage('Error uploading files.');
        //alert('Error uploading file.');
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `Error uploading ${file.name} file`,
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        setShowModal(false);
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
        <Button variant="secondary" onClick={() => setShowModal(false)}>
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
