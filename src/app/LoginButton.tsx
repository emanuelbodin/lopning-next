'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import ButtonOutline from '@/components/ui/ButtonOutline'

export default function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <ButtonOutline type="danger" onClick={() => signOut()}>
        Sign out
      </ButtonOutline>
    )
  }
  return <ButtonOutline onClick={() => signIn()}>Sign in</ButtonOutline>
}
