import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

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
      <h2>Upload a File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
