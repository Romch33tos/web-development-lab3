import './styles/style.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { router } from './router.jsx';
import { ThemeProvider } from './theme/ThemeContext.jsx';
import { TodoProvider } from './state/TodoContext.jsx';

const redirectPath = sessionStorage.getItem('redirectPath');
if (redirectPath) {
  sessionStorage.removeItem('redirectPath');
  window.history.replaceState(null, '', redirectPath);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <TodoProvider>
        <RouterProvider router={router} />
      </TodoProvider>
    </ThemeProvider>
  </StrictMode>
);
