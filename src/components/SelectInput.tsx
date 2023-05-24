"use client";
interface SelectInputProps {
  label: string;
  options: { id: string; value?: string; label: string; disabled?: boolean }[];
  selectedValue?: string;
  onChange: (value: string) => void;
}
const SelectInput = ({
  label,
  options,
  selectedValue,
  onChange,
}: SelectInputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={label} className="block mb-2 text-xs sm:text-sm">
        {label}
      </label>
      <select
        defaultValue={selectedValue}
        onChange={(event) => onChange(event.target.value)}
        id={label}
        className="bg-gray-700 text-white text-sm rounded-lg w-full p-2.5"
      >
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
