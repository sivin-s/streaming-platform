import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router';
import routerConfig from './routes/routerConfig/routerConfig'
import { AppCustomProviders } from './provider/AppCustomProviders';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <AppCustomProviders>
     <RouterProvider  router={routerConfig}/>
   </AppCustomProviders>
  </StrictMode>,
)
