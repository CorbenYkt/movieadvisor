import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Home from './pages/Home';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import Header from './pages/Header';
import Footer from './pages/Footer';
import MovieList from './pages/MovieList';
import Loading from './pages/Loading';
import Profile from './pages/Profile';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      localStorage.setItem('user', JSON.stringify(codeResponse));
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(
    () => {
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);
          })
          .catch((err) => {
            setProfile(null);
            console.error('Failed to fetch profile:', err);
          });
      }
    },
    [user]
  );

  return (
    <>
      <div className="flex flex-col h-screen" >
        <header className="flex-none" role="banner">
          <Header user={user} profile={profile} login={login} logOut={logOut} />
        </header>

        <main role="main" className="flex-grow">
          {profile === null && user ? (
            <Loading />
          ) : (
            <Routes>
              <Route exact path="/movieadvisor" element={<Home user={user} profile={profile} login={login} logOut={logOut} />} />
              <Route exact path="/movieadvisor/profile" element={<Profile user={user} profile={profile} login={login} logOut={logOut} />} />
            </Routes>
          )}

        </main>

        <footer className="flex-none" role="contentinfo">
          <Footer />
        </footer>
      </div >
    </>
  )
}

export default App