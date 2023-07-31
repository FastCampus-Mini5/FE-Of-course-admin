import { createBrowserRouter } from 'react-router-dom'
import { App,ErrorComponent } from 'components/index'
import SignIn from './SignIn'
import Vacation from './Vacation'
import VacationPending from './VacationPending'
import User from './User'
import Duty from './Duty'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: '/user',
        element: <User />,
        errorElement: <ErrorComponent />,
        children: []
      },
      {
        path: '/vacation',
        element: <Vacation />,
        errorElement: <ErrorComponent />,
        children: []
      },
      {
        path: '/vacationpending',
        element: <VacationPending />,
        errorElement: <ErrorComponent />,
        children: []
      },
      {
        path: '/duty',
        element: <Duty />,
        errorElement: <ErrorComponent />,
        children: []
      }
    ]
  },
  {
    path: '/signin',
    element: <SignIn />,
    errorElement: <ErrorComponent />,
    children: []
  }
])
