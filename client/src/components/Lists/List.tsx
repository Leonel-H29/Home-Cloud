import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { ButtonToolbar, Form, InputGroup, Modal } from 'react-bootstrap';
import FileUpload from '../Files/FileUpload';

const UrlAPI = import.meta.env.VITE_BACKEND_URL + 'list';

interface Item {
  name: string;
  type: string;
  owner: string;
  created: string;
  last_modified: string;
  size: string;
}

const FileListComponent = () => {
  const [location, setLocation] = useState('./');
  const [contents, setContents] = useState<Item[]>([]);
  const [showModalCreateFile, setShowModalCreateFile] = useState(false);
  const [locationHistory, setLocationHistory] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string>('.');

  const listFilesAndDirectories = async (newLocation: string = location) => {
    try {
      const response = await axios.get(`${UrlAPI}?location=${newLocation}`);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setLocationHistory([...locationHistory, location]);
  }, []); // El segundo argumento [] significa que este efecto se ejecuta solo al montar el componente

  const handleBackClick = () => {
    console.log('Historial: ', locationHistory);
    if (locationHistory.length > 0) {
      const previousLocation = locationHistory.pop();
      console.log('Previo: ', previousLocation);
      console.log('Actual: ', currentLocation);
      if (previousLocation) {
        setCurrentLocation(previousLocation);
        listFilesAndDirectories(previousLocation);
      }
    }
  };

  const handleLocationChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLocation(e.target.value);
    //setCurrentLocation(location);
  };

  const handleListClick = () => {
    listFilesAndDirectories();
    setLocationHistory([...locationHistory, currentLocation]);
    setCurrentLocation(currentLocation);
  };

  const getIconForFile = (fileName: string) => {
    const fileExtension: string = fileName.split('.').pop()?.toLowerCase();
    const defaultExtension = 'bi bi-file-earmark';

    const isImageExtension = /(jpg|jpeg|png|gif)/.test(fileExtension);

    const iconMapping = {
      pdf: 'bi bi-file-earmark-pdf',
      docx: 'bi bi-file-earmark-word',
      mp3: 'bi bi-file-earmark-music',
      mp4: 'bi bi-file-earmark-play',
      xls: 'bi bi-file-earmark-excel',
      txt: 'bi bi-filetype-txt',
      zip: 'bi bi-file-earmark-zip',
      sql: 'bi bi-filetype-sql',
      html: 'bi bi-filetype-html',
      py: 'bi bi-filetype-py',
      '': isImageExtension ? 'bi bi-file-earmark-image' : 'bi bi-file-earmark',
      //png: 'bi bi-file-earmark-image',
      // Agrega más extensiones y sus iconos aquí según sea necesario
    };

    return iconMapping[fileExtension] ?? defaultExtension;
  };

  const BtnBack = (
    <Button
      variant="outline-secondary"
      id="button-addon2"
      onClick={handleBackClick}
      disabled={locationHistory.length <= 1}
    >
      <i className="bi bi-arrow-left"></i> Back
    </Button>
  );

  const BtnDownload = (
    <Button title="Download a File">
      <i className="bi bi-download"></i>
    </Button>
  );

  const BtnPlusFile = (
    <Button title="Upload a file" onClick={handleCreateFileClick}>
      <i className="bi bi-file-earmark-plus"></i>
    </Button>
  );

  const BtnPlusDirectory = (
    <Button title="Upload a Directory">
      <i className="bi bi-folder-plus"></i>
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
      <FileUpload
        showModal={showModalCreateFile}
        setShowModal={setShowModalCreateFile}
      />
    </Modal>
  );

  const FormSearch = (
    <InputGroup className="mb-2">
      {BtnBack}
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
        <i className="bi bi-search"></i> Search
      </Button>
    </InputGroup>
  );

  return (
    <>
      <h2>Files & Directories List</h2>
      <br />
      <b>Current location: </b> {currentLocation}
      <br />
      <ButtonToolbar
        className="justify-content-between"
        aria-label="Toolbar with Button groups"
      >
        <ButtonGroup className="mb-2">
          {BtnPlusFile}
          {BtnPlusDirectory}
          {BtnDownload}
        </ButtonGroup>

        {FormSearch}
      </ButtonToolbar>
      <Table responsive="lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Date Last Updated</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {item.type === 'Directory' ? (
                    <a href={`/${item.name}`}>
                      <i className="bi bi-folder-fill"></i> {item.name}
                    </a>
                  ) : (
                    // <Button
                    //   href="#"
                    //   variant="outline-primary"
                    //   onClick={listFilesAndDirectories(
                    //     `${location}/${item.name}`
                    //   )}
                    // >
                    //   <i className="bi bi-folder-fill"></i> {item.name}
                    // </Button>
                    <>
                      <i className={getIconForFile(item.name)}></i> {item.name}
                    </>
                  )}
                </td>
                <td>{item.type}</td>
                <td>{item.owner}</td>
                <td>{item.created}</td>
                <td>{item.last_modified}</td>
                <td>{item.size}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <p>Content: {contents.length} elements</p>
      {ModalFileUpload}
    </>
  );
};

export default FileListComponent;
