import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import PageHeader from "../components/PageHeader";
import TicketStats from "../components/TicketStats";
import RecentTickets from "../components/RecentTickets";
import TicketDetails from "./TicketDetails";
import { getTicketStats } from "../data/tickets";

const trend = [
  { day: "Jun 20", created: 72, resolved: 48 },
  { day: "Jun 21", created: 105, resolved: 68 },
  { day: "Jun 22", created: 142, resolved: 91 },
  { day: "Jun 23", created: 112, resolved: 78 },
  { day: "Jun 24", created: 151, resolved: 104 },
  { day: "Jun 25", created: 178, resolved: 120 },
  { day: "Jun 26", created: 192, resolved: 137 },
];

const priorityColors = {
  High: "#a9432b",
  Medium: "#e5a839",
  Low: "#e7d39b",
  Urgent: "#c98470",
};

function Dashboard({ tickets, onViewAllTickets, onDeleteTicket, onUpdateStatus }) {
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const stats = getTicketStats(tickets);
  const openTickets = tickets.filter((ticket) => ticket.status === "Open");
  const priorities = Object.entries(priorityColors).map(([name, color]) => ({
    name,
    color,
    value: openTickets.filter((ticket) => ticket.priority === name).length,
  }));
  const openCount = openTickets.length;

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId);
  if (selectedTicket) {
    return (
      <TicketDetails
        ticket={selectedTicket}
        onBack={() => setSelectedTicketId(null)}
        backLabel="Back to Dashboard"
        onEditTicket={() => onViewAllTickets(selectedTicket.id)}
        onDeleteTicket={onDeleteTicket}
        onUpdateStatus={onUpdateStatus}
      />
    );
  }

  return (
    <>
      <PageHeader />
      <TicketStats stats={stats} dashboard />
      <section className="mb-3 grid grid-cols-1 gap-3 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="surface-panel p-3">
          <div className="mb-2 flex items-center justify-between"><div><h2 className="text-xs font-semibold">Ticket Volume Trend</h2><p className="text-[9px] text-stone-500">Tickets created vs. resolved over time</p></div><button className="flex items-center gap-1 rounded-md border border-stone-200 px-2 py-1 text-[9px]">Last 7 Days <ChevronDown size={12} /></button></div>
          <div className="h-40 w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trend} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}><CartesianGrid stroke="#eee8e0" strokeDasharray="3 4" /><XAxis dataKey="day" tick={{ fontSize: 8 }} /><YAxis tick={{ fontSize: 8 }} /><Tooltip /><Area type="monotone" dataKey="created" name="Tickets Created" stroke="#a9432b" fill="#a9432b" fillOpacity={0.12} /><Area type="monotone" dataKey="resolved" name="Tickets Resolved" stroke="#e5a839" fill="#e5a839" fillOpacity={0.15} /></AreaChart></ResponsiveContainer></div>
          <div className="mt-1 flex justify-center gap-4 text-[8px] text-stone-600"><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-[#a9432b]" />Tickets Created</span><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-[#e5a839]" />Tickets Resolved</span></div>
        </article>
        <article className="surface-panel p-3"><h2 className="text-xs font-semibold">Tickets by Priority</h2><p className="text-[9px] text-stone-500">Breakdown of open tickets by priority level</p><div className="flex min-h-40 flex-wrap items-center justify-center gap-2 sm:justify-around"><div className="relative h-32 w-32 shrink-0"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={priorities} dataKey="value" innerRadius="62%" outerRadius="92%" paddingAngle={2}>{priorities.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer><div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><strong className="text-base">{openCount}</strong><span className="text-[8px] text-stone-500">Open Tickets</span></div></div><ul className="grid gap-1.5 text-[9px]">{priorities.map((item) => <li className="flex items-center gap-2" key={item.name}><i className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} /><span className="w-12 text-stone-600">{item.name}</span><strong>{item.value}</strong><span className="w-9 text-right text-stone-500">{openCount ? ((item.value / openCount) * 100).toFixed(1) : "0.0"}%</span></li>)}</ul></div></article>
      </section>
      <RecentTickets tickets={tickets} onViewAll={() => onViewAllTickets()} onOpenTicket={(ticket) => setSelectedTicketId(ticket.id)} />
    </>
  );
}

export default Dashboard;
