import { useState } from 'react';

export enum OperationType {
  Rename = 'RENAME',
  Move = 'MOVE',
  Delete = 'DELETE',
  Upload = 'UPLOAD',
  Create = 'CREATE',
  Download = 'DOWNLOAD',
  PlayMedia = 'PLAY_MEDIA',
  ViewImage = 'VIEW_IMAGE',
  None = '',
}

export enum SelectType {
  File = 'FILE',
  Directoy = 'DIRECTORY',
  None = '',
}

export function useModalFileOrDir() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [operation, SetOperation] = useState<string>(OperationType.None);
  const [type, SetType] = useState<string>(SelectType.None);

  const handleModal = (type: SelectType, operation: OperationType) => {
    setShowModal(true);
    SetOperation(operation);
    SetType(type);
  };

  return {
    showModal,
    operation,
    type,
    setShowModal,
    handleModal,
  };
}
