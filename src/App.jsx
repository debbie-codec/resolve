import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TicketManagement from "./pages/TicketManagement";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import useSupportStaff from "./hooks/useSupportStaff";
import useTicketStore from "./hooks/useTicketStore";

function App() {
  // The page name is used to decide what to show.
  const [activeView, setActiveView] = useState("Dashboard");

  // The tickets are saved here while the delete window is open.
  const [pendingDelete, setPendingDelete] = useState(null);

  // This ticket id is used when a page should open one ticket.
  const [initialTicketId, setInitialTicketId] = useState(null);

  // These hooks contain the ticket and support staff data.
  const ticketStore = useTicketStore();
  const staffStore = useSupportStaff();

  // A delete request can contain one ticket or many tickets.
  const requestDelete = (ticketsToDelete) => {
    if (Array.isArray(ticketsToDelete)) {
      setPendingDelete(ticketsToDelete);
    } else {
      setPendingDelete([ticketsToDelete]);
    }
  };

  // Open the Tickets page. If a ticket id is given, open that ticket.
  const navigateToTickets = (ticketId = null) => {
    setInitialTicketId(ticketId);
    setActiveView("Tickets");
  };

  // Change pages and clear the selected ticket id when leaving Tickets.
  const handleNavigate = (view) => {
    if (view !== "Tickets") {
      setInitialTicketId(null);
    }
    setActiveView(view);
  };

  // Choose the page that should appear in the main area.
  function getCurrentPage() {
    if (activeView === "Tickets") {
      return (
        <TicketManagement
          tickets={ticketStore.tickets}
          initialTicketId={initialTicketId}
          staff={staffStore.staff}
          staffStatus={staffStore.status}
          staffError={staffStore.error}
          onRetryStaff={staffStore.retry}
          onCreateTicket={ticketStore.createTicket}
          onUpdateTicket={ticketStore.updateTicket}
          onDeleteTicket={requestDelete}
          onUpdateStatus={ticketStore.updateStatus}
          onUpdateStatuses={ticketStore.updateStatuses}
        />
      );
    }

    if (activeView === "Team") {
      return (
        <Team
          staff={staffStore.staff}
          staffStatus={staffStore.status}
          staffError={staffStore.error}
          onRetryStaff={staffStore.retry}
          tickets={ticketStore.tickets}
        />
      );
    }

    if (activeView === "Settings") {
      return <Settings />;
    }

    // Dashboard is the default page.
    return (
      <Dashboard
        tickets={ticketStore.tickets}
        onViewAllTickets={navigateToTickets}
        onDeleteTicket={requestDelete}
        onUpdateStatus={ticketStore.updateStatus}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8f5f0] text-stone-800">
      <Sidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        ticketCount={ticketStore.tickets.length}
      />
      <main className="min-w-0 flex-1 p-3 sm:p-5 lg:p-7">
        {ticketStore.notice && (
          <p role="status" className="mb-3 rounded-md bg-[#fff7f3] px-3 py-2 text-xs text-[#8e3d29]">
            {ticketStore.notice}
          </p>
        )}
        {getCurrentPage()}
      </main>
      {pendingDelete && (
        <DeleteTicketDialog
          tickets={pendingDelete}
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => {
            const idsToDelete = [];

            for (let index = 0; index < pendingDelete.length; index += 1) {
              idsToDelete.push(pendingDelete[index].id);
            }

            ticketStore.deleteTickets(idsToDelete);
            setPendingDelete(null);
          }}
        />
      )}
    </div>
  );
}

function DeleteTicketDialog({ tickets, onCancel, onConfirm }) {
  const isOneTicket = tickets.length === 1;
  let description;

  if (isOneTicket) {
    description = `This will permanently remove ${tickets[0].title}.`;
  } else {
    description = `This will permanently remove ${tickets.length} selected tickets.`;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-stone-900/40 p-4">
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-ticket-title"
        className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl"
      >
        <h2 id="delete-ticket-title" className="text-sm font-bold">
          Delete {isOneTicket ? "ticket?" : `${tickets.length} tickets?`}
        </h2>
        <p className="mt-2 text-xs text-stone-600">
          {description} This action cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            autoFocus
            className="secondary-button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md bg-rose-700 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-800"
            onClick={onConfirm}
          >
            Delete {isOneTicket ? "ticket" : "tickets"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
