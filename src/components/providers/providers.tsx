'use client'
import { SessionProvider } from 'next-auth/react'
import { UiProvider } from './ui-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UiProvider>{children}</UiProvider>
    </SessionProvider>
  )
}
