import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Home from './pages/Home';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Header from './pages/Header';
import Footer from './pages/Footer';
import MovieList from './pages/MovieList';
import Loading from './pages/Loading';
import Profile from './pages/Profile';

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
            console.log(err)
          });
      }
    },
    [user]
  );

  return (
    <>
      <div className="flex flex-col h-screen" >
        <div className="flex-none" >
          <Header user={user} profile={profile} login={login} logOut={logOut} />
        </div>

        <Routes>
          <Route exact path="/movieadvisor" element={<Home user={user} profile={profile} login={login} logOut={logOut} />} />
          <Route exact path="/movieadvisor/profile" element={<Profile user={user} profile={profile} login={login} logOut={logOut} />} />

        </Routes>

        <div className="flex-none">
          <Footer />
        </div>
      </div >

    </>
  )
}

export default App