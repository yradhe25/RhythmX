import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, songData }) => {
  console.log("Song Data:", songData);
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center">
        <img 
          alt="image"
          src={songData.attributes?.artwork?.url?.replace('{w}', '400')?.replace('{h}', '400')}
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />
      </div>
    </div>
  )
};

export default DetailsHeader;
