import { useState } from "react";
import { Eye, EyeOff, LucideIcon } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export default function InputField({ 
  label, 
  icon: Icon, 
  error, 
  type = "text", 
  ...props 
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5 mb-4">
      <label className="text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <input
          type={inputType}
          className={`w-full bg-gray-50 border rounded-xl py-2.5 outline-none transition-all text-sm text-black
            [&::-ms-reveal]:hidden [&::-ms-clear]:hidden 
            ${Icon ? "pl-10" : "pl-4"} 
            ${isPassword ? "pr-10" : "pr-4"}
            ${error 
              ? "border-red-500 focus:ring-2 focus:ring-red-200" 
              : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      
      {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
    </div>
  );
}