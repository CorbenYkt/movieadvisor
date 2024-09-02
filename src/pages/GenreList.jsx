import React, { useState, useEffect } from 'react';

const GerneList = ({ movieid }) => {
    const [genres, setGenres] = useState([]);

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
            console.log(result["genres"]);
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div className='flex flex-row'>
            {
                genres.map((genre, i) => (
                    <span key={genre.id}>
                        {genre.name}
                        {i < genres.length - 1 && <span>,&nbsp;</span>}
                    </span>
                ))
            }


        </div>
        // genres.map((genre) =>
        //     <div key={genres.id}>
        //         <MovieItem movie={genre.name} />
        //     </div>
        // )

    );
}; export default GerneList;