import React, { useState, useEffect } from 'react';
import Loading from './Loading';

const GerneList = ({ movieid }) => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        getDetailInfo();
    }, []);

    const getDetailInfo = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/' + movieid + '?language=en-US&api_key=' + import.meta.env.VITE_API_KEY);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const result = await response.json();
            setGenres(result["genres"]);
            //console.log(result["genres"]);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    return (
        <div className='flex flex-row'>
            {loading ? (
                <Loading />
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                genres.map((genre, i) => (
                    <span key={genre.id}>
                        {genre.name}
                        {i < genres.length - 1 && <span>,&nbsp;</span>}
                    </span>
                ))
            )}
        </div>

    );
}; export default GerneList;