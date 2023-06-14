'use client'
import { useRouter } from 'next/navigation'
import ButtonOutline from '@/components/ui/ButtonOutline'

export default function Create() {
  const router = useRouter()
  return (
    <>
      <ButtonOutline onClick={() => router.push('/create/competition')}>Competition</ButtonOutline>
      <ButtonOutline onClick={() => router.push('/create/competitor')}>Competitor</ButtonOutline>
      <ButtonOutline onClick={() => router.push('/create/result')}>Result</ButtonOutline>
    </>
  )
}
