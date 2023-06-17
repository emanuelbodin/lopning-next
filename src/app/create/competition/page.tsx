import { getCompetitionCategories } from '@/app/results/result-utils'
import CreateCompetitionForm from './CreateCompetitionForm'
export default async function CreateModal() {
  const competitionCategories = await getCompetitionCategories()
  return (
    <div>
      <CreateCompetitionForm competitionCategories={competitionCategories} />
    </div>
  )
}
