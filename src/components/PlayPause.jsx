import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlePlay, handlePause }) => (
  isPlaying && activeSong?.attributes?.name == song.attributes?.name ? (
    <FaPauseCircle 
      size={35}
      className='text-gray-300'
      onClick={ handlePause }
    />
  ) : (
    <FaPlayCircle 
      size={35}
      className='text-gray-300'
      onClick={ handlePlay }
    />
  )
);

export default PlayPause;
