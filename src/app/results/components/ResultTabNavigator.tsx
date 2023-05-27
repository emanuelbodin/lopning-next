'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Tabs from '@/components/selectors/Tabs'

export default function ResultTabNavigator() {
  const router = useRouter()
  const pathname = usePathname()
  const tabOptions = ['Competition', 'Competitor']
  const [activeTab, setActiveTab] = useState(
    pathname.includes('competitor') ? 'Competitor' : 'Competition'
  )

  const onTabChange = (tabName: string) => {
    setActiveTab(tabName)
    router.push(`/results/${tabName.toLowerCase()}`)
  }
  return <Tabs tabOptions={tabOptions} activeTab={activeTab} onChange={onTabChange} />
}
