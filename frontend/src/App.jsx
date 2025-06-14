import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './Components/Dashboard'
import Tours from './Components/Tours'
import Sidebar from './Components/Sidebar/Sidebar'
import { Route, Router, Routes } from 'react-router-dom'
import Pages from './Components/Pages'
import Analytics from './Components/Analytics'
import TourPreview from './Components/Common/TourPreview'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="app-layout">
          <Sidebar />
        <div className="main-content">
          <Routes>
            {/* <ErrorBoundary> */}
              <Route path="/" element={<Dashboard />} />
            {/* </ErrorBoundary> */}
            <Route path="/tours" element={<Tours />} />
            <Route path="/pages" element={<Pages />} />
            <Route path="/analytics" element={<Analytics />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
        {/* <TourCreateModal /> */}
        {/* <TourPreview/> */}
        </div>
    </>
  )
}

export default App
