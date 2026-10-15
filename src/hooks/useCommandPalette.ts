import { createContext, useContext } from 'react'

interface PaletteContextValue {
  open: () => void
}

export const PaletteContext = createContext<PaletteContextValue>({ open: () => {} })

export const useCommandPalette = () => useContext(PaletteContext)
