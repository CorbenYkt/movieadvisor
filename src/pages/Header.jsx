import React, { useState, useRef, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Header({ setUserStatusLoading, user, profile, logOut, login }) {

  return (
    <header className="w-full py-2">
      <div className="flex items-center justify-center">
        <h1 className="h1 text-lg font-bold	">Movie Advisor</h1>
        {profile ? (
          <div className="absolute right-4 top-0 flex items-center py-2 z-10">
            <div className="text-right text-sm">
              <p>{profile.name}</p>
              <p>{profile.email}</p>
              <button onClick={() => logOut()} className="">Log out</button>
            </div>
          </div>
        ) : (
          <div className="absolute right-4 top-0 flex items-center py-2 z-10">
            <button onClick={() => login()} className="ml-4 font-bold">Sign in</button>
          </div>
        )}
      </div>
    </header >
  );
}

export default Header;
