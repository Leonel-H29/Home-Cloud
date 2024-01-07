import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import getIconForFile from '../../hooks/Icon';
import { useHandlesToActivate } from '../../hooks/useHandles';
import {
  Alert,
  ButtonToolbar,
  Form,
  FormControl,
  InputGroup,
  Spinner,
} from 'react-bootstrap';

import { ServerClass } from '../Class/ServerClass';
import { useLocationServer } from '../../hooks/useLocation';
import { useFilterData } from '../../hooks/useFilterData';
import { useSelected } from '../../hooks/useSelected';
import {
  BtnConfigFile,
  BtnConfigDirectory,
  BtnPlusDirectory,
  BtnPlusFile,
} from '../Buttons/Buttons';
import {
  ModalFileDelete,
  ModalFileMove,
  ModalFileRename,
  ModalFileUpload,
  ModalFileCreate,
  ModalFileDownload,
  ModalDirsCreate,
} from '../Modal/Modal';

interface Item {
  name: string;
  type: string;
  owner: string;
  created: string;
  last_modified: string;
  size: string;
}

const FileListComponent = () => {
  const {
    location,
    locationHistory,
    setLocationHistory,
    updateLocationHistory,
    handleLocationChange,
    defaultLocation,
  } = useLocationServer();

  const [contents, setContents] = useState<Item[]>([]);

  const [showModalCreateFile, setShowModalCreateFile] = useState(false);
  const [showModalUploadFile, setShowModalUploadFile] = useState(false);
  const [showModalRenameFile, setShowModalRenameFile] = useState(false);
  const [showModalMoveFile, setShowModalMoveFile] = useState(false);
  const [showModalDeleteFile, setShowModalDeleteFile] = useState(false);
  const [showModalDownloadFile, setShowModalDownloadFile] = useState(false);

  const [showModalCreateDirs, setShowModalCreateDirs] = useState(false);

  const [currentLocation, setCurrentLocation] = useState<string>(location);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { selected, setSelected, handleSelectedClick } = useSelected();

  const { filter, handleFilterChange } = useFilterData();

  const IServer = new ServerClass();

  useEffect(() => {
    listFilesAndDirectories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listFilesAndDirectories = async (newLocation: string = location) => {
    setLoading(true);
    setError('');

    try {
      const response = IServer.ListFilesAndDirectories(newLocation);
      setContents((await response).data.contents);
      //setLocationHistory([...locationHistory, newLocation]);

      updateLocationHistory(newLocation);
      setCurrentLocation(newLocation);
      console.log('Actual: ', currentLocation);
    } catch (error) {
      setError('Error getting files and directories');
    } finally {
      setLoading(false);
      setSelected([]);
    }
  };

  /* HANDLES */

  const handleDirectoryClick = (newLocation: string) => {
    listFilesAndDirectories(newLocation);
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

  const handleListClick = () => {
    listFilesAndDirectories();
  };

  const filteredContents = contents.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

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
    <Button
      title="Download a File"
      // eslint-disable-next-line react-hooks/rules-of-hooks
      onClick={() => useHandlesToActivate(setShowModalDownloadFile)}
      hidden={selected.length != 1}
    >
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

  const ShowModal = (
    <>
      <ModalFileMove
        show={showModalMoveFile}
        handleClose={setShowModalMoveFile}
        selected={selected[0]}
        currentLocation={currentLocation}
        updateList={listFilesAndDirectories}
      />
      <ModalFileRename
        show={showModalRenameFile}
        handleClose={setShowModalRenameFile}
        selected={selected[0]}
        currentLocation={currentLocation}
        updateList={listFilesAndDirectories}
      />
      <ModalFileDelete
        show={showModalDeleteFile}
        handleClose={setShowModalDeleteFile}
        selected={selected[0]}
        currentLocation={currentLocation}
        updateList={listFilesAndDirectories}
      />
      <ModalFileCreate
        show={showModalCreateFile}
        handleClose={setShowModalCreateFile}
        currentLocation={currentLocation}
        updateList={listFilesAndDirectories}
      />
      <ModalFileUpload
        show={showModalUploadFile}
        handleClose={setShowModalUploadFile}
        currentLocation={currentLocation}
        updateList={listFilesAndDirectories}
      />
      <ModalDirsCreate
        show={showModalCreateDirs}
        handleClose={setShowModalCreateDirs}
        currentLocation={currentLocation}
        updateList={listFilesAndDirectories}
      />
      <ModalFileDownload
        show={showModalDownloadFile}
        handleClose={setShowModalDownloadFile}
        currentLocation={currentLocation}
        selected={selected[0]}
      />
    </>
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

  const FilterInput = (
    <InputGroup className="mb-3" hidden={contents.length == 0}>
      <InputGroup.Text id="inputGroup-sizing-default">Filter</InputGroup.Text>
      <FormControl
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
        value={filter}
        onChange={handleFilterChange}
      />
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
          {filteredContents.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <>
                    <Form.Check
                      type="checkbox"
                      value={selected}
                      onClick={() => handleSelectedClick(item.name)}
                    />
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
                {/* <td>{BtnConfig}</td> */}
                <td>
                  {item.type === 'Directory' ? (
                    <BtnConfigDirectory
                      handleRename={() => setShowModalRenameFile(true)}
                      handleMove={() => setShowModalMoveFile(true)}
                      handleDelete={() => setShowModalDeleteFile(true)}
                      selected={selected}
                    />
                  ) : (
                    <>
                      <BtnConfigFile
                        handleRename={() => setShowModalRenameFile(true)}
                        handleMove={() => setShowModalMoveFile(true)}
                        handleDelete={() => setShowModalDeleteFile(true)}
                        selected={selected}
                      />
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <p>Content: {filteredContents.length} elements</p>
    </div>
  );

  return (
    <>
      <h2>Files & Directories List</h2>
      <br />
      <b>Current location: </b> {currentLocation}
      <br />
      <br />
      <ButtonToolbar
        className="justify-content-between"
        aria-label="Toolbar with Button groups"
      >
        <ButtonGroup className="mb-2">
          {BtnRefresh}
          <BtnPlusFile
            handleUpload={() => setShowModalUploadFile(true)}
            handleCreate={() => setShowModalCreateFile(true)}
          />
          <BtnPlusDirectory
            handleUpload={() => alert('Modal')}
            handleCreate={() => setShowModalCreateDirs(true)}
          />
          {BtnDownload}
        </ButtonGroup>

        {FormSearch}
      </ButtonToolbar>
      <br />
      {FilterInput}
      <br />
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
      {ShowModal}
    </>
  );
};

export default FileListComponent;
