import Card from '@/components/ui/Card'
import ResultsTable from './ResultsTable'

interface ResultCardProps {
  title: string
  data: { id: string; data: string[] }[]
  canDelete?: boolean
  onDeleteResult?: (id: string) => void
  headings: string[]
}
const ResultsCard = ({ title, data, canDelete, onDeleteResult, headings }: ResultCardProps) => {
  return (
    <Card title={title}>
      <ResultsTable
        headings={headings}
        data={data}
        canDelete={canDelete}
        onDeleteResult={onDeleteResult}
      />
    </Card>
  )
}

export default ResultsCard
