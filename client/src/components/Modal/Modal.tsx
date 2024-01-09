import { Modal } from 'react-bootstrap';
import FileRename from '../Files/FileRename';
import React from 'react';
import FileDelete from '../Files/FileDelete';
import FileMove from '../Files/FileMove';
import FileUpload from '../Files/FileUpload';
import FileCreate from '../Files/FileCreate';
import DirectoryCreate from '../Directories/DirectoryCreate';
import FileDownload from '../Files/FileDownload';
import { Else, If, Then } from 'react-if';
//import { OperationType, SelectType } from '../../hooks/useModal';

interface Modal {
  show: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  currentLocation: string;
  updateList: (location: string) => void;
  operation: string;
  type: string;
}

interface ModalSelectProps {
  show: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  currentLocation: string;
  updateList: (location: string) => void;
}

interface ModalProps {
  show: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  currentLocation: string;
  updateList: (location: string) => void;
}

export const ModalShow: React.FC<Modal> = ({
  show,
  handleClose,
  selected,
  currentLocation,
  updateList,
  operation,
  type,
}) => (
  <Modal show={show} onHide={() => handleClose(false)}>
    <>
      <If condition={type === 'FILE'}>
        <Then>
          <If condition={operation === 'MOVE'}>
            <Then>
              <ModalFileMove
                show={show}
                handleClose={handleClose}
                selected={selected}
                currentLocation={currentLocation}
                updateList={updateList}
              />
            </Then>
          </If>

          <If condition={operation === 'RENAME'}>
            <Then>
              <ModalFileRename
                show={show}
                handleClose={handleClose}
                selected={selected}
                currentLocation={currentLocation}
                updateList={updateList}
              />
            </Then>
          </If>

          <If condition={operation === 'DELETE'}>
            <Then>
              <ModalFileDelete
                show={show}
                handleClose={handleClose}
                selected={selected}
                currentLocation={currentLocation}
                updateList={updateList}
              />
            </Then>
          </If>

          <If condition={operation === 'UPLOAD'}>
            <Then>
              <ModalFileUpload
                show={show}
                handleClose={handleClose}
                currentLocation={currentLocation}
                updateList={updateList}
              />
            </Then>
          </If>
          <If condition={operation === 'CREATE'}>
            <Then>
              <ModalFileCreate
                show={show}
                handleClose={handleClose}
                currentLocation={currentLocation}
                updateList={updateList}
              />
            </Then>
          </If>
          <If condition={operation === 'DOWNLOAD'}>
            <Then>
              <ModalFileDownload
                show={show}
                handleClose={handleClose}
                currentLocation={currentLocation}
                selected={selected}
                updateList={updateList}
              />
            </Then>
          </If>
        </Then>
        <Else>
          <If condition={operation === 'MOVE'}>
            <Then>
              {/* <ModalFileMove
                show={show}
                handleClose={handleClose}
                selected={selected}
                currentLocation={currentLocation}
                updateList={updateList}
              /> */}
            </Then>
          </If>

          <If condition={operation === 'RENAME'}>
            <Then>
              {/* <ModalFileRename
                show={show}
                handleClose={handleClose}
                selected={selected}
                currentLocation={currentLocation}
                updateList={updateList}
              /> */}
            </Then>
          </If>

          <If condition={operation === 'DELETE'}>
            <Then>
              {/* <ModalFileDelete
                show={show}
                handleClose={handleClose}
                selected={selected}
                currentLocation={currentLocation}
                updateList={updateList}
              /> */}
            </Then>
          </If>

          <If condition={operation === 'UPLOAD'}>
            <Then>
              {/* <ModalFileUpload
                show={show}
                handleClose={handleClose}
                currentLocation={currentLocation}
                updateList={updateList}
              /> */}
            </Then>
          </If>
          <If condition={operation === 'CREATE'}>
            <Then>
              <ModalDirsCreate
                show={show}
                handleClose={handleClose}
                currentLocation={currentLocation}
                updateList={updateList}
              />
            </Then>
          </If>
          <If condition={operation === 'DOWNLOAD'}>
            <Then>
              {/* <ModalFileDownload
                show={show}
                handleClose={handleClose}
                currentLocation={currentLocation}
                selected={selected}
                updateList={updateList}
              /> */}
            </Then>
          </If>
        </Else>
      </If>
    </>
  </Modal>
);

export const ModalFileRename: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  currentLocation,
  updateList,
}) => (
  <>
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
  </>
);

export const ModalFileMove: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  currentLocation,
  updateList,
}) => (
  <>
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
  </>
);

export const ModalFileDelete: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  currentLocation,
  updateList,
}) => (
  <>
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
  </>
);

export const ModalFileDownload: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  currentLocation,
  updateList,
}) => (
  <>
    <Modal.Header closeButton>
      <Modal.Title>Download file</Modal.Title>
    </Modal.Header>
    <FileDownload
      showModal={show}
      file={selected}
      setShowModal={handleClose}
      location={currentLocation}
      updateList={updateList}
    />
  </>
);

export const ModalFileUpload: React.FC<ModalProps> = ({
  show,
  handleClose,
  currentLocation,
  updateList,
}) => (
  <>
    <Modal.Header closeButton>
      <Modal.Title>Upload a new file</Modal.Title>
    </Modal.Header>
    <FileUpload
      showModal={show}
      setShowModal={handleClose}
      location={currentLocation}
      updateList={updateList}
    />
  </>
);

export const ModalFileCreate: React.FC<ModalProps> = ({
  show,
  handleClose,
  currentLocation,
  updateList,
}) => (
  <>
    <Modal.Header closeButton>
      <Modal.Title>Create a new file</Modal.Title>
    </Modal.Header>
    <FileCreate
      showModal={show}
      setShowModal={handleClose}
      createLocation={currentLocation}
      updateList={updateList}
    />
  </>
);

export const ModalDirsCreate: React.FC<ModalProps> = ({
  show,
  handleClose,
  currentLocation,
  updateList,
}) => (
  <>
    <Modal.Header closeButton>
      <Modal.Title>Create a new directory</Modal.Title>
    </Modal.Header>
    <DirectoryCreate
      showModal={show}
      setShowModal={handleClose}
      location={currentLocation}
      updateList={updateList}
    />
  </>
);
