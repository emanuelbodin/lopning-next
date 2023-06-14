import { forwardRef } from 'react'

interface SelectFormInputProps extends React.PropsWithoutRef<JSX.IntrinsicElements['select']> {
  label: string
  errorMessage: string | undefined
  options: { id: string; value?: string; label: string; disabled?: boolean }[]
}

const SelectInput = forwardRef<HTMLSelectElement, SelectFormInputProps>(
  ({ label, errorMessage, options, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label htmlFor={label} className="block mb-2 text-sm font-medium">
          {label}
        </label>
        <select
          id={label}
          ref={ref}
          {...props}
          className="bg-gray-700 text-white text-sm rounded-lg w-full p-2.5">
          {options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
      </div>
    )
  }
)

SelectInput.displayName = 'SelectInput'

export default SelectInput
