import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';

const UrlAPI = import.meta.env.VITE_BACKEND_URL + 'file';

interface FileUploadProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  uploadLocation: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  showModal,
  setShowModal,
  uploadLocation,
}) => {
  //const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  //console.log(UrlAPI);
  //console.log('CURRENT: ', uploadLocation);

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setFile(e.target.files[0]);
  //   }
  // };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  // const handleFileUpload = async () => {
  //   if (uploadLocation && file && showModal) {
  //     try {
  //       const formData = new FormData();

  //       formData.append('file', file);

  //       await axios.post(
  //         UrlAPI + `/upload?location=${uploadLocation}`,
  //         formData,
  //         {
  //           withCredentials: false,
  //         }
  //       );

  //       alert('File uploaded successfully!');
  //       setShowModal(false); // Cerramos el modal después de subir el archivo
  //     } catch (error) {
  //       console.error('Error uploading file:', error);
  //     }
  //   }
  // };

  const handleFileUpload = async () => {
    if (!uploadLocation && files.length == 0 && !showModal) {
      console.error('Missing data');
      return;
    }
    files.forEach(async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      try {
        await axios.post(
          `${UrlAPI}/upload?location=${uploadLocation}`,
          formData
        );

        alert(`The file ${file.name} uploaded successfully!`);
      } catch (error) {
        //setToastMessage('Error uploading files.');
        alert('Error uploading file.');
      } finally {
        setShowModal(false);
      }
    });
  };

  return (
    <div>
      <Modal.Body>
        {/* Aquí puedes agregar un formulario para ingresar el nombre del archivo */}
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
          Save File
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default FileUpload;
