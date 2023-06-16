'use client'
import { SessionProvider } from 'next-auth/react'
import { UiProvider } from './UiProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UiProvider>{children}</UiProvider>
    </SessionProvider>
  )
}
