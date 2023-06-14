import { forwardRef } from 'react'
interface FormInputProps extends React.PropsWithoutRef<JSX.IntrinsicElements['input']> {
  label: string
  errorMessage: string | undefined
  id?: string
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, errorMessage, id, ...props }, ref) => {
    return (
      <div className="relative z-0 mb-6 w-full group">
        <input
          id={id}
          ref={ref}
          {...props}
          className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 text-white border-gray-600 focus:border-indigo-700 focus:outline-none focus:ring-0 peer"
          placeholder=""
          autoComplete="off"
        />
        <label
          htmlFor={id}
          className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-indigo-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          {label}
        </label>
        {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
      </div>
    )
  }
)

FormInput.displayName = 'FormInput'

export default FormInput
