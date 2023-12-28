import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import getIconForFile from '../../hooks/Icon';

import {
  Alert,
  ButtonToolbar,
  Dropdown,
  Form,
  InputGroup,
  Modal,
  Spinner,
} from 'react-bootstrap';
import FileUpload from '../Files/FileUpload';
import FileCreate from '../Files/FileCreate';

const UrlAPI = import.meta.env.VITE_BACKEND_URL + 'list';

interface Item {
  name: string;
  type: string;
  owner: string;
  created: string;
  last_modified: string;
  size: string;
}

const defaultLocation: string = '/home';

const FileListComponent = () => {
  const [location, setLocation] = useState(defaultLocation);
  const [contents, setContents] = useState<Item[]>([]);
  const [showModalCreateFile, setShowModalCreateFile] = useState(false);
  const [showModalUploadFile, setShowModalUploadFile] = useState(false);
  const [locationHistory, setLocationHistory] = useState<string[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string>(location);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    listFilesAndDirectories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('Local History: ', locationHistory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const updateLocationHistory = (newLocation: string) => {
    const lastLocation = locationHistory[locationHistory.length - 1];
    if (lastLocation !== newLocation) {
      const updatedHistory = [...locationHistory, newLocation];
      setLocationHistory(updatedHistory);
      localStorage.setItem('locationHistory', JSON.stringify(updatedHistory));
    }
  };

  const listFilesAndDirectories = async (newLocation: string = location) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${UrlAPI}?location=${newLocation}`);
      setContents(response.data.contents);
      //setLocationHistory([...locationHistory, newLocation]);
      updateLocationHistory(newLocation);
      setCurrentLocation(newLocation);
      console.log('Actual: ', currentLocation);
    } catch (error) {
      setError('Error getting files and directories');
    } finally {
      setLoading(false);
    }
  };

  /* HANDLES */

  const handleDirectoryClick = (newLocation: string) => {
    listFilesAndDirectories(newLocation);
  };

  const handleCreateFileClick = () => {
    setShowModalCreateFile(true);
  };

  const handleUploadFileClick = () => {
    setShowModalUploadFile(true);
  };

  const handleBackClick = () => {
    if (locationHistory.length == 0) {
      setCurrentLocation(defaultLocation);
      listFilesAndDirectories(defaultLocation);
    }

    locationHistory.pop();
    const previousLocation = locationHistory[locationHistory.length - 1];
    console.log('Previo: ', previousLocation);
    setCurrentLocation(previousLocation);
    listFilesAndDirectories(previousLocation);
    setLocationHistory(locationHistory);
  };

  const handleLocationChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLocation(e.target.value);
  };

  const handleListClick = () => {
    listFilesAndDirectories();
  };

  /* BUTTONS */

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

  const BtnRefresh = (
    <Button
      title="Refresh"
      onClick={() => listFilesAndDirectories(currentLocation)}
    >
      <i className="bi bi-arrow-clockwise"></i>
    </Button>
  );

  const BtnPlusFile = (
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle split id="dropdown-split-basic" title="File options">
        <i className="bi bi-file-earmark-plus"></i>{' '}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={handleUploadFileClick}
          title="Upload a exists file"
        >
          Upload a exists file
        </Dropdown.Item>
        <Dropdown.Item
          href="#"
          title="Create a new file"
          onClick={handleCreateFileClick}
        >
          Create a new file
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const BtnPlusDirectory = (
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle
        split
        id="dropdown-split-basic"
        title="Directories options"
      >
        <i className="bi bi-folder-plus"></i>{' '}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item title="Upload a exists directory">
          Upload a exists directory
        </Dropdown.Item>
        <Dropdown.Item href="#" title="Create a new directory">
          Create a new directory
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const ModalFileUpload = (
    <Modal
      show={showModalUploadFile}
      onHide={() => setShowModalUploadFile(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Upload a new file</Modal.Title>
      </Modal.Header>
      <FileUpload
        showModal={showModalUploadFile}
        setShowModal={setShowModalUploadFile}
        uploadLocation={currentLocation}
        updateList={listFilesAndDirectories}
      />
    </Modal>
  );

  const ModalFileCreate = (
    <Modal
      show={showModalCreateFile}
      onHide={() => setShowModalCreateFile(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Create a new file</Modal.Title>
      </Modal.Header>
      <FileCreate
        showModal={showModalCreateFile}
        setShowModal={setShowModalCreateFile}
        createLocation={currentLocation}
        updateList={listFilesAndDirectories}
      />
    </Modal>
  );

  const BtnConfig = (
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle split id="dropdown-split-basic" title="File options">
        <i className="bi bi-gear"></i>{' '}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          //onClick={handleUploadFileClick}
          title="Rename"
        >
          Remane
        </Dropdown.Item>
        <Dropdown.Item
          //onClick={handleUploadFileClick}
          title="Move"
        >
          Move
        </Dropdown.Item>
        <Dropdown.Item
          //href="#"
          title="Delete"
          //onClick={handleCreateFileClick}
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
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

  const TableDirsFiles = (
    <div
      style={{
        overflowY: contents.length > 10 ? 'scroll' : 'auto',
        maxHeight: '31.25rem',
      }}
    >
      <Table responsive="lg">
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Date Last Updated</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {contents.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <>
                    <Form.Check type="radio" aria-label="radio 1" />
                  </>
                </td>
                <td>{index + 1}</td>
                <td>
                  {item.type === 'Directory' ? (
                    <Button
                      href="#"
                      variant="outline-primary"
                      onClick={() =>
                        handleDirectoryClick(`${currentLocation}/${item.name}`)
                      }
                    >
                      <i className="bi bi-folder-fill"></i> {item.name}
                    </Button>
                  ) : (
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
                <td>{BtnConfig}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <p>Content: {contents.length} elements</p>
    </div>
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
          {BtnRefresh}
          {BtnPlusFile}
          {BtnPlusDirectory}
          {BtnDownload}
        </ButtonGroup>

        {FormSearch}
      </ButtonToolbar>
      {loading && (
        <div className="display-flex">
          <Spinner animation="border" role="status" />
          &nbsp;
          <span className="sr-only">Loading...</span>
          <br />
          <br />
          Wait a seconds
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && TableDirsFiles}
      {ModalFileCreate}
      {ModalFileUpload}
    </>
  );
};

export default FileListComponent;
