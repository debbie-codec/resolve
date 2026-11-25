import StatCard from "./StatCard";

// Draw one summary card for each item supplied by the parent page.
// The dashboard prop changes spacing and alignment for its wider layout.
function TicketStats({ stats, dashboard = false }) {
  return (
    <section className="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4" aria-label="Ticket summary">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          iconClass={stat.iconClass}
          bg={stat.bg}
          change={stat.change}
          dashboard={dashboard}
        />
      ))}
    </section>
  );
}

export default TicketStats;
