import { Modal } from 'react-bootstrap';
import React from 'react';
import {
  ModalFileCreate,
  ModalFileDelete,
  ModalFileUpload,
  ModalFileDownload,
  ModalFileMove,
  ModalFileRename,
  ModalPlayMedia,
  ModalViewImages,
  ModalViewDocuments,
} from './ModalFiles';
import {
  ModalDirsCreate,
  ModalDirsDelete,
  ModalDirsDownload,
  ModalDirsMove,
  ModalDirsRename,
} from './ModalDirs';

interface Modal {
  show: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  selected: string;
  location: string;
  updateList: (location: string) => void;
  operation: string;
  type: string;
}

const modalComponents = {
  FILE: {
    MOVE: ModalFileMove,
    RENAME: ModalFileRename,
    DELETE: ModalFileDelete,
    UPLOAD: ModalFileUpload,
    CREATE: ModalFileCreate,
    DOWNLOAD: ModalFileDownload,
    PLAY_MEDIA: ModalPlayMedia,
    VIEW_IMAGE: ModalViewImages,
    VIEW_DOCUMENT: ModalViewDocuments,
  },
  DIRECTORY: {
    MOVE: ModalDirsMove,
    RENAME: ModalDirsRename,
    DELETE: ModalDirsDelete,
    CREATE: ModalDirsCreate,
    DOWNLOAD: ModalDirsDownload,
  },
};

export const ModalShow: React.FC<Modal> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
  operation,
  type,
}) => {
  const SelectedModal = modalComponents[type]?.[operation] || null;

  return (
    <Modal show={show} onHide={() => handleClose(false)} size="lg" centered>
      {SelectedModal && (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {operation.toUpperCase()} {type.toUpperCase()}
            </Modal.Title>
          </Modal.Header>
          <SelectedModal
            show={show}
            handleClose={handleClose}
            selected={selected}
            location={location}
            updateList={updateList}
          />
        </>
      )}
    </Modal>
  );
};
