'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SelectInput, { SelectOptions } from '@/components/SelectInput'
import type { Competition, CompetitionCategory } from '@prisma/client'

type CompetitonSelectorProps = {
  categories: CompetitionCategory[]
}

const defaultCompetitonOption = [{ id: 'noCompetition', value: '', label: 'Select a competition' }]

export default function CompetitonSelector({ categories }: CompetitonSelectorProps) {
  const [competitionOptions, setCompetitionOptions] = useState<SelectOptions>([
    ...defaultCompetitonOption,
  ])
  const categoryOptions = categories.map((category) => ({
    id: category.id,
    value: category.id,
    label: category.name,
  }))
  categoryOptions.unshift(...defaultCompetitonOption)

  const onCompetitionTypeChange = async (id?: string) => {
    if (!id) {
      setCompetitionOptions([...defaultCompetitonOption])
      return
    }
    const res = await fetch(`/api/competition/${id}`)
    const competitions = (await res.json()) as { data: Competition[] }
    const options = competitions.data.map((competition) => ({
      id: competition.id,
      value: competition.id,
      label: competition.date.toString(),
    }))
    setCompetitionOptions([...defaultCompetitonOption, ...options])
  }

  const router = useRouter()
  const onCompetitonSelected = (competitorId: string) => {
    router.push(`/results/competition/${competitorId}`)
  }
  return (
    <div className="flex gap-4 justify-center">
      <SelectInput onChange={onCompetitionTypeChange} label="Type" options={categoryOptions} />
      <SelectInput onChange={onCompetitonSelected} label="Date" options={competitionOptions} />
    </div>
  )
}
