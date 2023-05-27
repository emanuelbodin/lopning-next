import classnames from 'classnames'

interface ResultTableRowProps {
  data: string[]
  id: string
  placement: number
  canDelete?: boolean
  onDelete?: (id: string) => void
}

const ResultTableRow = ({
  data,
  id,
  placement,
  canDelete,
  onDelete = () => undefined,
}: ResultTableRowProps) => {
  return (
    <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600 w-full">
      <td>
        <div
          className={classnames(
            'rounded-full w-4 h-4 m-1 md:my-2 md:w-7 md:h-7 text-xs md:text-lg flex justify-center items-center mx-auto',
            {
              'bg-yellow-500 text-black': placement === 1,
              'bg-slate-500 text-black': placement === 2,
              'bg-amber-500 text-black': placement === 3,
            }
          )}>
          {placement}
        </div>
      </td>
      {data.map((dataEntity) => (
        <td key={dataEntity + id}>
          <div className="text-center px-2 font-semibold">{dataEntity}</div>
        </td>
      ))}
      {canDelete && (
        <td className="py-4 px-6 text-center">
          <a
            onClick={() => onDelete(id)}
            className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
            Delete
          </a>
        </td>
      )}
    </tr>
  )
}

export default ResultTableRow
