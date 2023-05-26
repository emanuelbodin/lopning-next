import classnames from 'classnames'
import { scoreboardRow } from '@/types/results'

interface ScoreBoardRowProps {
  data: scoreboardRow
  placement: number
}

const ScoreboardRow = ({ data, placement }: ScoreBoardRowProps) => {
  return (
    <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
      <td>
        <div
          className={classnames(
            'rounded-full w-4 h-4 text-xs sm:text-sm sm:w-7 sm:h-7 flex justify-center items-center mx-auto',
            {
              'bg-yellow-500 text-black': placement === 1,
              'bg-slate-500 text-black': placement === 2,
              'bg-amber-500 text-black': placement === 3,
            }
          )}>
          {placement}
        </div>
      </td>
      <td>
        <div className="sm:ml-3 font-semibold">{data.competitorName}</div>
      </td>
      <td className="sm:py-4 sm:px-6 text-center">{data.numberOfCompetitions}</td>
      <td className="sm:py-4 sm:px-6 text-center">{data.points}</td>
    </tr>
  )
}

export default ScoreboardRow
