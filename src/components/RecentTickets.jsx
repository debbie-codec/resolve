import { ArrowRight, Ticket } from "lucide-react";
import { formatTicketDate } from "../data/tickets";
import { PriorityBadge, StatusBadge } from "./TicketBadge";

// RecentTickets shows only the first five rows and lets the user open or view all tickets.
function RecentTickets({ tickets, onViewAll, onOpenTicket }) {
  return (
    <section className="surface-panel p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ticket size={15} className="text-[#a34b32]" />
          <div>
            <h2 className="text-xs font-bold">Recent Tickets</h2>
            <p className="text-[9px] text-stone-500">
              Latest customer support tickets across your team
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="flex items-center gap-1 text-[9px] text-[#a34b32]"
        >
          View All Tickets <ArrowRight size={11} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[690px] text-left text-[9px]">
          <thead className="bg-[#f7f1e9] text-[8px] text-stone-600">
            <tr>
              {["Ticket #", "Title", "Customer", "Priority", "Status", "Assignee", "Updated"].map((heading) => (
                <th className="px-2 py-1.5 font-semibold" key={heading}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Show just the first five tickets, keeping the order provided by the parent. */}
            {tickets.slice(0, 5).map((ticket) => (
              <tr
                key={ticket.id}
                role="button"
                tabIndex={0}
                className="cursor-pointer border-b border-stone-100 last:border-0 hover:bg-[#fdfbf8] focus:bg-[#fdfbf8] focus:outline-none"
                onClick={() => onOpenTicket?.(ticket)}
                onKeyDown={(event) => {
                  // Let keyboard users open a ticket with Enter or Space, like a click.
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onOpenTicket?.(ticket);
                  }
                }}
              >
                <td className="whitespace-nowrap px-2 py-1.5 font-bold text-[#a34b32]">
                  {ticket.id}
                </td>
                <td className="max-w-40 truncate px-2 py-1.5">{ticket.title}</td>
                <td className="px-2 py-1.5 text-stone-600">{ticket.customer}</td>
                <td className="px-2 py-1.5">
                  <PriorityBadge priority={ticket.priority} compact />
                </td>
                <td className="px-2 py-1.5">
                  <StatusBadge status={ticket.status} compact className="whitespace-nowrap" />
                </td>
                <td className="whitespace-nowrap px-2 py-1.5">
                  <span className="inline-flex items-center gap-1">
                    <i className="grid h-5 w-5 place-items-center rounded-full bg-[#d7c2ae] text-[7px] not-italic">
                      {ticket.avatar}
                    </i>
                    {ticket.assignee}
                  </span>
                </td>
                <td className="whitespace-nowrap px-2 py-1.5 text-stone-500">
                  {formatTicketDate(ticket.updatedAt)}
                </td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-stone-500">
                  No tickets yet. Create a ticket to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecentTickets;
