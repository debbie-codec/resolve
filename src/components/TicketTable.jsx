import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { formatTicketDate } from "../data/tickets";

function priorityClass(priority) {
  if (priority === "Urgent") return "bg-rose-50 text-rose-700";
  if (priority === "High") return "bg-orange-50 text-orange-700";
  if (priority === "Medium") return "bg-amber-50 text-amber-700";
  return "bg-stone-100 text-stone-600";
}

function statusClass(status) {
  if (status === "Open") return "bg-rose-50 text-rose-700";
  if (status === "Resolved") return "bg-green-50 text-green-700";
  return "bg-amber-50 text-amber-700";
}

function TicketTable({ tickets, selected, allSelected, onToggleAll, onToggleSelected, onOpenTicket, onDeleteTicket }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1050px] text-left text-[11px]">
        <thead className="border-y border-stone-100 bg-[#faf7f2] text-[9px] text-stone-600">
          <tr>
            <th className="w-9 px-3 py-2"><input checked={allSelected} onChange={onToggleAll} type="checkbox" className="accent-[#a34b32]" aria-label="Select all tickets" /></th>
            {["Ticket #", "Title", "Customer / Company", "Category", "Priority", "Status", "Assignee", "Created", ""].map((heading) => <th className="px-2 py-2 font-semibold" key={heading || "menu"}>{heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr onClick={() => onOpenTicket?.(ticket)} className="cursor-pointer border-b border-stone-100 last:border-0 hover:bg-[#fdfbf8]" key={ticket.id}>
              <td className="px-3 py-2"><input checked={selected.includes(ticket.id)} onClick={(event) => event.stopPropagation()} onChange={() => onToggleSelected(ticket.id)} type="checkbox" className="accent-[#a34b32]" aria-label={`Select ${ticket.id}`} /></td>
              <td className="px-2 py-2 font-bold text-[#b94d34]">{ticket.id}</td>
              <td className="max-w-48 px-2 py-2"><button type="button" onClick={(event) => { event.stopPropagation(); onOpenTicket?.(ticket); }} className="block max-w-full truncate text-left font-medium text-[#8e3d29] underline-offset-2 hover:underline">{ticket.title}</button></td>
              <td className="px-2 py-2 text-stone-600"><span className="mr-1 text-stone-400">▱</span>{ticket.customer}</td>
              <td className="px-2 py-2 text-stone-600">{ticket.category}</td>
              <td className="px-2 py-2"><span className={`rounded-full px-2 py-1 text-[9px] ${priorityClass(ticket.priority)}`}>{ticket.priority}</span></td>
              <td className="px-2 py-2"><span className={`rounded-full px-2 py-1 text-[9px] ${statusClass(ticket.status)}`}>{ticket.status}</span></td>
              <td className="px-2 py-2"><span className="inline-flex items-center gap-1.5"><i className="grid h-6 w-6 place-items-center rounded-full bg-[#d7c2ae] text-[8px] font-semibold not-italic text-[#5c4638]">{ticket.avatar}</i>{ticket.assignee}</span></td>
              <td className="whitespace-nowrap px-2 py-2 text-stone-500">{formatTicketDate(ticket.createdAt)}</td>
              <td className="relative px-2 py-2">
                <button
                  type="button"
                  aria-label={`More options for ${ticket.id}`}
                  aria-expanded={openMenuId === ticket.id}
                  onClick={(event) => {
                    event.stopPropagation();
                    setOpenMenuId((current) => current === ticket.id ? null : ticket.id);
                  }}
                >
                  <MoreHorizontal size={15} />
                </button>
                {openMenuId === ticket.id && (
                  <div role="menu" className="absolute right-2 top-8 z-10 min-w-32 rounded-md border border-stone-200 bg-white p-1 shadow-lg">
                    <button
                      type="button"
                      role="menuitem"
                      className="w-full rounded px-2 py-1.5 text-left text-[10px] text-rose-700 hover:bg-rose-50"
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpenMenuId(null);
                        onDeleteTicket?.(ticket);
                      }}
                    >
                      Delete ticket
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
          {tickets.length === 0 && <tr><td colSpan={9} className="py-12 text-center text-stone-500">No tickets match your search.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default TicketTable;
