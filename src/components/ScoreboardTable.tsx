import TableHeading from '@/components/TableHeading'
import ScoreBoardTableRow from './ScoreboardRow'
import { scoreboardRow } from '@/types/results'
interface TableProps {
  headings: string[]
  data: scoreboardRow[]
}

const ScoreBoardTable = ({ headings, data }: TableProps) => {
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
          <ScoreBoardTableRow key={item.competitorName + index} placement={index + 1} data={item} />
        ))}
      </tbody>
    </table>
  )
}

export default ScoreBoardTable
