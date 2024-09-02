import React, { useState, useEffect } from 'react';
import GerneList from './GenreList';

const MovieItem = ({ movie }) => {
    return (
        <div className='flex flex-col m-4'>
            <div className='font-bold text-lg'>{movie.title}</div>
            <GerneList movieid={movie.id}></GerneList>
            {/* <div className='from-neutral-500 text-sm'>{genre}</div> */}
            <div>
                <img src={'https://image.tmdb.org/t/p/w500' + movie.backdrop_path} />
            </div>
            <div>{movie.overview}</div>
        </div>
    );
}; export default MovieItem;