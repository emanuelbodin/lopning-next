'use client'
import { usePathname } from 'next/navigation'
import CompetitorSelector from './CompetitorSelector'
import CompetitonSelector from './CompetitonSelector'

export default function ResultSelector() {
  const pathname = usePathname()
  return <>{pathname.includes('competition') ? <CompetitonSelector /> : <CompetitorSelector />}</>
}
