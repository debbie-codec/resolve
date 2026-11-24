import { useMemo, useState } from "react";
import { CheckCircle2, Clock3, Plus, Search, Users, X } from "lucide-react";
import PageHeader from "../components/PageHeader";

const avatarColors = ["bg-[#f3dfc5]", "bg-[#dce9df]", "bg-[#e9def0]", "bg-[#dce8f1]", "bg-[#f4dfe2]"];

function initials(name) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
}

function Team({ staff, staffStatus, staffError, onRetryStaff, tickets }) {
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("All");
  const [showInvite, setShowInvite] = useState(false);
  const apiMembers = useMemo(() => staff.map((member, index) => {
    const assignedTickets = tickets.filter((ticket) => ticket.assignee === member.name);
    return {
      ...member,
      status: "Available",
      tickets: assignedTickets.filter((ticket) => ticket.status !== "Resolved").length,
      resolved: assignedTickets.filter((ticket) => ticket.status === "Resolved").length,
      color: avatarColors[index % avatarColors.length],
    };
  }), [staff, tickets]);
  const members = useMemo(
    () => [...apiMembers, ...invitedMembers],
    [apiMembers, invitedMembers],
  );

  const filteredMembers = useMemo(() => members.filter((member) => {
    const matchesSearch = `${member.name} ${member.email} ${member.role}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (availability === "All" || member.status === availability);
  }), [members, search, availability]);

  const availableCount = members.filter((member) => member.status === "Available").length;
  const busyCount = members.filter((member) => member.status === "Busy").length;
  const openTickets = tickets.filter((ticket) => ticket.status !== "Resolved").length;

  const addMember = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const role = formData.get("role");
    setInvitedMembers((current) => [...current, {
      name,
      email,
      role,
      status: "Available",
      tickets: 0,
      resolved: 0,
      color: avatarColors[current.length % avatarColors.length],
    }]);
    setShowInvite(false);
  };

  return (
    <>
      <PageHeader title="Team" description="Manage your support team, availability, and ticket workload." />

      <div className="mb-4 flex justify-end">
        <button onClick={() => setShowInvite(true)} className="primary-button">
          <Plus size={14} /> Invite Member
        </button>
      </div>

      <section className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Team summary">
        {[
          { label: "Team Members", value: members.length, icon: Users, tone: "text-[#a34b32]", bg: "bg-[#fff1e9]" },
          { label: "Available", value: availableCount, icon: CheckCircle2, tone: "text-green-700", bg: "bg-green-50" },
          { label: "Busy", value: busyCount, icon: Clock3, tone: "text-amber-700", bg: "bg-amber-50" },
          { label: "Open Tickets", value: openTickets, icon: Clock3, tone: "text-orange-700", bg: "bg-orange-50" },
        ].map(({ label, value, icon: Icon, tone, bg }) => (
          <article key={label} className="surface-panel flex items-center gap-3 p-4">
            <span className={`grid h-9 w-9 place-items-center rounded-full ${bg} ${tone}`}><Icon size={17} /></span>
            <div><p className="text-[11px] text-stone-500">{label}</p><strong className="text-xl">{value}</strong></div>
          </article>
        ))}
      </section>

      <section className="surface-panel overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 px-4 py-3">
          <div><h2 className="text-sm font-bold">Team Directory</h2><p className="text-[10px] text-stone-500">People supporting your customers</p></div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex h-8 items-center gap-2 rounded-md border border-stone-200 px-2 text-stone-400"><Search size={13} /><input value={search} onChange={(event) => setSearch(event.target.value)} className="w-40 text-[10px] text-stone-700 outline-none" placeholder="Search team..." /></label>
            <select value={availability} onChange={(event) => setAvailability(event.target.value)} className="form-control h-8 px-2 text-[10px]"><option>All</option><option>Available</option><option>Busy</option><option>Offline</option></select>
          </div>
        </div>
        {staffStatus === "loading" && <p role="status" className="px-4 py-6 text-xs text-stone-500">Loading support staff...</p>}
        {staffStatus === "error" && (
          <div role="alert" className="flex flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-rose-700">
            <span>Could not load support staff: {staffError}</span>
            <button type="button" onClick={onRetryStaff} className="secondary-button">Retry</button>
          </div>
        )}
        {staffStatus === "loaded" && members.length === 0 && (
          <p role="status" className="px-4 py-6 text-xs text-stone-600">The staff service returned no team members.</p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-[11px]">
            <thead className="bg-[#faf7f2] text-[9px] text-stone-600"><tr>{["Member", "Role", "Availability", "Open Tickets", "Resolved Tickets", ""].map((heading) => <th className="px-4 py-2 font-semibold" key={heading || "actions"}>{heading}</th>)}</tr></thead>
            <tbody>
              {staffStatus === "loaded" && filteredMembers.map((member) => (
                <tr key={member.email} className="border-t border-stone-100 hover:bg-[#fdfbf8]">
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><span className={`grid h-8 w-8 place-items-center rounded-full ${member.color} text-[9px] font-semibold text-stone-700`}>{initials(member.name)}</span><span><strong className="block text-[10px]">{member.name}</strong><small className="text-[9px] text-stone-500">{member.email}</small></span></div></td>
                  <td className="px-4 py-3 text-stone-600">{member.role}</td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[9px] ${member.status === "Available" ? "bg-green-50 text-green-700" : member.status === "Busy" ? "bg-amber-50 text-amber-700" : "bg-stone-100 text-stone-600"}`}><i className={`h-1.5 w-1.5 rounded-full ${member.status === "Available" ? "bg-green-500" : member.status === "Busy" ? "bg-amber-500" : "bg-stone-400"}`} />{member.status}</span></td>
                  <td className="px-4 py-3 font-semibold">{member.tickets}</td>
                  <td className="px-4 py-3 text-stone-600">{member.resolved}</td>
                  <td className="px-4 py-3 text-right"><button className="rounded border border-stone-200 px-2 py-1 text-[9px] hover:bg-stone-50">View Profile</button></td>
                </tr>
              ))}
              {staffStatus === "loaded" && filteredMembers.length === 0 && <tr><td colSpan={6} className="py-10 text-center text-stone-500">No team members match your search.</td></tr>}
            </tbody>
          </table>
        </div>
        {staffStatus === "loaded" && <div className="border-t border-stone-100 px-4 py-3 text-[9px] text-stone-500">Showing {filteredMembers.length} of {members.length} team members</div>}
      </section>

      {showInvite && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-stone-900/30 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowInvite(false); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="invite-title" className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between"><div><h2 id="invite-title" className="text-sm font-bold">Invite Team Member</h2><p className="mt-1 text-[10px] text-stone-500">Add a teammate to your support team.</p></div><button onClick={() => setShowInvite(false)} aria-label="Close invite form"><X size={17} /></button></div>
            <form onSubmit={addMember} className="grid gap-3">
              <label className="grid gap-1 text-[10px] font-medium">Full name<input name="name" required className="form-control" placeholder="e.g. Jamie Lee" /></label>
              <label className="grid gap-1 text-[10px] font-medium">Email address<input name="email" type="email" required className="form-control" placeholder="name@company.com" /></label>
              <label className="grid gap-1 text-[10px] font-medium">Role<select name="role" className="form-control"><option>Support Specialist</option><option>Senior Support Specialist</option><option>Technical Support</option><option>Support Manager</option></select></label>
              <div className="mt-2 flex justify-end gap-2"><button type="button" onClick={() => setShowInvite(false)} className="secondary-button">Cancel</button><button type="submit" className="primary-button">Add Member</button></div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

export default Team;
