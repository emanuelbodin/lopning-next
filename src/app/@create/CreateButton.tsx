'use client'
import { useRouter } from 'next/navigation'
import ButtonRound from '@/components/ui/ButtonRound'

export default function CreateButton() {
  const router = useRouter()
  return (
    <div className="sticky w-14 bottom-10 float-right z-1 mr-2 md:mr-10">
      <ButtonRound onClick={() => () => router.push('/create-competition')}>+</ButtonRound>
    </div>
  )
}
