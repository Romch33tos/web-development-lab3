import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const ThemeContext = createContext(null);

const DARK = '(prefers-color-scheme: dark)';
const systemTheme = () => matchMedia(DARK).matches ? 'dark' : 'light';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('todo-app:theme', systemTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme вызван вне ThemeProvider');
  }
  return context;
}
