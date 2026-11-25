// A small reusable card for a label and number.
// Icon, iconClass, and bg are Tailwind class names supplied by the parent.
function StatCard({
  label,
  value,
  icon: Icon,
  iconClass = "",
  bg = "bg-stone-100",
  iconSize = 18,
  labelClassName = "text-xs",
  valueClassName = "mt-1 block text-2xl leading-none",
  dashboard = false,
  change,
}) {
  const alignment = dashboard ? "items-start" : "items-center";

  return (
    <article className={`surface-panel flex ${alignment} gap-3 p-4`}>
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${bg} ${iconClass}`}>
        {Icon && <Icon size={iconSize} />}
      </span>
      <div>
        <p className={`${labelClassName} text-stone-500`}>{label}</p>
        <strong className={valueClassName}>{value}</strong>
        {change && (
          <small className={`mt-2 flex items-center text-[10px] ${change.startsWith("+") ? "text-green-600" : "text-rose-500"}`}>
            {change.startsWith("+") ? "↗ " : "↘ "}{change} vs. last 7 days
          </small>
        )}
      </div>
    </article>
  );
}

export default StatCard;