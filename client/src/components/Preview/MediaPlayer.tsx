import React from 'react';
import ReactPlayer from 'react-player';

interface MediaPlayerProps {
  url: string;
  onClose: () => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ url, onClose }) => {
  console.log(url);
  return (
    <div>
      <ReactPlayer
        url={'file:///home/leonel/Documentos/VID-20230808-WA0004.mp4'}
        controls
        width="100%"
        height="100%"
      />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default MediaPlayer;
