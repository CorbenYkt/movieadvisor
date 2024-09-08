import React, { useState, useEffect } from 'react';
import GerneList from './GenreList';
import { CiCalendarDate } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";

const MovieItem = ({ movie }) => {
    console.log(movie.genre_ids)
    return (
        <div className='flex flex-col m-4'>
            <div className='font-bold text-lg'>{movie.title}</div>
            <GerneList movieid={movie.id}></GerneList>
            <div>
                <img src={'https://image.tmdb.org/t/p/w500' + movie.backdrop_path} className='w-full sm:w-1/2 md:w-full' />
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
        </div>
    );
}; export default MovieItem;