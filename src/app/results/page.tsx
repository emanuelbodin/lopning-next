//import { useState } from 'react'
import Tabs from '@/components/selectors/Tabs'
//import CompetitionResultsContainer from './competition-results/CompetitionResultsContainer'
import CompetitorResults from './CompetitorResults'

const ResultsPage = async () => {
  const tabOptions = ['Competition', 'Competitor']
  //const [activeTab, setActiveTab] = useState(tabOptions[0])
  const activeTab = tabOptions[1]

  return (
    <div className="flex flex-col items-center pt-20 w-10/12 mx-auto">
      <div className="mb-10">
        <p className="mt-5">Filter result by competition or competitor</p>
      </div>
    </div>
  )
}

export default ResultsPage
