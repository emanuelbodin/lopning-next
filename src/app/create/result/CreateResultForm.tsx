'use client'
import { useState, useEffect, useMemo } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import classnames from 'classnames'
import { Competitor, Competition, CompetitionCategory } from '@prisma/client'

import TextInput from '@components/form/TextInput'
import FormSelect from '@components/form/SelectInput'
import Spinner from '@components/Spinner'
import ButtonOutline from '@components/ui/ButtonOutline'
import SelectInput from '@components/selectors/SelectInput'

const validationSchema = z.object({
  competitionId: z.string(),
  competitorId: z.string(),
  timeMin: z.number(),
  timeSec: z.number(),
  points: z.number(),
})
type ValidationSchema = z.infer<typeof validationSchema>

type Props = {
  competitionCategories: CompetitionCategory[]
  competitors: Competitor[]
}

const defaultCompetitonOption = [{ id: 'noCompetition', value: '', label: 'Select a competition' }]
const defaultCompetitorOption = [{ id: 'noCompetitor', value: '', label: 'Select a competitor' }]

export default function CreateResultForm({ competitionCategories, competitors }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCompetitionType, setSelectedCompetitionType] = useState<string>('')
  const categoryOptions = competitionCategories.map((category) => ({
    id: category.id,
    value: category.id,
    label: category.name,
  }))
  categoryOptions.unshift(...defaultCompetitonOption)
  const competitorOptions = competitors.map((competitor) => ({
    id: competitor.id,
    value: competitor.id,
    label: competitor.name,
  }))
  competitorOptions.unshift(...defaultCompetitorOption)

  const [competitions, setCompetitions] = useState<Competition[]>([])
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  useEffect(() => {
    const fetchCompetitions = async () => {
      setIsLoading(true)
      const res = await fetch('/api/competition')
      const data = await res.json()
      setCompetitions(data.data)
      setIsLoading(false)
    }
    if (selectedCompetitionType !== '') fetchCompetitions()
  }, [selectedCompetitionType])

  const competitionOptions = useMemo(() => {
    if (!competitions.length)
      return [{ id: 'noCompetition', value: '', label: 'Select a competition' }]
    const sortedCompetitions = [...competitions].sort(
      (a, b) => new Date(b.date).getTime() - +new Date(a.date).getTime()
    )
    const options = sortedCompetitions.map((competition) => {
      const date = competition.date.toString().split('T')[0]
      return { id: competition.id, value: competition.id, label: date }
    })
    options.unshift({ id: 'noCompetition', value: '', label: 'Select a competition' })
    return options
  }, [competitions])

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    setIsLoading(true)
    await fetch('/api/result', { method: 'POST', body: JSON.stringify(data) })
    setIsLoading(false)

    setValue('points', 0)
    setValue('timeMin', 0)
    setValue('timeSec', 0)
    setValue('competitorId', '')
  }

  return (
    <div className="w-full max-w-xs text-slate-50 relative">
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 z-10">
          <Spinner />
        </div>
      )}
      <h2 className="text-lg font-bold my-5">Create a new result</h2>
      <form
        className={classnames(
          'bg-gray-800',
          'shadow-md',
          'rounded',
          'px-8',
          'pt-6',
          'pb-8',
          'mb-4',
          { 'blur-sm': isLoading }
        )}
        onSubmit={handleSubmit(onSubmit)}>
        <SelectInput
          onChange={setSelectedCompetitionType}
          label="Competition type"
          options={categoryOptions}
        />
        <FormSelect
          {...register('competitionId')}
          label="Competition"
          errorMessage={errors.competitionId?.message}
          options={competitionOptions}
        />
        <FormSelect
          {...register('competitorId')}
          label="Competitor"
          errorMessage={errors.competitorId?.message}
          options={competitorOptions}
        />
        <div className="flex gap-2">
          <TextInput
            {...register('timeMin', { valueAsNumber: true })}
            label="Minutes"
            type="number"
            errorMessage={errors.timeMin?.message}
          />
          <TextInput
            {...register('timeSec', { valueAsNumber: true })}
            label="Seconds"
            type="number"
            errorMessage={errors.timeSec?.message}
          />
          <TextInput
            {...register('points', { valueAsNumber: true })}
            label="Points"
            type="number"
            errorMessage={errors.points?.message}
          />
        </div>
        <div className="flex justify-center">
          <ButtonOutline type="success">Submit</ButtonOutline>
        </div>
      </form>
    </div>
  )
}
