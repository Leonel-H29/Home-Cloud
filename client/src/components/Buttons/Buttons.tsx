import { Dropdown, ButtonGroup } from 'react-bootstrap';

export const BtnConfig = ({
  handleRename,
  handleMove,
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
      <Dropdown.Item onClick={handleDelete} title="Delete">
        Delete
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export const BtnPlusFile = ({ handleUpload, handleCreate }) => (
  <Dropdown as={ButtonGroup}>
    <Dropdown.Toggle split id="dropdown-split-basic" title="File options">
      <i className="bi bi-file-earmark-plus"></i>{' '}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item onClick={handleUpload} title="Upload a exists file">
        Upload a exists file
      </Dropdown.Item>
      <Dropdown.Item href="#" title="Create a new file" onClick={handleCreate}>
        Create a new file
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export const BtnPlusDirectory = ({ handleUpload }) => (
  <Dropdown as={ButtonGroup}>
    <Dropdown.Toggle
      split
      id="dropdown-split-basic"
      title="Directories options"
    >
      <i className="bi bi-folder-plus"></i>{' '}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item title="Upload a exists directory">
        Upload a exists directory
      </Dropdown.Item>
      <Dropdown.Item
        href="#"
        title="Create a new directory"
        onClick={handleUpload}
      >
        Create a new directory
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
