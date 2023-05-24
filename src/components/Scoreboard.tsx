import { useState, useMemo } from 'react'
import classnames from 'classnames'

import ScoreBoardTable from '@/components/ScoreboardTable'
import Card from '@/components/Card'
import Pagination from '@/components/Pagination'
import Spinner from '@/components/Spinner'
import useGetScoreboard from '@/hooks/useGetScoreboard'

interface ScoreBoardProps {
  title: string
  selectedYear: string | undefined
}

const ScoreBoard = ({ title, selectedYear }: ScoreBoardProps) => {
  const { data: scoreboardData, isFetching } = useGetScoreboard(selectedYear)

  const headings = ['#', 'name', '# of competitions', 'points']

  const [currentPage, setCurrentPage] = useState<number>(0)
  const pageSize = 10

  const paginatedData = useMemo(() => {
    return scoreboardData.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  }, [currentPage, scoreboardData])

  return (
    <Card title={title}>
      <div className={classnames('relative', { 'blur-sm': isFetching })}>
        {isFetching && (
          <div className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 z-10">
            <Spinner />
          </div>
        )}
        <ScoreBoardTable headings={headings} data={paginatedData} />
        <Pagination
          changePage={setCurrentPage}
          pageSize={pageSize}
          currentPage={currentPage}
          totalCount={scoreboardData.length}
        />
      </div>
    </Card>
  )
}

export default ScoreBoard
