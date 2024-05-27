import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TodoProvider from './contexts/context.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './routes/index.jsx'
import Notfound from './routes/error-page.jsx'
import EditNote, { action as createaction } from './routes/Edit.jsx'
import Viewnote, { loader as noteLoader } from './routes/Viewnote.js'
import { action as rootaction, loader as notesLoader } from './components/Sidebar'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Notfound />,
    action: rootaction,
    loader: notesLoader,
    children: [
      {
        errorElement: <Notfound />,
        children: [
          {
            index: true,
            element: <App />
          },
          {
            path: "notes/:noteid/new",
            element: <EditNote />,
            action: createaction
          },
          {
            path: "notes/:noteid/view",
            element: <Viewnote />,
            loader: noteLoader,
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodoProvider>
      <RouterProvider router={router} />
    </TodoProvider>
  </React.StrictMode>,
)
