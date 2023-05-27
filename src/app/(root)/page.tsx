import SelectInput from '@/components/SelectInput'
import ScoreBoard from '@/components/Scoreboard'
const yearOptions = [
  { id: 'noYear', value: '', label: 'Select a year' },
  { id: 'year1', value: '2022', label: '2022' },
  { id: 'year2', value: '2021', label: '2021' },
  { id: 'year3', value: '2020', label: '2020' },
  { id: 'year4', value: '2019', label: '2019' },
  { id: 'year5', value: '2018', label: '2018' },
]
import { getScoreboard } from '@/app/results/result-utils'

export const revalidate = 3600

export default async function Home() {
  const data = await getScoreboard(2022)
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col mt-20 items-center">
        <ScoreBoard data={data} title="Poängligan 2022" />
      </div>
    </div>
  )
}
