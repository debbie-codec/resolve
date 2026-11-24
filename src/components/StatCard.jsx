import { NavLink } from "react-router-dom";
import { LayoutDashboard, Ticket, Layers3 } from "lucide-react";

const linkClass = ({ isActive }) =>
  `w-full flex items-center gap-3 p-3 rounded-lg text-left font-medium transition-colors ${
    isActive ? "bg-[#a34b32] text-white" : "text-orange-100 hover:bg-white/10"
  }`;

function Sidebar() {
  return (
    <aside className="w-60 min-h-screen bg-[#642b1b] text-white flex flex-col p-5">

      {/* Brand section */}
      <div className="flex items-center gap-3 border-b border-white/20 pb-6 mb-7">
        <Layers3 size={38} className="text-[#e6ad59]" />

        <div>
          <h1 className="text-2xl font-bold tracking-wide">Resolve</h1>

          <p className="text-xs text-orange-100 mt-1">
            Customer Support
            <br />
            Ticket Management
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav aria-label="Main" className="space-y-2">
        <NavLink to="/" end className={linkClass}>
          <LayoutDashboard size={21} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/tickets" className={linkClass}>
          <Ticket size={21} />
          <span>Tickets</span>
        </NavLink>
      </nav>

    </aside>
  );
}

export default Sidebar;