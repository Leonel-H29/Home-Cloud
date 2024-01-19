import FileCreate from '../Files/FileCreate';
import FileDelete from '../Files/FileDelete';
import FileMove from '../Files/FileMove';
import FileUpload from '../Files/FileUpload';
import FileRename from '../Files/FileRename';
import FileDownload from '../Files/FileDownload';
import {
  ModalSelectProps,
  ModalProps,
  ModalShowContentsProps,
} from '../Interfaces/IModal';
import MediaPlayer from '../Preview/MediaPlayer';
import React from 'react';
import Images from '../Preview/Images';
import Documents from '../Preview/Documents';

export const ModalFileRename: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => (
  <>
    <FileRename
      show={show}
      handleClose={handleClose}
      selected={selected}
      location={location}
      updateList={updateList}
    />
  </>
);

export const ModalFileMove: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => (
  <>
    <FileMove
      show={show}
      handleClose={handleClose}
      selected={selected}
      location={location}
      updateList={updateList}
    />
  </>
);

export const ModalFileDelete: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => (
  <>
    <FileDelete
      show={show}
      handleClose={handleClose}
      selected={selected}
      location={location}
      updateList={updateList}
    />
  </>
);

export const ModalFileDownload: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => (
  <>
    <FileDownload
      show={show}
      selected={selected}
      handleClose={handleClose}
      location={location}
      updateList={updateList}
    />
  </>
);

export const ModalFileUpload: React.FC<ModalProps> = ({
  show,
  handleClose,
  location,
  updateList,
}) => (
  <>
    <FileUpload
      show={show}
      handleClose={handleClose}
      location={location}
      updateList={updateList}
    />
  </>
);

export const ModalFileCreate: React.FC<ModalProps> = ({
  show,
  handleClose,
  location,
  updateList,
}) => (
  <>
    <FileCreate
      show={show}
      handleClose={handleClose}
      location={location}
      updateList={updateList}
    />
  </>
);

export const ModalPlayMedia: React.FC<ModalShowContentsProps> = ({
  handleClose,
  location,
  selected,
}) => (
  <>
    <MediaPlayer
      selected={selected}
      location={location}
      handleClose={handleClose}
    />
  </>
);

export const ModalViewImages: React.FC<ModalShowContentsProps> = ({
  handleClose,
  location,
  selected,
}) => (
  <>
    <Images selected={selected} location={location} handleClose={handleClose} />
  </>
);

export const ModalViewDocuments: React.FC<ModalShowContentsProps> = ({
  handleClose,
  location,
  selected,
}) => (
  <>
    <Documents
      selected={selected}
      location={location}
      handleClose={handleClose}
    />
  </>
);
