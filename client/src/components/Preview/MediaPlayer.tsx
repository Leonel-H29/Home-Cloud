import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { FileClass } from '../Class/FileClass';

interface MediaPlayerProps {
  url: string;
  onClose: () => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ url, onClose }) => {
  const [fileURL, setFileURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const IFile = new FileClass();
        const directory = url.substring(0, url.lastIndexOf('/'));
        const fileName = url.substring(url.lastIndexOf('/') + 1);

        const response = await IFile.GetFile(directory, fileName);

        setFileURL(response.data.file_url);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    fetchData();
  }, [url]);

  return (
    <div>
      {fileURL && (
        <ReactPlayer
          url={`http://localhost:8082${fileURL}`}
          controls
          width="100%"
          height="100%"
        />
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default MediaPlayer;
