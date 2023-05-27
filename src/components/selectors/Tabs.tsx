import classnames from 'classnames'

interface TabsProps {
  tabOptions: string[]
  activeTab: string
  onChange: (tabOption: string) => void
}
const Tabs = ({ tabOptions, activeTab, onChange }: TabsProps) => {
  return (
    <>
      <div className="hidden">
        <label htmlFor="tabs" className="sr-only">
          Select your country
        </label>
        <select>
          {tabOptions.map((tabOption, index) => (
            <option key={tabOption + index}>{tabOption}</option>
          ))}
        </select>
      </div>
      <ul className="text-sm font-medium text-center text-gray-500 rounded-lg divide-gray-200 shadow flex">
        {tabOptions.map((tabOption, index) => (
          <li
            className={classnames(
              'w-full inline-block p-4 first:rounded-l-lg last:rounded-r-lg cursor-pointer',
              { 'bg-gray-800': activeTab === tabOption, 'bg-gray-900': activeTab !== tabOption }
            )}
            onClick={() => onChange(tabOption)}
            key={tabOption + index}>
            <a href="#" aria-current="page">
              {tabOption}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Tabs
