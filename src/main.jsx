import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import NuevoCliente from './pages/NuevoCliente'
import Index, {loader as clientesLoader} from './pages/Index'
import { action as actionNuevoCliente } from './pages/NuevoCliente'
import ErrorPage from './components/ErrorPage'
import EditarCliente from './pages/EditarCliente'
import { loader as loaderEditarCliente } from './pages/EditarCliente'
import { action as editarClienteAction } from './pages/EditarCliente'
import { action as eliminarClienteAction} from './components/Cliente'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index:true,
        element: <Index/>,
        loader: clientesLoader,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente/>,
        action: actionNuevoCliente,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente/>,
        loader: loaderEditarCliente,
        action: editarClienteAction, 
        errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/:clienteId/eliminar',
        action: eliminarClienteAction
      }
    ]
  },
  
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
