import Modal from '@/components/ui/Modal'

import { getScoreboard } from './scoreboard-utils'
import Scoreboard from './Scoreboard'
import { getYears } from './scoreboard-utils'

export const revalidate = 3600

export default async function Home() {
  const availableYears = await getYears()
  const data = await getScoreboard(parseInt(availableYears[availableYears.length - 1]))
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col mt-20 items-center">
        <Scoreboard availableYears={availableYears} initialData={data} />
        <Modal />
      </div>
    </div>
  )
}
