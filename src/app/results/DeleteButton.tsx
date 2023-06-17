'use client'
import { useTransition } from 'react'
import ButtonOutline from '@/components/ui/ButtonOutline'

type Props = {
  id: string
  children: React.ReactNode
  deleteAction: (id: string) => Promise<void>
}

export default function DeleteButton({ id, deleteAction, children }: Props) {
  const [isPending, startTransition] = useTransition()
  return (
    <ButtonOutline type="danger" onClick={() => startTransition(() => deleteAction(id))}>
      {children}
    </ButtonOutline>
  )
}
