import ResultsCard from '@/app/results/components/ResultsCard'
import { prisma } from '@/server/db'
import { getResultsByCompetitor } from '@/app/results/result-utils'
const headings = ['#', 'Type', 'Date', 'Time', 'Points']

export async function generateStaticParams() {
  const competitors = await prisma.competitors.findMany()
  return competitors.map((competitor) => ({
    slug: competitor.id,
  }))
}

const CompetitorResultsPage = async ({ params }: { params: { id: string } }) => {
  const data = await getResultsByCompetitor(params.id)
  const formattedResults = data.map((result) => {
    const { id, competitionType, competitionDate, timeMin, timeSec, points } = result
    return {
      id,
      data: [competitionType, competitionDate, `${timeMin}:${timeSec}`, points.toString()],
    }
  })
  return <ResultsCard title={'Results'} data={formattedResults} headings={headings} />
}

export default CompetitorResultsPage
