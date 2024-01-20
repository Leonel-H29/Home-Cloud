import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { FileClass } from '../Class/FileClass';
import { Button, Modal } from 'react-bootstrap';
import { Loading } from '../Loading/Loading';
import { ModalShowContentsProps } from '../Interfaces/IModal';

const MediaPlayer: React.FC<ModalShowContentsProps> = ({
  selected,
  location,
  handleClose,
}) => {
  const [fileURL, setFileURL] = useState<string | null>(null);
  const var_env = import.meta.env.VITE_BACKEND_URL;
  const URL_Media = var_env.substring(0, var_env.lastIndexOf('/api'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selected || !location) {
          console.error('Missing data');
          return;
        }
        const IFile = new FileClass();
        // const directory = url.substring(0, url.lastIndexOf('/'));
        // const fileName = url.substring(url.lastIndexOf('/') + 1);

        const response = await IFile.GetFile(location, selected);

        setFileURL(response.data.file_url);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchData();
  }, [location, selected]);

  return (
    <div>
      <Modal.Body>
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
        ) : (
          <Loading />
        )}
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
