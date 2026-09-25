import { LucideIcon } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  icon?: LucideIcon;
  required?: boolean;
  disabled?: boolean;
}

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "-- Pilih --",
  required,
  disabled,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-black disabled:bg-gray-200 disabled:text-gray-400"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}