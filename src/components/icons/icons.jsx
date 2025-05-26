export function Filter({ className = "", ...props }) {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
    </svg>
  );
}

export function Star({ className = "", filled = false, ...props }) {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

export function ChevronDown({ className = "", ...props }) {
  return (
    <svg
      className={`w-4 h-4 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <polyline points="6,9 12,15 18,9" />
    </svg>
  );
}
