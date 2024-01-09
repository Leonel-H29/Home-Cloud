//import React from 'react';
//import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { FileClass } from '../Class/FileClass';
import Swal from 'sweetalert2';

interface DownloadFileModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  file: string;
  location: string;
  updateList: (location: string) => void;
}

const FileDownload: React.FC<DownloadFileModalProps> = ({
  showModal,
  setShowModal,
  file,
  location,
  updateList,
}) => {
  const IFile = new FileClass();
  const handleFileDownload = async () => {
    if (!showModal || !file || !location) {
      console.error('Missing data');
      return;
    }

    try {
      IFile.DownloadFile(file, location);
      setShowModal(false);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `The file download successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Error deleting file!`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error('Error downloading file!: ', error);
    } finally {
      setShowModal(false);
      updateList(location);
    }
  };

  return (
    <>
      <Modal.Body>
        Do you want to download the file `{location}/{file}`?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="info" onClick={handleFileDownload}>
          Download
        </Button>
      </Modal.Footer>
    </>
  );
};

export default FileDownload;
