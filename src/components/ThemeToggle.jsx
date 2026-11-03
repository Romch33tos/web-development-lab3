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
      {theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
    </button>
  );
}
