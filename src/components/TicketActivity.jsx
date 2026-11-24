import { useState } from "react";
import { Activity, RefreshCw } from "lucide-react";

function TicketActivity({ ticket, previousStatus }) {
  const [filter, setFilter] = useState("all");
  const activities = [
    {
      id: "latest-comment",
      actor: ticket.assignee,
      initials: ticket.avatar,
      kind: "comment",
      label: "Comment",
      time: "5 min ago",
      message: "Thanks for reporting this. I’m looking into the account access issue now and will update you shortly.",
    },
    {
      id: "status-change",
      actor: "Ticket Updated",
      kind: "update",
      label: "Status Change",
      time: "15 min ago",
      fromStatus: previousStatus,
      toStatus: ticket.status,
    },
    {
      id: "customer-reply",
      actor: "Daniel Reyes",
      initials: "DR",
      kind: "comment",
      label: "Customer Reply",
      time: "18 min ago",
      message: "Adding a bit more detail — this is affecting four of our team members. Please let me know if you need any additional information.",
    },
    {
      id: "follow-up",
      actor: ticket.assignee,
      initials: ticket.avatar,
      kind: "comment",
      label: "Comment",
      time: "42 min ago",
      message: "I’ve escalated this to our technical team and will follow up as soon as I have an update.",
    },
  ];

  const filters = [
    { id: "all", label: "All Activity" },
    { id: "comment", label: "Comments" },
    { id: "update", label: "Updates" },
    { id: "system", label: "System" },
  ];
  const visibleActivities = activities.filter((activity) => filter === "all" || activity.kind === filter);

  return (
    <section className="surface-panel min-w-0 p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-xs font-bold"><Activity size={15} className="text-[#a34b32]" />Activity &amp; Updates</h2>
        <div className="flex flex-wrap gap-1">
          {filters.map(({ id, label }) => (
            <button
              aria-pressed={filter === id}
              className={`rounded-md px-2 py-1 text-[9px] transition-colors ${filter === id ? "bg-[#f8eadc] font-semibold text-[#8e3d29]" : "text-stone-500 hover:bg-stone-50"}`}
              key={id}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {visibleActivities.length > 0 ? (
        <ol className="relative space-y-3 before:absolute before:bottom-4 before:left-[13px] before:top-4 before:w-px before:bg-[#ead6c7]">
          {visibleActivities.map((activity) => (
            <li className="relative flex min-w-0 gap-2.5" key={activity.id}>
              <span className={`z-10 grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full ring-2 ring-white ${activity.kind === "update" ? "bg-[#f5e6d6] text-[#9b563b]" : activity.id === "customer-reply" ? "bg-[#dce8f1] text-[#466174]" : "bg-[#e9d8c8] text-[#654532]"}`}>
                {activity.kind === "update" ? <RefreshCw size={12} /> : <span className="text-[8px] font-semibold">{activity.initials}</span>}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                  <strong className="text-[10px]">{activity.actor}</strong>
                  <span className={`rounded-full px-1.5 py-0.5 text-[8px] font-medium ${activity.kind === "update" ? "bg-amber-50 text-amber-800" : activity.id === "customer-reply" ? "bg-blue-50 text-blue-700" : "bg-[#f8eadc] text-[#8e3d29]"}`}>{activity.label}</span>
                  <time className="ml-auto text-[9px] text-stone-400">{activity.time}</time>
                </div>
                {activity.kind === "update" ? (
                  <div className="mt-1.5 rounded-md border border-stone-100 bg-[#faf8f5] px-2.5 py-2 text-[9px] text-stone-600">
                    Status changed from <span className="mx-1 rounded-full bg-amber-100 px-1.5 py-0.5 text-amber-800">{activity.fromStatus}</span>{" "}
                    to <span className="mx-1 rounded-full bg-rose-100 px-1.5 py-0.5 text-rose-700">{activity.toStatus}</span>
                  </div>
                ) : (
                  <p className="mt-1.5 break-words rounded-md border border-stone-100 bg-[#faf8f5] px-2.5 py-2 text-[10px] leading-4 text-stone-600">{activity.message}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="rounded-md bg-stone-50 px-3 py-6 text-center text-[10px] text-stone-500">No system activity yet.</p>
      )}
    </section>
  );
}

export default TicketActivity;
