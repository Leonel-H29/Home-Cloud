import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { FileClass } from '../Class/FileClass';
import { Button, Modal } from 'react-bootstrap';
import { Loading } from '../Loading/Loading';
import { ModalShowContentsProps } from '../Interfaces/IModal';
import { useLoading } from '../../hooks/useLoading';

const MediaPlayer: React.FC<ModalShowContentsProps> = ({
  selected,
  location,
  handleClose,
}) => {
  const [fileURL, setFileURL] = useState<string | null>(null);
  const var_env = import.meta.env.VITE_BACKEND_URL;
  const URL_Media = var_env.substring(0, var_env.lastIndexOf('/api'));
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selected || !location) {
          console.error('Missing data');
          return;
        }

        const storedUrls = JSON.parse(localStorage.getItem('urlList') || '[]');

        if (storedUrls.includes(location + selected)) {
          console.log('Already inserted!');
          // URL already in the list, use the cached URL
          setFileURL(`/static${location}/${selected}`);
        } else {
          // URL not in the list, fetch from the server
          const IFile = new FileClass();
          const response = await IFile.GetFile(location, selected);

          if (response.status === 200) {
            const newUrl = response.data.file_url;

            // Update the list and store it in local storage
            const updatedUrls = [...storedUrls, location + selected];
            localStorage.setItem('urlList', JSON.stringify(updatedUrls));

            setFileURL(newUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching file:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, selected, setLoading]);

  return (
    <div>
      <Modal.Body>
        {loading && <Loading />}
        {fileURL ? (
          <>
            <h4>{selected}</h4>
            <ReactPlayer
              url={`${URL_Media}${fileURL}`}
              controls
              width="100%"
              height="22.5rem"
            />
          </>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose(false)}>
          Close
        </Button>
      </Modal.Footer>
    </div>
  );
};

export default MediaPlayer;
