import ResultTabNavigator from './components/ResultTabNavigator'
const ResultsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center pt-20 w-10/12 mx-auto">
      <ResultTabNavigator />
      {children}
    </div>
  )
}

export default ResultsLayout
