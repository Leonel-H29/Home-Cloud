import axios from 'axios';
import React, { useState } from 'react';

const UrlAPI = import.meta.env.VITE_BACKEND_URL + 'dirs';

const DirectoryUpload: React.FC = () => {
  const [dir_name, setDir] = useState<string>('');

  console.log(UrlAPI);

  const handleDirChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDir(value);
  };

  const handleDirUpload = async () => {
    try {
      await axios.post(`${UrlAPI}/upload/${dir_name}`, null, {
        withCredentials: false,
      });
      alert('Directorio creado exitosamente');
    } catch (error) {
      console.error('Error al crear directorio:', error);
    }
  };

  return (
    <div>
      <h2>Upload a Directory</h2>
      <input type="dir_name" onChange={handleDirChange} />
      <button onClick={handleDirUpload}>Upload</button>
    </div>
  );
};
export default DirectoryUpload;
