import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import MovieList from './MovieList';
import Loading from './Loading';
import axios from 'axios';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

function Home({ user, profile, logOut, login }) {
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
            //console.log(result["results"]);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen" >
            <div className="flex-none" >
                <Header user={user} profile={profile} login={login} logOut={logOut} />
            </div>

            <div className="grow flex-col justify-center items-center ">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <MovieList data={data}></MovieList>
                )}
            </div >

            <div className="flex-none">
                <Footer />
            </div>
        </div >
    );
}

export default Home;