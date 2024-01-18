// import { useState } from 'react';

export function isMediaFile(item: string) {
  // Regular expression with extensions for video and audio files
  const regex = /\.(mp4|mp3|avi|mkv|mov|wmv|flv|ogg|wav|wma)$/i;

  // Test the string against the regular expression
  const hasExtension = regex.test(item);

  // Return true if the string has the specified extension, false otherwise
  return hasExtension;
}

// interface UseMediaPlayer {
//   showMediaPlayer: boolean;
//   setShowMediaPlayer: React.Dispatch<React.SetStateAction<boolean>>;
//   mediaPlayerUrl: string;
//   setMediaPlayerUrl: React.Dispatch<React.SetStateAction<string>>;
//   handleOpenMediaPlayer: (url: string) => void;
//   handleCloseMediaPlayer: () => void;
// }

// const useMediaPlayer = (): UseMediaPlayer => {
//   const [showMediaPlayer, setShowMediaPlayer] = useState<boolean>(false);
//   const [mediaPlayerUrl, setMediaPlayerUrl] = useState<string>('');

//   const handleOpenMediaPlayer = (url: string) => {
//     setMediaPlayerUrl(url);
//     setShowMediaPlayer(true);
//   };

//   const handleCloseMediaPlayer = () => {
//     setMediaPlayerUrl('');
//     setShowMediaPlayer(false);
//   };

//   return {
//     showMediaPlayer,
//     setShowMediaPlayer,
//     mediaPlayerUrl,
//     setMediaPlayerUrl,
//     handleOpenMediaPlayer,
//     handleCloseMediaPlayer,
//   };
// };

// export default useMediaPlayer;
