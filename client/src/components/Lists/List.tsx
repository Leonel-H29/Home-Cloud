import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ButtonToolbar, Form, InputGroup, Modal } from 'react-bootstrap';
import FileUpload from '../Files/FileUpload';

const UrlAPI = import.meta.env.VITE_BACKEND_URL + 'list';

const FileList = () => {
  const [location, setLocation] = useState('.');
  const [contents, setContents] = useState([]);
  const [showModalCreateFile, setShowModalCreateFile] = useState(false);

  const listFilesAndDirectories = async () => {
    try {
      const response = await axios.get(`${UrlAPI}?location=${location}`);
      setContents(response.data.contents);
    } catch (error) {
      console.error('Error al obtener archivos y directorios:', error);
    }
  };

  const handleCreateFileClick = () => {
    setShowModalCreateFile(true);
  };

  useEffect(() => {
    listFilesAndDirectories();
  }, []); // El segundo argumento [] significa que este efecto se ejecuta solo al montar el componente

  const handleLocationChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLocation(e.target.value);
  };

  const handleListClick = () => {
    listFilesAndDirectories();
  };

  const BtnDownload = (
    <Button title="Download a File">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-download"
        viewBox="0 0 16 16"
      >
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
      </svg>
    </Button>
  );

  const BtnPlusFile = (
    <Button title="Upload a file" onClick={handleCreateFileClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-file-plus"
        viewBox="0 0 16 16"
      >
        <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z" />
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
      </svg>
    </Button>
  );

  const BtnPlusDirectory = (
    <Button title="Upload a Directory">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-folder-plus"
        viewBox="0 0 16 16"
      >
        <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2Zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672Z" />
        <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5Z" />
      </svg>
    </Button>
  );

  const ModalFileUpload = (
    <Modal
      show={showModalCreateFile}
      onHide={() => setShowModalCreateFile(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Upload a new file</Modal.Title>
      </Modal.Header>
      <FileUpload />
      {/* Aquí puedes agregar un formulario para ingresar el nombre del archivo */}
      {/* <Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowModalCreateFile(false)}
        >
          Cancel
        </Button>
        <Button variant="primary">Save File</Button>
      </Modal.Footer> */}
    </Modal>
  );

  return (
    <>
      <h2>Listado de Archivos y Directorios</h2>
      <ButtonToolbar
        className="justify-content-between"
        aria-label="Toolbar with Button groups"
      >
        <ButtonGroup className="mb-2">
          {BtnPlusFile}
          {BtnPlusDirectory}
          {BtnDownload}
        </ButtonGroup>
        <InputGroup className="mb-2">
          <Form.Control
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={location}
            onChange={handleLocationChange}
          />
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={handleListClick}
          >
            Search
          </Button>
        </InputGroup>
      </ButtonToolbar>

      <Table responsive="lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((item: string, index) => {
            const itemName =
              typeof item === 'string' ? item.split('/').pop() : '';
            const itemType =
              typeof item === 'string' && item.includes('.')
                ? 'Archivo'
                : 'Directorio';
            return (
              <tr key={index}>
                <td>#</td>
                <td>
                  {itemType === 'Directorio' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-folder-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-file-earmark"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                    </svg>
                  )}{' '}
                  {itemName}
                </td>
                <td>{itemType}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {ModalFileUpload}
    </>
  );
};

export default FileList;
