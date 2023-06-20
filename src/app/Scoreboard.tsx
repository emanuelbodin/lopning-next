'use client'
import { useState } from 'react'
import ScoreboardTable from '@/components/ScoreboardTable'
import SelectInput from '@/components/SelectInput'
import { ScoreboardRow } from '@/types/results'

type Props = {
  availableYears: string[]
  initialData: ScoreboardRow[]
}

export default function Scoreboard({ availableYears, initialData }: Props) {
  const [selectedYear, setSelectedYear] = useState(availableYears[availableYears.length - 1])
  const [data, setData] = useState(initialData)
  const yearOptions = [
    { id: 'noYear', value: '', label: 'Select a year' },
    ...availableYears.map((year, index) => ({
      id: `year${index + 1}`,
      value: year,
      label: year,
    })),
  ]

  const onSelectedYearChange = async (year: string) => {
    setSelectedYear(year)
    if (year === '') {
      setData([])
      return
    }
    const res = await fetch(`/api/scoreboard/${year}`)
    const scoreboardData = await res.json()
    setData(scoreboardData.data)
  }

  const title = `Scoreboard ${selectedYear}`

  return (
    <>
      <SelectInput
        selectedValue={selectedYear}
        onChange={onSelectedYearChange}
        label="Year"
        options={yearOptions}
      />
      <ScoreboardTable data={data} title={title} />
    </>
  )
}
