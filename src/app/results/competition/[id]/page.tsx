import ResultsCard from '@/app/results/components/ResultsCard'
import { getResultsByCompetition } from '@/app/results/result-utils'
import { isUserAdmin } from '@/server/auth'
import { deleteCompetition } from '../../actions'
import DeleteButton from '../../DeleteButton'
const headings = ['#', 'Name', 'Time', 'Points']

// This is commented out since it seems to lead to server actions returning a 405 response
/* export async function generateStaticParams() {
  const competitions = await prisma.competition.findMany()
  return competitions.map((competition) => ({
    slug: competition.id,
  }))
} */

type Props = {
  params: { id: string }
}

export default async function CompetitionResultsPage({ params: { id } }: Props) {
  const data = await getResultsByCompetition(id)
  const formattedResults = data.map((result) => {
    const { id, competitorName = 'no name', timeMin, timeSec, points } = result
    return { id, data: [competitorName, `${timeMin}:${timeSec}`, points.toString()] }
  })
  const isAdmin = await isUserAdmin()
  return (
    <>
      <form>
        {isAdmin && (
          <DeleteButton deleteAction={deleteCompetition} id={id}>
            Delete Competition
          </DeleteButton>
        )}
      </form>
      <ResultsCard
        isAdmin={isAdmin}
        title={'Results'}
        data={formattedResults}
        headings={headings}
      />
    </>
  )
}
