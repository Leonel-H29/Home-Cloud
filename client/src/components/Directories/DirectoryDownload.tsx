import { Button, Modal } from 'react-bootstrap';
import { ModalSelectProps } from '../Interfaces/IModal';
import { DirectoryClass } from '../Class/DirectoryClass';
import { useLoading } from '../../hooks/useLoading';
import { Loading } from '../Loading/Loading';
import { toast } from 'sonner';

const DirectoryDownload: React.FC<ModalSelectProps> = ({
  show,
  handleClose,
  selected,
  location,
  updateList,
}) => {
  const IDir = new DirectoryClass();
  const { loading, setLoading } = useLoading();

  const handleDirectoryDownload = async () => {
    if (!show || !selected || !location) {
      console.error('Missing data');
      return;
    }

    setLoading(true);
    toast.promise(IDir.DownloadDirectory(selected, location), {
      success: `The file download successfully!`,
      error: `Error dowloading file!`,
      finally: () => {
        handleClose(false);
        updateList(location);
        setLoading(false);
      },
      loading: 'Saving changes ...',
    });
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
