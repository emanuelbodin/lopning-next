import CompetitorSelector from './CompetitorSelector'
import { getCompetitors } from '../actions'

export default async function CompetitionPageLayout({ children }: { children: React.ReactNode }) {
  const competitors = await getCompetitors()
  return (
    <div>
      <CompetitorSelector competitors={competitors} />
      {children}
    </div>
  )
}
