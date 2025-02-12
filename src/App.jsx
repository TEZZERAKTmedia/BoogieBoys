import { useState } from 'react'
import './App.css'
import AfterCare from './TattoAfterCare/AfterCare';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div >
        
        <AfterCare />
      </div>
    </>
  )
}

export default App
