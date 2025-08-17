import React, { useState } from "react";
import PropTypes from "prop-types";
import { Eye, EyeOff, X } from "lucide-react";

const InputField = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable,
  passwordToggle,
  theme = "light",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const baseStyles =
    "w-full rounded-2xl border transition-all focus:ring-2 disabled:opacity-50";
  const variantStyles = {
    outlined: "border-gray-300 bg-transparent focus:ring-blue-500",
    filled: "bg-gray-100 border-gray-200 focus:ring-blue-500",
    ghost: "border-transparent bg-transparent focus:ring-blue-500",
  };
  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  };

  const themeStyles =
    theme === "dark"
      ? "bg-gray-800 text-white placeholder-gray-400"
      : "bg-white text-black placeholder-gray-500";

  const inputType =
    passwordToggle && !showPassword ? "password" : type || "text";

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="font-medium text-sm mb-1" aria-label={label}>
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${themeStyles} ${
            invalid ? "border-red-500 focus:ring-red-500" : ""
          }`}
        />

        {/* Clear Button */}
        {clearable && value && (
          <button
            type="button"
            onClick={() => onChange({ target: { value: "" } })}
            className="absolute right-2 text-gray-500 hover:text-black"
            aria-label="Clear input"
          >
            <X size={18} />
          </button>
        )}

        {/* Password Toggle */}
        {passwordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 text-gray-500 hover:text-black"
            aria-label="Toggle password"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {/* Helper/Error Text */}
      {invalid && errorMessage ? (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      ) : (
        helperText && <span className="text-gray-500 text-sm">{helperText}</span>
      )}
    </div>
  );
};

InputField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  helperText: PropTypes.string,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  variant: PropTypes.oneOf(["filled", "outlined", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  type: PropTypes.string,
  clearable: PropTypes.bool,
  passwordToggle: PropTypes.bool,
  theme: PropTypes.oneOf(["light", "dark"]),
};

export default InputField;
