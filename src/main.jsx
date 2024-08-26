import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './components/custom/header.jsx'
import CreateTrip from './create-trip/index.jsx'

const router = createBrowserRouter([
  {
  path:'/',
  element:<App/>
},
{
  path:'/create-trip',
  element:<CreateTrip/>
}

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
   <RouterProvider router={router}/>
  </StrictMode>,
)
