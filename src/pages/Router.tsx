import { createBrowserRouter } from 'react-router-dom'
import { ErrorComponent } from 'components/index'
import  Layout  from '../components/common/Layout'
import SignIn from './SignIn'
import Vacation from './Vacation'
import VacationPending from './VacationPending'
import User from './User'
import Duty from './Duty'
import DutyPending from './DutyPending'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: '/',
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
      },
      {
        path: '/dutypending',
        element: <DutyPending />,
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
