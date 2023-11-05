//import React from 'react';
import axios from 'axios';

const FileDownload = () => {
  const handleFileDownload = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8082/download/example.txt',
        {
          responseType: 'blob',
          withCredentials: false,
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'example.txt');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div>
      <h2>Download a File</h2>
      <button onClick={handleFileDownload}>Download</button>
    </div>
  );
};

export default FileDownload;
