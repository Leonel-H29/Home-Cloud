import { Button, Modal } from 'react-bootstrap';
import { FileClass } from '../Class/FileClass';
import { ModalSelectProps } from '../Interfaces/IModal';
import { useCustomSwalTopEnd } from '../../hooks/useSwal';

const FileDownload: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const IFile = new FileClass();
  const showAlert = useCustomSwalTopEnd();
  const handleFileDownload = async () => {
    if (!show || !selected || !location) {
      console.error('Missing data');
      return;
    }

    try {
      const response = await IFile.DownloadFile(selected, location);
      handleClose(false);
      if (response.status == 200) {
        showAlert({
          icon: 'success',
          title: `The file download successfully!`,
        });
      }
    } catch (error) {
      showAlert({
        icon: 'error',
        title: `Error deleting file!`,
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
