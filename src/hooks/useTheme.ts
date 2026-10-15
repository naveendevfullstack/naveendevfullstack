import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

const listeners = new Set<() => void>()

function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'dark' as Theme)

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Storage unavailable (private mode); the theme still applies for this visit.
    }
    listeners.forEach((l) => l())
  }, [])

  const toggleTheme = useCallback(() => setTheme(getTheme() === 'dark' ? 'light' : 'dark'), [setTheme])

  return { theme, setTheme, toggleTheme }
}
