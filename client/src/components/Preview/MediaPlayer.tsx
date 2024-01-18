import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { FileClass } from '../Class/FileClass';
import { Button, Modal } from 'react-bootstrap';
import { Loading } from '../Loading/Loading';

interface MediaPlayerProps {
  selected: string;
  location: string;
  handleClose: (value: boolean) => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  selected,
  location,
  handleClose,
}) => {
  const [fileURL, setFileURL] = useState<string | null>(null);

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
            <ReactPlayer
              url={`http://localhost:8082${fileURL}`}
              controls
              width="100%"
              height="100%"
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
