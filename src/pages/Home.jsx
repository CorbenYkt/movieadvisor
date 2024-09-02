import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import MovieList from './MovieList';

function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const settings = {
        method: 'GET',
    }

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + import.meta.env.VITE_API_KEY);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const result = await response.json();
            setData(result["results"]);
            console.log(result["results"]);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen" >
            <div className="h-1/6" >
                <Header />
            </div>

            <div className="grow flex-col justify-center items-center">
                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <MovieList data={data}></MovieList>
                    )}
                </div>
            </div >

            <div className="h-1/6">
                <Footer />
            </div>
        </div >
    );
}

export default Home;