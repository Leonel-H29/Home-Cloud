import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';

interface BtnConfigProps {
  handleRename: () => void;
  handleMove: () => void;
  handleDownload: () => void;
  handleDelete: () => void;
  selected: string[];
}

export const BtnConfigFile: React.FC<BtnConfigProps> = ({
  handleRename,
  handleMove,
  handleDownload,
  handleDelete,
  selected,
}) => (
  <Dropdown as={ButtonGroup} hidden={selected.length !== 1}>
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

export const BtnConfigDirectory: React.FC<BtnConfigProps> = ({
  handleRename,
  handleMove,
  handleDownload,
  handleDelete,
  selected,
}) => (
  <Dropdown as={ButtonGroup} hidden={selected.length !== 1}>
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

interface BtnPlusFileProps {
  handleUpload: () => void;
  handleCreate: () => void;
}

export const BtnPlusFile: React.FC<BtnPlusFileProps> = ({
  handleUpload,
  handleCreate,
}) => (
  <Dropdown as={ButtonGroup}>
    <Dropdown.Toggle split id="dropdown-split-basic" title="File options">
      <i className="bi bi-file-earmark-plus"></i>{' '}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item onClick={handleUpload} title="Upload a exists file">
        Upload a exists file
      </Dropdown.Item>
      <Dropdown.Item title="Create a new file" onClick={handleCreate}>
        Create a new file
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export const BtnPlusDirectory: React.FC<BtnPlusFileProps> = ({
  handleUpload,
  handleCreate,
}) => (
  <Dropdown as={ButtonGroup}>
    <Dropdown.Toggle
      split
      id="dropdown-split-basic"
      title="Directories options"
    >
      <i className="bi bi-folder-plus"></i>{' '}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item title="Upload a exists directory" onClick={handleUpload}>
        Upload a exists directory
      </Dropdown.Item>
      <Dropdown.Item title="Create a new directory" onClick={handleCreate}>
        Create a new directory
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export const BtnPlayVideo = ({ handlePlay, selected }) => (
  <Button variant="primary" onClick={handlePlay} hidden={selected.length !== 1}>
    <i className="bi bi-play-fill"></i> Play
  </Button>
);
