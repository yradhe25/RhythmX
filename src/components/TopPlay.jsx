import { useDispatch, useSelector } from "react-redux";
import { useGetTopChartsQuery } from "../redux/services/shazamCoreApi";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, i, handlePlayClick, handlePauseClick, isPlaying, activeSong }) => (
  <div className='w-full flex flex-row items-center hover:bg-[#4c426e] } py-1 p-2 rounded-lg cursor-pointer mb-0'>
    <h3 className="font-bold text-base text-white mr-3">{ i+1 }</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
        <img 
          className="w-20 h-20 rounded-lg" 
          src={song?.attributes?.artwork?.url.replace("{w}", "200").replace("{h}", "200")} 
          alt={song?.attributes?.name} 
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song?.id}`}>
            <p className="text-lg font-bold text-white">{song?.attributes?.name}</p>
          </Link>
          <p className="text-sm text-gray-300 mt-1">{song?.attributes?.artistName}</p>
        </div>
    </div>
    <PlayPause 
      activeSong={activeSong}
      isPlaying={isPlaying}
      song={song}
      handlePlay={handlePlayClick}
      handlePause={handlePauseClick}
    />
  </div>
)

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);
  const topPlays = data?.slice(0, 5);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior : 'smooth' });
  });

  const handlePlayClick = (song, i) => {
    console.log("Playing:", song);
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  return(
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[400px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to='/top-charts'>
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard 
              key={song.id}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to='/top-artists'>
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-2"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song.id}
              style={{width: '25%', height: 'auto'}}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link
                to={`/artists/${song?.id}`}
              >
                <img src={song?.attributes?.artwork?.url.replace("{w}", "200").replace("{h}", "200")} alt={song?.attributes?.name} className="rounded-full w-full object-cover"/>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
};

export default TopPlay;
