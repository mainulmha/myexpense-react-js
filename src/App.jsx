import { RouterProvider } from 'react-router-dom'
import './App.css'

import router from '@/routes/router'

// import reactLogo from './assets/react.svg'


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
