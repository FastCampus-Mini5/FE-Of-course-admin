import { createBrowserRouter } from 'react-router-dom'
import { ErrorComponent } from 'components/index'
import {Layout} from '@/components/common/index'
import { 
  Duty, 
  DutyPending, 
  SignIn, 
  User, 
  Vacation, 
  VacationPending 
} from 'pages/index'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
    errorElement: <ErrorComponent />,
    children: []
  },
  {
    path: '/',
    element: <Layout />,
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
      },
      {
        path: '/dutypending',
        element: <DutyPending />,
        errorElement: <ErrorComponent />,
        children: []
      }
    ]
  }
])
