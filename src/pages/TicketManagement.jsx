import { useMemo, useState } from "react";
import { ArrowDownUp, Ticket } from "lucide-react";
import PageHeader from "../components/PageHeader";
import TicketStats from "../components/TicketStats";
import TicketToolbar from "../components/TicketToolbar";
import TicketTable from "../components/TicketTable";
import TicketPagination from "../components/TicketPagination";
import TicketDetails from "./TicketDetails";
import TicketCreate from "./TicketCreate";
import { getTicketStats } from "../data/tickets";

const PAGE_SIZE = 8;

function nextTicketId(tickets) {
  const maxNumber = tickets.reduce((maximum, ticket) => {
    const number = Number(ticket.id.match(/\d+/)?.[0] ?? 0);
    return Math.max(maximum, number);
  }, 0);
  return `#RSV-${maxNumber + 1}`;
}

function TicketManagement({
  tickets,
  initialTicketId,
  staff,
  staffStatus,
  staffError,
  onRetryStaff,
  onCreateTicket,
  onUpdateTicket,
  onDeleteTicket,
  onUpdateStatus,
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [selected, setSelected] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(initialTicketId);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredTickets = useMemo(() => tickets
    // Derive the visible list from the complete ticket list for search/filter/sort.
    .filter((ticket) => {
      const searchableText = `${ticket.title} ${ticket.description} ${ticket.customer} ${ticket.category}`.toLowerCase();
      return searchableText.includes(search.toLowerCase())
        && (status === "All" || ticket.status === status)
        && (priority === "All" || ticket.priority === priority);
    })
    .sort((left, right) => {
      const direction = sortOrder === "newest" ? -1 : 1;
      return direction * (new Date(left.createdAt) - new Date(right.createdAt));
    }), [tickets, search, status, priority, sortOrder]);

  const pageCount = Math.max(1, Math.ceil(filteredTickets.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleTickets = filteredTickets.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const allSelected = visibleTickets.length > 0 && visibleTickets.every((ticket) => selected.includes(ticket.id));
  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId);
  const stats = getTicketStats(tickets);

  const toggleSelected = (id) => {
    setSelected((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id]);
  };

  const toggleAll = () => {
    const visibleIds = visibleTickets.map((ticket) => ticket.id);
    setSelected((current) => allSelected
      ? current.filter((id) => !visibleIds.includes(id))
      : [...new Set([...current, ...visibleIds])]);
  };

  const resetFilters = () => {
    setStatus("All");
    setPriority("All");
    setSearch("");
    setPage(1);
  };

  const submitTicket = (values) => {
    const now = new Date().toISOString();
    const assignee = staff.find((member) => member.name === values.assignee);
    if (editingTicket) {
      onUpdateTicket({
        ...editingTicket,
        ...values,
        avatar: assignee?.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() ?? "",
        updatedAt: now,
      });
      setEditingTicket(null);
      setSelectedTicketId(null);
      return;
    }

    onCreateTicket({
      id: nextTicketId(tickets),
      ...values,
      avatar: assignee?.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() ?? "",
      createdAt: now,
      updatedAt: now,
    });
    setSelectedTicketId(null);
    setPage(1);
  };

  if (editingTicket || editingTicket === null && selectedTicketId === "new") {
    return (
      <TicketCreate
        onBack={() => {
          setEditingTicket(null);
          setSelectedTicketId(null);
        }}
        onSubmit={submitTicket}
        initialTicket={editingTicket}
        staff={staff}
        staffStatus={staffStatus}
        staffError={staffError}
        onRetryStaff={onRetryStaff}
      />
    );
  }

  if (selectedTicket) {
    return (
      <TicketDetails
        ticket={selectedTicket}
        onBack={() => setSelectedTicketId(null)}
        onEditTicket={setEditingTicket}
        onDeleteTicket={onDeleteTicket}
        onUpdateStatus={onUpdateStatus}
      />
    );
  }

  return (
    <>
      <PageHeader title="Ticket Management" description="Create, search, filter and manage customer support tickets." />
      <TicketStats stats={stats} />
      <section className="surface-panel">
        <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3">
          <h1 className="flex items-center gap-2 text-sm font-bold">
            <Ticket size={17} className="text-[#a34b32]" /> Tickets
            <span className="text-[10px] font-normal text-stone-500">({filteredTickets.length})</span>
          </h1>
          <button
            type="button"
            onClick={() => {
              setSortOrder((current) => current === "newest" ? "oldest" : "newest");
              setPage(1);
            }}
            className="flex items-center gap-1 text-[10px] text-stone-600"
            aria-label={`Sort by creation date, currently ${sortOrder === "newest" ? "newest first" : "oldest first"}`}
          >
            <ArrowDownUp size={12} /> Created: {sortOrder === "newest" ? "Newest first" : "Oldest first"}
          </button>
        </div>
        <TicketToolbar
          search={search}
          onSearch={(value) => { setSearch(value); setPage(1); }}
          status={status}
          onStatus={(value) => { setStatus(value); setPage(1); }}
          priority={priority}
          onPriority={(value) => { setPriority(value); setPage(1); }}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters((current) => !current)}
          onNewTicket={() => setSelectedTicketId("new")}
        />
        {showFilters && (
          <div className="mx-4 mb-3 flex flex-wrap items-center gap-2 rounded-md bg-stone-50 px-3 py-2 text-[10px]">
            <span className="text-stone-500">Active:</span>
            <span className="rounded-full border border-stone-200 bg-white px-2 py-1">Status: {status}</span>
            <span className="rounded-full border border-stone-200 bg-white px-2 py-1">Priority: {priority}</span>
            <button type="button" onClick={resetFilters} className="ml-auto text-[#a34b32]">Clear all</button>
          </div>
        )}
        {tickets.length === 0 && (
          <p className="px-4 py-12 text-center text-sm text-stone-600">No tickets yet. Select “New Ticket” to create your first ticket.</p>
        )}
        {tickets.length > 0 && filteredTickets.length === 0 && (
          <p className="px-4 py-12 text-center text-sm text-stone-600">No tickets match your search and filters.</p>
        )}
        {filteredTickets.length > 0 && (
          <>
            <TicketTable
              tickets={visibleTickets}
              selected={selected}
              allSelected={allSelected}
              onToggleAll={toggleAll}
              onToggleSelected={toggleSelected}
              onOpenTicket={(ticket) => setSelectedTicketId(ticket.id)}
            />
            <TicketPagination
              count={filteredTickets.length}
              page={currentPage}
              pageCount={pageCount}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </>
        )}
      </section>
    </>
  );
}

export default TicketManagement;
