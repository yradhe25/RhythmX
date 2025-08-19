import { useDispatch, useSelector } from "react-redux";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useParams } from "react-router-dom";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetSongDetailsQuery } from "../redux/services/shazamCoreApi";

const SongDetails = () => {

    const dispatch = useDispatch();
    const { songid } = useParams();
    const { isPlaying, activeSong } = useSelector((state) => state.player);
    const { data: songData, isFetching: isFetchingSongData } = useGetSongDetailsQuery({ songid });


    return (
        <div className="mb-10">
            <h2 className="text-white text-3xl font-bold">Lyrics: </h2>
            <div className="mt-5">
                <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
            </div>
        </div>

    )
};

export default SongDetails;
