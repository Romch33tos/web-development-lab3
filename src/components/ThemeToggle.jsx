import { useTheme } from '../theme/ThemeContext.jsx';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-pressed={theme === 'dark'}
    >
      {theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    </button>
  );
}
