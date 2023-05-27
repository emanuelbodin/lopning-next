import ResultSelector from './ResultSelector'

export default async function ResultsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ResultSelector />
      {children}
    </>
  )
}
