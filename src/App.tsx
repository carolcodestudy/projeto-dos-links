import { createBrowserRouter } from 'react-router-dom'
import { Home } from './page/home'
import { Login } from './page/login'
import { Admin } from './page/admin'
import { Network } from './page/network'
import { ErrorNotFound } from './page/error'

import { Controller } from './route/index'

//Cria a rota no próprio arquivo principal (antigo App).
  const route = createBrowserRouter([
  {
    path : '/',
    element : <Home/>
  },
  {
    path: '/login',
    element : <Login/>
  },
    {
    path: '/admin',
    element : <Controller><Admin/></Controller> 
  },
    {
    path: '/admin/network',
    element : <Controller><Network/></Controller>  
  },
  {
    path : '*',
    element : <ErrorNotFound/>
  }
])

export { route }