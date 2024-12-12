import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Home from './components/Home/Home'
import ComplaintsTable from './components/Student/ComplaintsTable'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Home/>
   <ComplaintsTable/>
    </>
  )
}

export default App
