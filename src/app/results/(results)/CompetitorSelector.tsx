'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { competitors } from '@prisma/client'
import SelectInput, { SelectOptions } from '@/components/SelectInput'

export default function CompetitorSelector() {
  const [competitorOptions, setCompetitorOptions] = useState<SelectOptions>([])
  useEffect(() => {
    const fetchCompetitors = async () => {
      const res = await fetch('/api/competitor')
      const competitors = (await res.json()) as { data: competitors[] }
      const options = competitors.data.map((competitor) => ({
        id: competitor.id,
        value: competitor.id,
        label: competitor.name,
      }))
      setCompetitorOptions(options)
    }
    fetchCompetitors()
  }, [])
  const router = useRouter()
  const onCompetitorSelected = (competitorId: string) => {
    router.push(`/results/competitor/${competitorId}`)
  }
  return (
    <SelectInput onChange={onCompetitorSelected} label="Competitor" options={competitorOptions} />
  )
}
