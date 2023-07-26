import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from 'pages/Router'
import { GlobalStyles } from 'styles/index'
import { ThemeProvider } from 'styled-components'
import { theme } from 'styles/index'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <RouterProvider router={router} />
  </ThemeProvider>
)