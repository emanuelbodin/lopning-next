import CompetitorSelector from './CompetitorSelector'
import { getCompetitors } from '../result-utils'

export default async function CompetitionPageLayout({ children }: { children: React.ReactNode }) {
  const competitors = await getCompetitors()
  return (
    <div>
      <CompetitorSelector competitors={competitors} />
      {children}
    </div>
  )
}
