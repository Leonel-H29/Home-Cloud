// import { useState } from 'react';

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
