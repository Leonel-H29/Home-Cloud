import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const UrlAPI = import.meta.env.VITE_BACKEND_URL + 'file';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  console.log(UrlAPI);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        await axios.post(UrlAPI + '/upload', formData, {
          withCredentials: false,
        });

        alert('File uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div>
      <Modal.Body>
        {/* Aquí puedes agregar un formulario para ingresar el nombre del archivo */}
        <input type="file" onChange={handleFileChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary" onClick={handleFileUpload}>
          Save File
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default FileUpload;
