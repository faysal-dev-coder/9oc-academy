"use client";

import { useState, forwardRef, useId } from "react";
import { Eye, EyeOff, Search, AlertCircle } from "lucide-react";

// ─────────────────────────────────────────────
//  SIZE STYLES
// ─────────────────────────────────────────────
const sizeStyles = {
  sm: "h-8 text-xs",
  md: "h-10 text-sm",
  lg: "h-12 text-base",
};

// padding adjusts based on icon presence
const paddingStyles = {
  sm: {
    none: "px-3",
    left: "pl-9 pr-3",
    right: "pl-3 pr-9",
    both: "pl-9 pr-9",
  },
  md: {
    none: "px-3.5",
    left: "pl-10 pr-3.5",
    right: "pl-3.5 pr-10",
    both: "pl-10 pr-10",
  },
  lg: {
    none: "px-4",
    left: "pl-11 pr-4",
    right: "pl-4 pr-11",
    both: "pl-11 pr-11",
  },
};

// icon container positioning
const iconPositionStyles = {
  sm: {
    left: "left-2.5",
    right: "right-2.5",
  },
  md: {
    left: "left-3",
    right: "right-3",
  },
  lg: {
    left: "left-3.5",
    right: "right-3.5",
  },
};

const iconSizes = {
  sm: 14,
  md: 16,
  lg: 18,
};

// ─────────────────────────────────────────────
//  INPUT COMPONENT
// ─────────────────────────────────────────────
const Input = forwardRef(function Input(
  {
    // content
    label,
    helper,
    error,
    placeholder,
    // type
    type = "text",
    variant = "default",
    size = "md",
    // icons
    icon: LeftIcon,
    rightIcon: RightIcon,
    // state
    required = false,
    disabled = false,
    // html attrs
    name,
    value,
    defaultValue,
    onChange,
    onBlur,
    className = "",
    ...rest
  },
  ref
) {
  // unique id for label-input association
  const generatedId = useId();
  const inputId = rest.id || generatedId;

  // password show/hide state
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  // search variant → auto-inject search icon
  const FinalLeftIcon = variant === "search" && !LeftIcon ? Search : LeftIcon;

  // password → auto-inject eye toggle (overrides rightIcon)
  const showPasswordToggle = isPassword;

  // figure out which padding to use
  const hasLeft = !!FinalLeftIcon;
  const hasRight = !!RightIcon || showPasswordToggle;
  const paddingKey = hasLeft && hasRight ? "both" : hasLeft ? "left" : hasRight ? "right" : "none";

  const iconSize = iconSizes[size];

  return (
    <div className="w-full">
      {/* ── LABEL (English) ── */}
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
          {required && (
            <span className="text-red-500 ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* ── INPUT WRAPPER (relative for icons) ── */}
      <div className="relative">
        {/* Left Icon */}
        {FinalLeftIcon && (
          <div
            className={[
              "absolute top-1/2 -translate-y-1/2 pointer-events-none",
              iconPositionStyles[size].left,
              error ? "text-red-400" : "text-slate-400",
            ].join(" ")}
          >
            <FinalLeftIcon size={iconSize} />
          </div>
        )}

        {/* INPUT */}
        <input
          ref={ref}
          id={inputId}
          type={inputType}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
          className={[
            // base
            "w-full bg-white text-slate-900 placeholder:text-slate-400",
            "border rounded-lg",
            "transition-all duration-150 ease-out",
            "outline-none",

            // size + padding
            sizeStyles[size],
            paddingStyles[size][paddingKey],

            // state: border + focus + ring
            error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-slate-300 hover:border-slate-400 focus:border-brand-700 focus:ring-2 focus:ring-brand-100",

            // disabled
            disabled ? "bg-slate-50 text-slate-500 cursor-not-allowed opacity-70" : "",

            // custom
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        />

        {/* Right Icon / Password Toggle */}
        {showPasswordToggle ? (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            disabled={disabled}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className={[
              "absolute top-1/2 -translate-y-1/2",
              "text-slate-400 hover:text-slate-600",
              "transition-colors duration-150",
              "cursor-pointer disabled:cursor-not-allowed",
              iconPositionStyles[size].right,
            ].join(" ")}
          >
            {showPassword ? <EyeOff size={iconSize} /> : <Eye size={iconSize} />}
          </button>
        ) : (
          RightIcon && (
            <div
              className={[
                "absolute top-1/2 -translate-y-1/2 pointer-events-none",
                iconPositionStyles[size].right,
                error ? "text-red-400" : "text-slate-400",
              ].join(" ")}
            >
              <RightIcon size={iconSize} />
            </div>
          )
        )}
      </div>

      {/* ── ERROR MESSAGE (Bengali) ── */}
      {error && (
        <div id={`${inputId}-error`} className="flex items-start gap-1.5 mt-1.5">
          <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-red-600 leading-relaxed">{error}</p>
        </div>
      )}

      {/* ── HELPER TEXT (Bengali) — hide if error ── */}
      {!error && helper && (
        <p id={`${inputId}-helper`} className="text-xs text-slate-500 mt-1.5 leading-relaxed">
          {helper}
        </p>
      )}
    </div>
  );
});

export default Input;
