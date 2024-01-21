import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import getIconForFile from '../../hooks/Icon';
import {
  Alert,
  ButtonToolbar,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';

import { ServerClass } from '../Class/ServerClass';
import { useLocationServer } from '../../hooks/useLocation';
import { useFilterData } from '../../hooks/useFilterData';
import { useSelected } from '../../hooks/useSelected';
import BtnConfig, { BtnPlus, BtnMedia } from '../Buttons/Buttons';
import { ModalShow } from '../Modal/ModalMain';
import {
  useModalFileOrDir,
  OperationType,
  SelectType,
} from '../../hooks/useModal';
import { useLoading } from '../../hooks/useLoading';
import { Loading } from '../Loading/Loading';
import { useType } from '../../hooks/useType';

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
  const { showModal, operation, type, handleModal, setShowModal } =
    useModalFileOrDir();
  const [currentLocation, setCurrentLocation] = useState<string>(location);
  const { loading, setLoading } = useLoading();
  const [error, setError] = useState('');
  const { selected, setSelected, handleSelectedClick } = useSelected();
  const { filter, setFilter, handleFilterChange } = useFilterData();
  const { isImageFile, isMediaFile } = useType();

  const IServer = new ServerClass();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyListString = localStorage.getItem('locationHistory');

        if (!historyListString || historyListString === '[]') {
          listFilesAndDirectories();
          return;
        }

        const historyList = JSON.parse(historyListString);

        if (historyList.length == 0) {
          listFilesAndDirectories();
          return;
        }

        const lastLocation = historyList[historyList.length - 1];
        console.log('Last: ', lastLocation);
        listFilesAndDirectories(lastLocation);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listFilesAndDirectories = async (newLocation: string = location) => {
    setLoading(true);
    setFilter('');
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
    setFilter('');
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
    setFilter('');
    listFilesAndDirectories();
  };

  const filteredContents = contents.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.type.toLowerCase().includes(filter.toLowerCase()) ||
      item.owner.toLowerCase().includes(filter.toLowerCase())
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

  const BtnRefresh = (
    <Button
      title="Refresh"
      onClick={() => {
        listFilesAndDirectories(currentLocation);
        setFilter('');
      }}
    >
      <i className="bi bi-arrow-clockwise"></i>
    </Button>
  );

  const ShowModal = (
    <>
      <ModalShow
        show={showModal}
        handleClose={setShowModal}
        selected={selected[0]}
        location={currentLocation}
        updateList={listFilesAndDirectories}
        operation={operation}
        type={type}
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
                      variant="outline-primary"
                      onClick={() =>
                        handleDirectoryClick(`${currentLocation}/${item.name}`)
                      }
                    >
                      <i className="bi bi-folder-fill"></i> {item.name}
                    </Button>
                  ) : (
                    <>
                      {/* <i className={getIconForFile(item.name)}></i> {item.name} */}
                      <i className={getIconForFile(item.name)}></i> {item.name}
                      &nbsp;
                      {isMediaFile(item.name) ? (
                        <BtnMedia
                          handlePlay={() =>
                            handleModal(
                              SelectType.File,
                              OperationType.PlayMedia
                            )
                          }
                          selected={selected}
                          buttonText="Play"
                        />
                      ) : isImageFile(item.name) ? (
                        <BtnMedia
                          handlePlay={() =>
                            handleModal(
                              SelectType.File,
                              OperationType.ViewImage
                            )
                          }
                          selected={selected}
                          buttonText="View"
                        />
                      ) : (
                        <BtnMedia
                          handlePlay={() =>
                            handleModal(
                              SelectType.File,
                              OperationType.ViewDocument
                            )
                          }
                          selected={selected}
                          buttonText="View"
                        />
                      )}
                    </>
                  )}
                </td>

                <td>{item.type}</td>
                <td>{item.owner}</td>
                <td>{item.created}</td>
                <td>{item.last_modified}</td>
                <td>{item.size}</td>
                <td hidden={selected.length == 0}>
                  <BtnConfig
                    handleRename={() =>
                      handleModal(
                        item.type === 'Directory'
                          ? SelectType.Directoy
                          : SelectType.File,
                        OperationType.Rename
                      )
                    }
                    handleMove={() =>
                      handleModal(
                        item.type === 'Directory'
                          ? SelectType.Directoy
                          : SelectType.File,
                        OperationType.Move
                      )
                    }
                    handleDelete={() =>
                      handleModal(
                        item.type === 'Directory'
                          ? SelectType.Directoy
                          : SelectType.File,
                        OperationType.Delete
                      )
                    }
                    handleDownload={() =>
                      handleModal(
                        item.type === 'Directory'
                          ? SelectType.Directoy
                          : SelectType.File,
                        OperationType.Download
                      )
                    }
                    selected={selected}
                  />
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
          <BtnPlus
            handleUpload={() =>
              handleModal(SelectType.File, OperationType.Upload)
            }
            handleCreate={() =>
              handleModal(SelectType.File, OperationType.Create)
            }
            isDirectory={false}
          />
          <BtnPlus
            handleUpload={() => alert('Modal')}
            handleCreate={() =>
              handleModal(SelectType.Directoy, OperationType.Create)
            }
            isDirectory={true}
          />
        </ButtonGroup>

        {FormSearch}
      </ButtonToolbar>
      <br />
      {FilterInput}
      <br />
      {loading && <Loading />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && TableDirsFiles}
      {ShowModal}
    </>
  );
};

export default FileListComponent;
