function TicketStats({ stats, dashboard = false }) {
  return (
    <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ticket summary">
      {stats.map(({ label, value, change, icon: Icon, iconClass, bg }) => (
        <article className={`surface-panel flex ${dashboard ? "items-start gap-3 p-4" : "items-center p-4"}`} key={label}>
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${bg} ${iconClass} ${dashboard ? "" : "mr-3"}`}><Icon size={18} /></span>
          <div>
            <p className="text-xs text-stone-500">{label}</p>
            <strong className="mt-1 block text-2xl leading-none">{value}</strong>
            {change && (
              <small className={`mt-2 flex items-center text-[10px] ${change.startsWith("+") ? "text-green-600" : "text-rose-500"}`}>
                {change.startsWith("+") ? "↗ " : "↘ "}{change} vs. last 7 days
              </small>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}

export default TicketStats;
