import TableHeading from '@/components/TableHeading'
import ResultTableRow from './ResultsTableRow'

interface TableProps {
  headings: string[]
  data: { id: string; data: string[] }[]
  canDelete?: boolean
  onDeleteResult?: (id: string) => void
}

const ResultsTable = ({ headings, data, canDelete, onDeleteResult }: TableProps) => {
  return (
    <table className="w-full text-sm text-left text-gray-400">
      <TableHeading headings={headings} />
      <tbody>
        {!data.length && (
          <tr className="text-center">
            <td colSpan={4}>No data</td>
          </tr>
        )}
        {data.map((item, index) => (
          <ResultTableRow
            key={item.id}
            id={item.id}
            placement={index + 1}
            data={item.data}
            canDelete={canDelete}
            onDelete={onDeleteResult}
          />
        ))}
      </tbody>
    </table>
  )
}

export default ResultsTable
