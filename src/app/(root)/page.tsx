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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col mt-20 items-center">
        <div className="w-1/2 md:w-1/4">{/* <SelectInput /> */}</div>
      </div>
    </main>
  )
}
