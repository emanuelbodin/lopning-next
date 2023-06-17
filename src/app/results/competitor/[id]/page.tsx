import ResultsCard from '@/app/results/components/ResultsCard'
import { getResultsByCompetitor } from '@/app/results/result-utils'
import DeleteButton from '../../DeleteButton'
import { isUserAdmin } from '@/server/auth'
import { deleteCompetitor } from '../../actions'
const headings = ['#', 'Type', 'Date', 'Time', 'Points']

// This is commented out since it seems to lead to server actions returning a 405 response
/* export async function generateStaticParams() {
  const competitors = await prisma.competitor.findMany()
  return competitors.map((competitor) => ({
    slug: competitor.id,
  }))
} */

type Props = {
  params: { id: string }
}

const CompetitorResultsPage = async ({ params: { id } }: Props) => {
  const data = await getResultsByCompetitor(id)
  const formattedResults = data.map((result) => {
    const { id, competitionType, competitionDate, timeMin, timeSec, points } = result
    return {
      id,
      data: [competitionType, competitionDate, `${timeMin}:${timeSec}`, points.toString()],
    }
  })
  const isAdmin = await isUserAdmin()

  return (
    <>
      <form>
        {isAdmin && (
          <DeleteButton deleteAction={deleteCompetitor} id={id}>
            Delete Competition
          </DeleteButton>
        )}
      </form>
      <ResultsCard title={'Results'} data={formattedResults} headings={headings} />
    </>
  )
}

export default CompetitorResultsPage
