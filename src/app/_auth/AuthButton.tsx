'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import ButtonOutline from '@/components/ui/ButtonOutline'

type Props = {
  isAuth: boolean
}

export default function AuthButton({ isAuth }: Props) {
  const { data: session } = useSession()
  if (isAuth || session) {
    return (
      <ButtonOutline type="danger" onClick={() => signOut()}>
        Sign out
      </ButtonOutline>
    )
  }
  return <ButtonOutline onClick={() => signIn()}>Sign in</ButtonOutline>
}
