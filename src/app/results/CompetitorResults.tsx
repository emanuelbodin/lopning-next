import { useState, useMemo } from 'react'

import SelectInput from '@/components/SelectInput'
import ButtonOutline from '@/components/ui/ButtonOutline'
import ResultsCard from '@/app/results/components/ResultsCard'
import { getResultsByCompetitor } from '@/server/services/result-service'

interface CompetitorResultsProps {
  isAdmin?: boolean
}

const headings = ['#', 'Type', 'Date', 'Time', 'Points']

const CompetitorResults = async ({ isAdmin }: CompetitorResultsProps) => {
  /* const [selectedCompetitorId, setSelectedCompetitorId] = useState<string | undefined>(undefined)
  const { data: competitors, isFetching: isFetchingCompetitors } = useGetCompetitors()
  const { data: competitorResults, isFetching: isFetchingCompetitorResults } =
    useGetCompetitorResults(selectedCompetitorId)
  const removeCompetitor = useRemoveCompetitor()

  const competitorOptions = useMemo(() => {
    if (!competitors.length)
      return [{ id: 'noCompetitor', value: '', label: 'Select a competitor' }]
    const options = competitors.map((competitor) => {
      return {
        id: competitor._id,
        value: competitor._id,
        label: competitor.name,
      }
    })
    options.unshift({ id: 'noCompetitor', value: '', label: 'Select a competitor' })
    return options
  }, [competitors])

  const onDeleteCompetitor = async (id: string) => {
    await removeCompetitor.mutate(id)
    setSelectedCompetitorId(undefined)
  }

  const isLoading =
    isFetchingCompetitorResults || removeCompetitor.isLoading || isFetchingCompetitors

  const formattedResults = useMemo(() => {
    if (!selectedCompetitorId) return []
    return competitorResults.map((result) => {
      const { _id, competitionType, competitionDate, timeMin, timeSec, points } = result
      return {
        id: _id,
        data: [competitionType, competitionDate, `${timeMin}:${timeSec}`, points.toString()],
      }
    })
  }, [competitorResults]) */

  const data = await getResultsByCompetitor('5d1db7f9810d0200179ea0fa')
  const formattedResults = data.map((result) => {
    const { id, competitionType, competitionDate, timeMin, timeSec, points } = result
    return {
      id,
      data: [competitionType, competitionDate, `${timeMin}:${timeSec}`, points.toString()],
    }
  })

  return (
    <>
      <div>
        {/*     <SelectInput
          onChange={setSelectedCompetitorId}
          label="Competitor"
          options={competitorOptions}
        /> */}
      </div>
      {/*   {selectedCompetitorId && isAdmin && (
        <ButtonOutline type="danger" onClick={() => onDeleteCompetitor(selectedCompetitorId ?? '')}>
          Delete Competitor
        </ButtonOutline>
      )} */}
      <ResultsCard title={'Results'} data={formattedResults} headings={headings} />
    </>
  )
}

export default CompetitorResults
