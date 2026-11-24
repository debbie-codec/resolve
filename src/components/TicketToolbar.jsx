import { Plus, Search, SlidersHorizontal } from "lucide-react";

function TicketToolbar({ search, onSearch, status, onStatus, priority, onPriority, showFilters, onToggleFilters, onNewTicket }) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-3">
      <label className="flex h-8 min-w-52 flex-1 items-center gap-2 rounded-md border border-stone-200 px-2 text-stone-400">
        <Search size={14} />
        <input aria-label="Search tickets by title or description" value={search} onChange={(event) => onSearch(event.target.value)} className="w-full text-[11px] text-stone-700 outline-none" placeholder="Search tickets by title or description..." />
        <kbd className="rounded border border-stone-200 px-1 text-[8px]">⌘ K</kbd>
      </label>
      <select aria-label="Filter by status" value={status} onChange={(event) => onStatus(event.target.value)} className="form-control h-8 px-2 text-[10px]">
        <option>All</option><option>Open</option><option>In Progress</option><option>Resolved</option>
      </select>
      <select aria-label="Filter by priority" value={priority} onChange={(event) => onPriority(event.target.value)} className="form-control h-8 px-2 text-[10px]">
        <option>All</option><option>Urgent</option><option>High</option><option>Medium</option><option>Low</option>
      </select>
      <button onClick={onToggleFilters} className={`flex h-8 items-center gap-1 rounded-md border px-2 text-[10px] ${showFilters ? "border-[#a34b32] bg-[#fff7f3] text-[#a34b32]" : "border-stone-200"}`}>
        <SlidersHorizontal size={12} /> View Filters
      </button>
      <button onClick={onNewTicket} className="primary-button ml-auto h-8">
        <Plus size={13} /> New Ticket
      </button>
    </div>
  );
}

export default TicketToolbar;
