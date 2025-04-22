import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Loading from './pages/Loading';
import Profile from './pages/Profile';
import { useAuth } from './api/useAuth';

function App() {
  const { user, profile, login, logOut } = useAuth();

  return (
    <>
      <div className="flex flex-col h-screen" >
        <header className="flex-none" role="banner">
          <Header user={user} profile={profile} login={login} logOut={logOut} />
        </header>

        <main role="main" className="flex-grow">

          <Routes>
            <Route exact path="/movieadvisor" element={<Home user={user} profile={profile} login={login} logOut={logOut} />} />
            <Route exact path="/movieadvisor/profile" element={<Profile user={user} profile={profile} login={login} logOut={logOut} />} />
          </Routes>

        </main>

        <footer className="flex-none" role="contentinfo">
          <Footer />
        </footer>
      </div >
    </>
  )
}

export default App