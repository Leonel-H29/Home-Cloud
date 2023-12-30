import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const UrlAPI = import.meta.env.VITE_BACKEND_URL + 'file';

interface DeleteFileModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  file: string;
  location: string;
  updateList: (location: string) => void;
}

const FileDelete: React.FC<DeleteFileModalProps> = ({
  showModal,
  setShowModal,
  file,
  location,
  updateList,
}) => {
  const handleFileDelete = async () => {
    if (!showModal || !file || !location) {
      console.error('Missing data');
      return;
    }
    try {
      const queryString = `${file}?location=${location}`;
      await axios.delete(UrlAPI + `/delete/${queryString}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: false,
      });

      //alert(`Archivo creado correctamente.`);
      setShowModal(false);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `The file deleted successfully!`,
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
      console.error('Error deleting file!: ', error);
    } finally {
      //setShowModal(false);
      updateList(location);
    }
  };

  return (
    <>
      <Modal.Body>
        Do you want to delete the file `{location}/{file}`?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
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