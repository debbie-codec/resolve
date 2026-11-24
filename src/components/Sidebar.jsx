import {
  BarChart3,
  Crown,
  Layers3,
  LayoutDashboard,
  Settings,
  Ticket,
  Users,
} from "lucide-react";

const links = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Tickets", icon: Ticket, count: "128", active: true },
  { label: "Analytics", icon: BarChart3 },
  { label: "Team", icon: Users },
  { label: "Settings", icon: Settings },
];

function Sidebar({ activeView = "Tickets", onNavigate }) {
  return (
    <aside className="sticky top-0 flex h-screen w-14 shrink-0 flex-col bg-[#642d1d] px-2 py-4 text-orange-50 sm:w-16 lg:w-52 lg:px-3">
      <a href="/" className="flex items-start justify-center gap-2 border-b border-white/20 px-1 pb-4 text-inherit no-underline lg:justify-start">
        <Layers3 className="shrink-0 text-amber-300" size={25} />
        <span className="hidden lg:block">
          <strong className="block text-lg leading-tight">Resolve</strong>
          <small className="mt-1 block text-[9px] leading-tight text-orange-100">Customer Support<br />Ticket Management</small>
        </span>
      </a>

      <nav className="mt-5 grid gap-1" aria-label="Main navigation">
        {links.map(({ label, icon: Icon, count }) => (
          <button
            className={`flex h-10 items-center justify-center gap-3 rounded-lg px-2 text-left text-xs transition-colors lg:justify-start lg:px-3 ${
              label === activeView ? "bg-[#a34b32] text-white" : "text-orange-100 hover:bg-white/10"
            }`}
            key={label}
            title={label}
            onClick={() => onNavigate?.(label)}
          >
            <Icon size={18} />
            <span className="hidden flex-1 lg:block">{label}</span>
            {count && <small className="hidden rounded-full bg-orange-700 px-1.5 py-0.5 text-[9px] lg:block">{count}</small>}
          </button>
        ))}
      </nav>

      <div className="mt-auto flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 p-2 text-amber-200 lg:justify-start lg:p-3">
        <Crown size={16} />
        <span className="hidden lg:block"><strong className="block text-[10px]">Resolve Pro</strong><small className="text-[9px] text-orange-100">Enterprise Support</small></span>
      </div>
    </aside>
  );
}

export default Sidebar;
