import "./index.css";

export function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}) {
  const variantClass = variant === "new" ? "badge-new" : "badge-default";

  return (
    <span className={`badge-base ${variantClass} ${className}`} {...props}>
      {children}
    </span>
  );
}
