import { Button, Modal } from 'react-bootstrap';
import { FileClass } from '../Class/FileClass';
import Swal from 'sweetalert2';
import { ModalSelectProps } from '../Interfaces/IModal';

const FileDownload: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const IFile = new FileClass();
  const handleFileDownload = async () => {
    if (!show || !selected || !location) {
      console.error('Missing data');
      return;
    }

    try {
      IFile.DownloadFile(selected, location);
      handleClose(false);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `The file download successfully!`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Error deleting file!`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error('Error downloading file!: ', error);
    } finally {
      handleClose(false);
      updateList(location);
    }
  };

  return (
    <>
      <Modal.Body>
        Do you want to download the file `{location}/{selected}`?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
        <Button variant="info" onClick={handleFileDownload}>
          Download
        </Button>
      </Modal.Footer>
    </>
  );
};

export default FileDownload;
