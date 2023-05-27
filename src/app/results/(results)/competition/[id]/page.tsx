import ResultsCard from '@/app/results/components/ResultsCard'
import { prisma } from '@/server/db'
import { getResultsByCompetition } from '@/app/results/result-utils'
const headings = ['#', 'Name', 'Time', 'Points']

/* export async function generateStaticParams() {
  const competitions = await prisma.competitions.findMany()
  return competitions.map((competition) => ({
    slug: competition.id,
  }))
} */

export default async function CompetitionResultsPage({ params }: { params: { id: string } }) {
  console.log(params)
  const data = await getResultsByCompetition(params.id)
  const formattedResults = data.map((result) => {
    const { id, competitorName = 'no name', timeMin, timeSec, points } = result
    return { id, data: [competitorName, `${timeMin}:${timeSec}`, points.toString()] }
  })
  return <ResultsCard title={'Results'} data={formattedResults} headings={headings} />
}
