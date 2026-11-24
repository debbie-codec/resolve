import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Link2,
  ListChecks,
  Tag,
  Ticket,
  UserRound,
  UserRoundCog,
  Zap,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import TicketActivity from "../components/TicketActivity";
import { formatTicketDate } from "../data/tickets";

function DetailCard({ title, icon: Icon, children }) {
  return (
    <section className="surface-panel min-w-0 p-3">
      <h2 className="mb-2.5 flex items-center gap-2 text-xs font-bold">
        <Icon size={14} className="shrink-0 text-[#a34b32]" />
        {title}
      </h2>
      {children}
    </section>
  );
}

function TicketDetails({
  ticket,
  onBack,
  backLabel = "Back to Tickets",
  onEditTicket,
  onDeleteTicket,
  onUpdateStatus,
}) {
  const previousStatus = ticket.status === "Open" ? "In Progress" : "Open";

  return (
    <>
      <PageHeader title="Ticket Details" description="Review ticket information, conversations, status and SLA progress." />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <button onClick={onBack} className="flex items-center gap-1 text-[10px] font-medium text-[#a34b32] hover:text-[#8e3d29]">
          <ArrowLeft size={13} /> {backLabel}
        </button>
        <div className="flex gap-1.5">
          <button className="flex items-center gap-1 rounded-md border border-stone-200 bg-white px-2 py-1 text-[9px] text-stone-600"><ArrowLeft size={11} /> Previous</button>
          <button className="flex items-center gap-1 rounded-md border border-stone-200 bg-white px-2 py-1 text-[9px] text-stone-600">Next <ArrowRight size={11} /></button>
        </div>
      </div>

      <div className="grid min-w-0 gap-3 xl:grid-cols-[minmax(0,1fr)_350px]">
        <div className="grid min-w-0 content-start gap-3">
          <section className="surface-panel min-w-0 p-3">
            <div className="flex min-w-0 items-start gap-2.5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#fff0e7] text-[#a34b32]"><Ticket size={19} /></span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold text-[#a34b32]">{ticket.id}</p>
                <h1 className="mt-0.5 break-words text-base font-bold leading-tight text-stone-900 sm:text-lg">{ticket.title}</h1>
                <p className="mt-1 text-[8px] text-stone-400">Created {formatTicketDate(ticket.createdAt)} <span className="mx-1">·</span> Updated {formatTicketDate(ticket.updatedAt)}</p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-1.5 rounded-md border border-stone-100 bg-[#fdfbf8] p-2 sm:grid-cols-3 xl:grid-cols-5">
              <div className="min-w-0 px-1">
                <span className="flex items-center gap-1 text-[9px] text-stone-400"><Building2 size={10} /> Customer</span>
                <strong className="mt-1 block truncate text-[10px] font-semibold">{ticket.customer}</strong>
              </div>
              <div className="min-w-0 px-1">
                <span className="flex items-center gap-1 text-[9px] text-stone-400"><Zap size={10} /> Priority</span>
                <span className="mt-1 inline-block rounded-full bg-[#fff0e7] px-1.5 py-0.5 text-[8px] font-semibold text-[#a34b32]">{ticket.priority}</span>
              </div>
              <div className="min-w-0 px-1">
                <span className="flex items-center gap-1 text-[9px] text-stone-400"><CheckCircle2 size={10} /> Status</span>
                <span className={`mt-1 inline-block rounded-full px-1.5 py-0.5 text-[8px] font-semibold ${ticket.status === "Open" ? "bg-rose-50 text-rose-700" : ticket.status === "Resolved" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{ticket.status}</span>
              </div>
              <div className="min-w-0 px-1">
                <span className="flex items-center gap-1 text-[9px] text-stone-400"><UserRound size={10} /> Assignee</span>
                <span className="mt-1 flex min-w-0 items-center gap-1 text-[9px] font-semibold"><i className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#e9d8c8] text-[6px] not-italic">{ticket.avatar}</i><span className="truncate">{ticket.assignee}</span></span>
              </div>
              <div className="min-w-0 px-1">
                <span className="flex items-center gap-1 text-[9px] text-stone-400"><Tag size={10} /> Category</span>
                <span className="mt-1 inline-block rounded-full bg-[#f8eadc] px-1.5 py-0.5 text-[7px] text-[#8e3d29]">{ticket.category}</span>
              </div>
            </div>
          </section>

          <DetailCard title="Ticket Description" icon={FileText}>
            <p className="whitespace-pre-wrap text-[11px] leading-[1.6] text-stone-600">{ticket.description}</p>
          </DetailCard>

          <TicketActivity ticket={ticket} previousStatus={previousStatus} />
        </div>

        <aside className="grid min-w-0 content-start gap-3">
          <DetailCard title="Ticket Metadata" icon={ListChecks}>
            <dl className="grid gap-2 text-[9px]">
              <div className="flex items-center justify-between gap-2"><dt className="flex items-center gap-1 text-stone-500"><CalendarDays size={10} /> Created</dt><dd className="text-right text-stone-600">{formatTicketDate(ticket.createdAt)}</dd></div>
              <div className="flex items-center justify-between gap-2"><dt className="flex items-center gap-1 text-stone-500"><Clock3 size={10} /> Last Updated</dt><dd className="text-right text-stone-600">{formatTicketDate(ticket.updatedAt)}</dd></div>
              <div className="flex items-center justify-between gap-2"><dt className="flex items-center gap-1 text-stone-500"><Clock3 size={10} /> First Response</dt><dd className="text-right font-medium text-green-700">5 min <span className="text-[7px]">(Met)</span></dd></div>
              <div className="flex items-center justify-between gap-2"><dt className="flex items-center gap-1 text-stone-500"><ListChecks size={10} /> Total Updates</dt><dd className="text-stone-600">4</dd></div>
              <div className="flex items-center justify-between gap-2"><dt className="flex items-center gap-1 text-stone-500"><Link2 size={10} /> Related Tickets</dt><dd className="text-stone-600">0</dd></div>
            </dl>
          </DetailCard>

          <DetailCard title="Assignee" icon={UserRoundCog}>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e9d8c8] text-[8px] font-semibold text-[#654532]">{ticket.avatar}</span>
              <div className="min-w-0 flex-1"><strong className="block truncate text-[10px]">{ticket.assignee}</strong><small className="block text-[9px] text-stone-500">Customer Support Specialist</small></div>
              <span className="rounded-full bg-green-50 px-1.5 py-1 text-[8px] font-medium text-green-700">● Available</span>
            </div>
          </DetailCard>

          <DetailCard title="SLA & Status Summary" icon={Clock3}>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md bg-[#fff7e8] p-2"><span className="flex items-center gap-1 text-[8px] text-stone-500"><Clock3 size={10} /> Response Time</span><strong className="mt-1 block text-sm">5 min</strong><span className="text-[8px] font-medium text-green-700">✓ Met</span></div>
              <div className="rounded-md bg-[#fff7e8] p-2"><span className="flex items-center gap-1 text-[8px] text-stone-500"><CalendarDays size={10} /> Resolution Target</span><strong className="mt-1 block text-sm">4 hr</strong><span className="inline-block rounded-full bg-amber-100 px-1.5 py-0.5 text-[8px] text-amber-800">{ticket.status}</span></div>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-stone-100"><div className="h-full w-1/3 rounded-full bg-[#e3a23d]" /></div>
            <div className="mt-1 flex justify-between text-[8px] text-stone-500"><span>Time Remaining: 2 hr 47 min</span><span>35%</span></div>
          </DetailCard>

          <DetailCard title="Quick Actions" icon={Zap}>
            <div className="grid grid-cols-3 gap-1">
              {ticket.status !== "Resolved" && <button onClick={() => onUpdateStatus(ticket.id, "Resolved")} className="flex min-w-0 items-center justify-center gap-1 rounded-md bg-[#8e3828] px-1.5 py-2 text-[8px] font-semibold text-white hover:bg-[#762e22]"><CheckCircle2 size={11} className="shrink-0" />Mark Resolved</button>}
              <button onClick={() => onEditTicket(ticket)} className="flex min-w-0 items-center justify-center gap-1 rounded-md border border-stone-200 px-1.5 py-2 text-[8px] text-stone-700 hover:bg-stone-50"><FileText size={11} className="shrink-0" />Edit</button>
              <button onClick={() => onDeleteTicket(ticket)} className="flex min-w-0 items-center justify-center gap-1 rounded-md border border-rose-200 px-1.5 py-2 text-[8px] text-rose-700 hover:bg-rose-50"><ChevronRight size={11} className="shrink-0" />Delete</button>
            </div>
          </DetailCard>

          <DetailCard title="Related" icon={Link2}>
            <button className="flex w-full items-center justify-between gap-2 text-left text-[8px] text-stone-600"><span className="flex min-w-0 items-center gap-1.5"><Building2 size={11} className="shrink-0 text-[#a34b32]" /><span className="truncate">View Customer ({ticket.customer})</span></span><ChevronRight size={11} className="shrink-0" /></button>
            <button className="mt-2 flex w-full items-center justify-between gap-2 text-left text-[8px] text-stone-600"><span className="flex items-center gap-1.5"><Ticket size={11} className="text-[#a34b32]" />View Company Tickets (12)</span><ChevronRight size={11} /></button>
          </DetailCard>
        </aside>
      </div>
    </>
  );
}

export default TicketDetails;
