import "./index.css";

export function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) {
  const variantClass =
    variant === "outline" ? "button-outline" : "button-default";
  const sizeClass =
    size === "sm"
      ? "button-sm"
      : size === "lg"
      ? "button-lg"
      : "button-default-size";

  return (
    <button
      className={`button-base ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
