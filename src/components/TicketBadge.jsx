// Shared colors for ticket priority and status labels.
const priorityClasses = {
  Urgent: "bg-rose-50 text-rose-700",
  High: "bg-orange-50 text-orange-700",
  Medium: "bg-amber-50 text-amber-700",
};

const statusClasses = {
  Open: "bg-rose-50 text-rose-700",
  Resolved: "bg-green-50 text-green-700",
};

function TicketBadge({ children, classes, compact = false, className = "" }) {
  const sizeClasses = compact ? "px-1.5 py-0.5" : "px-2 py-1 text-[9px]";

  return (
    <span className={`rounded-full ${sizeClasses} ${classes} ${className}`}>
      {children}
    </span>
  );
}

export function PriorityBadge({ priority, compact = false }) {
  const classes = priorityClasses[priority] ?? "bg-stone-100 text-stone-600";

  return (
    <TicketBadge classes={classes} compact={compact}>
      {priority}
    </TicketBadge>
  );
}

export function StatusBadge({ status, compact = false, className = "" }) {
  const classes = statusClasses[status] ?? "bg-amber-50 text-amber-700";

  return (
    <TicketBadge classes={classes} compact={compact} className={className}>
      {status}
    </TicketBadge>
  );
}
