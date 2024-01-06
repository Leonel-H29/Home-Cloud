import { Modal } from 'react-bootstrap';
import FileRename from '../Files/FileRename';
import React from 'react';
import FileDelete from '../Files/FileDelete';
import FileMove from '../Files/FileMove';
import FileUpload from '../Files/FileUpload';
import FileCreate from '../Files/FileCreate';
import DirectoryCreate from '../Directories/DirectoryCreate';
import FileDownload from '../Files/FileDownload';

interface MoveFileModalProps {
  show: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  currentLocation: string;
  updateList: (location: string) => void;
}

export const ModalFileRename: React.FC<MoveFileModalProps> = ({
  show,
  handleClose,
  selected,
  currentLocation,
  updateList,
}) => (
  <Modal show={show} onHide={() => handleClose(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Rename file</Modal.Title>
    </Modal.Header>
    <FileRename
      showModal={show}
      setShowModal={handleClose}
      file={selected}
      location={currentLocation}
      updateList={updateList}
    />
  </Modal>
);

export const ModalFileMove: React.FC<MoveFileModalProps> = ({
  show,
  handleClose,
  selected,
  currentLocation,
  updateList,
}) => (
  <Modal show={show} onHide={() => handleClose(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Move file</Modal.Title>
    </Modal.Header>
    <FileMove
      showModal={show}
      setShowModal={handleClose}
      file={selected}
      currentLocation={currentLocation}
      updateList={updateList}
    />
  </Modal>
);

export const ModalFileDelete: React.FC<MoveFileModalProps> = ({
  show,
  handleClose,
  selected,
  currentLocation,
  updateList,
}) => (
  <Modal show={show} onHide={() => handleClose(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Delete file</Modal.Title>
    </Modal.Header>
    <FileDelete
      showModal={show}
      setShowModal={handleClose}
      file={selected}
      location={currentLocation}
      updateList={updateList}
    />
  </Modal>
);

export const ModalFileDownload = ({
  show,
  handleClose,
  currentLocation,
  selected,
}) => (
  <Modal show={show} onHide={() => handleClose(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Download file</Modal.Title>
    </Modal.Header>
    <FileDownload
      showModal={show}
      file={selected}
      setShowModal={handleClose}
      location={currentLocation}
    />
  </Modal>
);

export const ModalFileUpload = ({
  show,
  handleClose,
  currentLocation,
  updateList,
}) => (
  <Modal show={show} onHide={() => handleClose(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Upload a new file</Modal.Title>
    </Modal.Header>
    <FileUpload
      showModal={show}
      setShowModal={handleClose}
      location={currentLocation}
      updateList={updateList}
    />
  </Modal>
);

export const ModalFileCreate = ({
  show,
  handleClose,
  currentLocation,
  updateList,
}) => (
  <Modal show={show} onHide={() => handleClose(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Create a new file</Modal.Title>
    </Modal.Header>
    <FileCreate
      showModal={show}
      setShowModal={handleClose}
      createLocation={currentLocation}
      updateList={updateList}
    />
  </Modal>
);

export const ModalDirsCreate = ({
  show,
  handleClose,
  currentLocation,
  updateList,
}) => (
  <Modal show={show} onHide={() => handleClose(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Create a new directory</Modal.Title>
    </Modal.Header>
    <DirectoryCreate
      showModal={show}
      setShowModal={handleClose}
      location={currentLocation}
      updateList={updateList}
    />
  </Modal>
);
