import { useTheme } from '@/contexts/ThemeContext'
import { Sun, Moon } from 'reicon-react'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl hover:bg-accent transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 text-kraken-gray" />
      ) : (
        <Sun className="w-4 h-4 text-kraken-gray" />
      )}
    </button>
  )
}
