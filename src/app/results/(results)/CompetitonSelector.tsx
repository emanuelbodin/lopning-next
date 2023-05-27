'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SelectInput, { SelectOptions } from '@/components/SelectInput'
import type { competitions } from '@prisma/client'

export default function CompetitonSelector() {
  const competitionTypeOptions = [
    { id: 'noCompetition', value: '', label: 'Select a type' },
    { id: 'competition1', value: 'söndagstävling', label: 'Söndagstävling' },
    { id: 'competition2', value: 'jaktstart', label: 'Jaktstart' },
    { id: 'competition3', value: 'milen', label: 'Milen' },
  ]
  const [competitionOptions, setCompetitionOptions] = useState<SelectOptions>([])

  const onCompetitionTypeChange = async (type: string | undefined) => {
    if (!type) return
    const res = await fetch(`/api/competition/${type}`)
    const competitions = (await res.json()) as { data: competitions[] }
    const options = competitions.data.map((competition) => ({
      id: competition.id,
      value: competition.id,
      label: competition.date.toString(),
    }))
    setCompetitionOptions(options)
  }

  const router = useRouter()
  const onCompetitonSelected = (competitorId: string) => {
    router.push(`/results/competition/${competitorId}`)
  }
  return (
    <div className="flex gap-4 w-1/3 justify-center">
      <SelectInput
        onChange={onCompetitionTypeChange}
        label="Type"
        options={competitionTypeOptions}
      />
      <SelectInput onChange={onCompetitonSelected} label="Date" options={competitionOptions} />
    </div>
  )
}
