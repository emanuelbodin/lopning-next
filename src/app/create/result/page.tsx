import CreateResultForm from './CreateResultForm'
import { getCompetitionCategories, getCompetitors } from '@/app/results/actions'

export default async function CreateModal() {
  const competitionCategoriesPromise = getCompetitionCategories()
  const competitorsPromise = getCompetitors()
  const [competitionCategories, competitors] = await Promise.all([
    competitionCategoriesPromise,
    competitorsPromise,
  ])

  return (
    <CreateResultForm competitionCategories={competitionCategories} competitors={competitors} />
  )
}
