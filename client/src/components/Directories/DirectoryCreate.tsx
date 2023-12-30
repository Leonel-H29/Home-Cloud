import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

const UrlAPI = import.meta.env.VITE_BACKEND_URL + 'dirs';

interface DirCreateProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  location: string;
  updateList: (location: string) => void;
}

const DirectoryCreate: React.FC<DirCreateProps> = ({
  showModal,
  setShowModal,
  location,
  updateList,
}) => {
  const [dir_name, setDir] = useState<string>('');

  console.log(UrlAPI);

  const handleDirCreate = async () => {
    if (!location && !dir_name && !showModal) {
      console.error('Missing data');
      return;
    }
    try {
      const queryString = `${dir_name}?location=${location}`;

      await axios.post(`${UrlAPI}/create/${queryString}`, {
        withCredentials: true,
      });
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `The directory ${dir_name} createed successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Error creating ${dir_name} directory`,
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setShowModal(false);
      updateList(location);
    }
  };

  return (
    <>
      <Modal.Body>
        <Form>
          <Form.Group controlId="fileName">
            <Form.Label>Direcory Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter file name"
              value={dir_name}
              onChange={(e) => setDir(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDirCreate}>
          Create
        </Button>
      </Modal.Footer>
    </>
  );
};
export default DirectoryCreate;
