import { createBrowserRouter } from 'react-router-dom'
import { App, ErrorComponent } from 'components/index'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorComponent />,
    children: []
  }
])
