'use client'
import { createContext, useContext, useState } from 'react'

type UiContext = {
  isMobileNavOpen: boolean
  toggleNavbar: () => void
}
const UiContext = createContext<UiContext | undefined>(undefined)

export const UiProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const toggleNavbar = () => setIsMobileNavOpen((old) => !old)
  const value = { isMobileNavOpen, toggleNavbar }
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

export const useUiContext = () => {
  const context = useContext(UiContext)
  if (!context) throw new Error('useUiContext must be inside an UiContextProvider')
  return context
}
