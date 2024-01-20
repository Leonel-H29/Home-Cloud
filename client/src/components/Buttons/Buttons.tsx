import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { BtnConfigProps, BtnMediaProps } from '../Interfaces/IButtons';

const BtnConfig: React.FC<BtnConfigProps> = ({
  handleRename,
  handleMove,
  handleDownload,
  handleDelete,
}) => (
  <Dropdown as={ButtonGroup}>
    <Dropdown.Toggle split id="dropdown-split-basic" title="File options">
      <i className="bi bi-gear"></i>{' '}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item onClick={handleRename} title="Rename">
        Rename
      </Dropdown.Item>
      <Dropdown.Item onClick={handleMove} title="Move">
        Move
      </Dropdown.Item>
      <Dropdown.Item onClick={handleDownload} title="Download">
        Download
      </Dropdown.Item>
      <Dropdown.Item onClick={handleDelete} title="Delete">
        Delete
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default BtnConfig;

interface BtnPlusProps {
  handleUpload: () => void;
  handleCreate: () => void;
  isDirectory: boolean;
}

export const BtnPlus: React.FC<BtnPlusProps> = ({
  handleUpload,
  handleCreate,
  isDirectory,
}) => {
  const uploadText = isDirectory
    ? 'Upload a exists directory'
    : 'Upload a exists file';
  const createText = isDirectory
    ? 'Create a new directory'
    : 'Create a new file';
  const iconClassname = isDirectory
    ? 'bi bi-folder-plus'
    : 'bi bi-file-earmark-plus';

  return (
    <Dropdown as={ButtonGroup}>
      <Dropdown.Toggle split id="dropdown-split-basic" title="Options">
        <i className={iconClassname}></i>{' '}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleUpload} title={uploadText}>
          {uploadText}
        </Dropdown.Item>
        <Dropdown.Item title={createText} onClick={handleCreate}>
          {createText}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const BtnMedia: React.FC<BtnMediaProps> = ({
  handlePlay,
  selected,
  buttonText,
}) => (
  <Button
    variant="primary"
    onClick={handlePlay}
    hidden={selected.length !== 1}
    size="sm"
  >
    <i className="bi bi-play-fill"></i> {buttonText}
  </Button>
);
