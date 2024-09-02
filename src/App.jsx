import { useState } from 'react'
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Home from './pages/Home';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route exact path="/movieadvisor" element={<Home />} />
      </Routes>
    </>
  )
}

export default App

//git add dist -f
//git commit -m "deploy"
//git subtree push --prefix dist origin gh-pages