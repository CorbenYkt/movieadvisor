import React, { useState, useEffect } from 'react';
import GerneList from './GenreList';
import { CiCalendarDate } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import Loading from './Loading';
import axios from 'axios';

const MovieItem = ({ movie, profile, login }) => {
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const checkIfLiked = async () => {
            if (profile) {
                try {
                    const movieid = movie.id;
                    const userid = profile.email;

                    const response = await axios.get(`https://corbenykt.ru:443/dolike`, {
                        params: {
                            movieid: movieid,
                            userid: userid
                        },

                    }
                    );
                    
                    if (response.data && Object.keys(response.data).length > 0) {
                        setSaved(true);
                    } else {
                        setSaved(false);
                    }

                } catch (error) {
                    console.log('Error checking like status:', error);
                }
            }
        };

        checkIfLiked();
    }, [movie.id, profile]);

    const handleClick = async () => {
        setSaving(true);

        try {
            const movieid = movie.id;
            const userid = profile.email;

            if (saved) {
                const { data } = await axios.delete(`https://corbenykt.ru:443/likes`, {
                    params: {
                        movieid: movieid,
                        userid: userid
                    }
                });
                //console.log(data);
                setSaved(prevState => !prevState);
            } else {
                const { data } = await axios.post('https://corbenykt.ru:443/likes', { movieid, userid },
                    {
                    }
                );

                //console.log(data);
                setSaved(prevState => !prevState);
            }
        } catch (error) {
            console.log('Error saving like:', error);
            setSaved(false);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className='flex flex-col m-4'>
            <div className='font-bold text-lg text-left'>{movie.title}</div>
            <GerneList movieid={movie.id}></GerneList>
            <div>
                <img src={'https://image.tmdb.org/t/p/w500' + movie.backdrop_path} alt={movie.title}
                    className='w-full sm:w-1/2 md:w-full' />
            </div>
            <div className='flex flex-row text-gray-500'>
                <div className='flex items-center'><CiCalendarDate />&nbsp;
                    {movie.release_date}</div>
                <div className='flex items-center'>&nbsp;<FaRegStar />
                    &nbsp;
                    {movie.vote_average}</div>
            </div>
            <div><br></br></div>
            <div className='text-justify text-sm'>{movie.overview}</div>
            <br>
            </br>
            {profile ? (
                <>
                    {saving ? (
                        <Loading></Loading>
                    ) : saved ? (
                        <button onClick={() => { handleClick(movie.id) }} userid={profile.email} movieid={movie.id} disabled={saving} className="bg-red-500 text-white font-bold h-12 py-2 px-4 rounded">UnLike :(</button>
                    ) : (
                        <button onClick={() => { handleClick(movie.id) }} userid={profile.email} movieid={movie.id} disabled={saving} className="bg-blue-500 text-white font-bold h-12 py-2 px-4 rounded">Like :)</button>
                    )}
                </>
            ) : (
                <button onClick={() => login()} className="bg-blue-500 text-white font-bold h-12 py-2 px-4 rounded">Sign in</button>
            )}
        </div>
    );
}; export default MovieItem;