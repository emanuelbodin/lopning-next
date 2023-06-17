import Card from '@/components/ui/Card'
import ResultsTable from './ResultsTable'

interface ResultCardProps {
  title: string
  data: { id: string; data: string[] }[]
  isAdmin?: boolean
  headings: string[]
}
const ResultsCard = ({ title, data, isAdmin, headings }: ResultCardProps) => {
  return (
    <Card title={title}>
      <ResultsTable headings={headings} data={data} isAdmin={isAdmin} />
    </Card>
  )
}

export default ResultsCard
