import { Button, Modal } from 'react-bootstrap';
import { ModalSelectProps } from '../Interfaces/IModal';
import { useCustomSwalTopEnd } from '../../hooks/useSwal';
import { DirectoryClass } from '../Class/DirectoryClass';
import { useLoading } from '../../hooks/useLoading';
import { Loading } from '../Loading/Loading';

const DirectoryDownload: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const IDir = new DirectoryClass();
  const showAlert = useCustomSwalTopEnd();
  const { loading, setLoading } = useLoading();

  const handleDirectoryDownload = async () => {
    if (!show || !selected || !location) {
      console.error('Missing data');
      return;
    }

    try {
      setLoading(true);
      const response = await IDir.DownloadDirectory(selected, location);
      handleClose(false);
      console.log(response);

      if (response.status == 200) {
        showAlert({
          icon: 'success',
          title: `The directory download successfully!`,
        });
      }
    } catch (error) {
      showAlert({
        icon: 'error',
        title: `Error deleting directory!`,
      });
      console.error('Error downloading directory!: ', error);
    } finally {
      handleClose(false);
      updateList(location);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Modal.Body>
            Do you want to download the directory `{location}/{selected}`?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose(false)}>
              Close
            </Button>
            <Button variant="info" onClick={handleDirectoryDownload}>
              Download
            </Button>
          </Modal.Footer>
        </>
      )}
    </>
  );
};

export default DirectoryDownload;
