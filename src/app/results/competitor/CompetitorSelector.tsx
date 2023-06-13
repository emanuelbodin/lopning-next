'use client'
import { useRouter } from 'next/navigation'
import type { Competitor } from '@prisma/client'
import SelectInput from '@/components/SelectInput'

type CompetitorSelectorProps = {
  competitors: Competitor[]
}
const defaultCompetitorOptions = [{ id: 'noCompetitor', value: '', label: 'Select a competitor' }]

export default function CompetitorSelector({ competitors }: CompetitorSelectorProps) {
  const competitorOptions = competitors.map((competitor) => ({
    id: competitor.id,
    value: competitor.id,
    label: competitor.name,
  }))
  competitorOptions.unshift(...defaultCompetitorOptions)
  const router = useRouter()
  const onCompetitorSelected = (competitorId: string) => {
    router.push(`/results/competitor/${competitorId}`)
  }
  return (
    <SelectInput onChange={onCompetitorSelected} label="Competitor" options={competitorOptions} />
  )
}
