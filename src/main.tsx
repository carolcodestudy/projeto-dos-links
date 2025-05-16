import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {route} from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import './body.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
