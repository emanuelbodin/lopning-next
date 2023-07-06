import { getCompetitionCategories } from '@/app/results/actions'
import CreateCompetitionForm from './CreateCompetitionForm'
export default async function CreateModal() {
  const competitionCategories = await getCompetitionCategories()
  return (
    <div>
      <CreateCompetitionForm competitionCategories={competitionCategories} />
    </div>
  )
}
