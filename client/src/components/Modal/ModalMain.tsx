import { Modal } from 'react-bootstrap';
import React from 'react';
import {
  ModalFileCreate,
  ModalFileDelete,
  ModalFileUpload,
  ModalFileDownload,
  ModalFileMove,
  ModalFileRename,
} from './ModalFiles';
import { ModalDirsCreate, ModalDirsDelete } from './ModalDirs';

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
  },
  DIRECTORY: {
    //MOVE: ModalFileMove,
    //RENAME: ModalFileRename,
    DELETE: ModalDirsDelete,
    CREATE: ModalDirsCreate,
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
    <Modal show={show} onHide={() => handleClose(false)}>
      {SelectedModal && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>
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
