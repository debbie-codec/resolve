import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TicketManagement from "./pages/TicketManagement";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import useSupportStaff from "./hooks/useSupportStaff";
import useTicketStore from "./hooks/useTicketStore";

function App() {
  const [activeView, setActiveView] = useState("Dashboard");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [initialTicketId, setInitialTicketId] = useState(null);
  // Both stores live here so every page uses the same ticket and staff data.
  const ticketStore = useTicketStore();
  const staffStore = useSupportStaff();
  const navigateToTickets = (ticketId = null) => {
    setInitialTicketId(ticketId);
    setActiveView("Tickets");
  };
  const handleNavigate = (view) => {
    if (view !== "Tickets") setInitialTicketId(null);
    setActiveView(view);
  };

  let page;
  switch (activeView) {
    case "Tickets":
      page = (
        <TicketManagement
          tickets={ticketStore.tickets}
          initialTicketId={initialTicketId}
          staff={staffStore.staff}
          staffStatus={staffStore.status}
          staffError={staffStore.error}
          onRetryStaff={staffStore.retry}
          onCreateTicket={ticketStore.createTicket}
          onUpdateTicket={ticketStore.updateTicket}
          onDeleteTicket={setPendingDelete}
          onUpdateStatus={ticketStore.updateStatus}
        />
      );
      break;
    case "Team":
      page = (
        <Team
          staff={staffStore.staff}
          staffStatus={staffStore.status}
          staffError={staffStore.error}
          onRetryStaff={staffStore.retry}
          tickets={ticketStore.tickets}
        />
      );
      break;
    case "Settings":
      page = <Settings />;
      break;
    default:
      page = (
        <Dashboard
          tickets={ticketStore.tickets}
          onViewAllTickets={navigateToTickets}
          onDeleteTicket={setPendingDelete}
          onUpdateStatus={ticketStore.updateStatus}
        />
      );
  }

  return (
    <div className="flex min-h-screen bg-[#f8f5f0] text-stone-800">
      <Sidebar activeView={activeView} onNavigate={handleNavigate} />
      <main className="min-w-0 flex-1 p-3 sm:p-5 lg:p-7">
        {ticketStore.notice && (
          <p role="status" className="mb-3 rounded-md bg-[#fff7f3] px-3 py-2 text-xs text-[#8e3d29]">
            {ticketStore.notice}
          </p>
        )}
        {page}
      </main>
      {pendingDelete && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-stone-900/40 p-4">
          <section role="alertdialog" aria-modal="true" aria-labelledby="delete-ticket-title" className="w-full max-w-sm rounded-lg bg-white p-5 shadow-xl">
            <h2 id="delete-ticket-title" className="text-sm font-bold">Delete ticket?</h2>
            <p className="mt-2 text-xs text-stone-600">
              This will permanently remove {pendingDelete.title}. This action cannot be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" autoFocus className="secondary-button" onClick={() => setPendingDelete(null)}>Cancel</button>
              <button
                type="button"
                className="rounded-md bg-rose-700 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-800"
                onClick={() => {
                  ticketStore.deleteTicket(pendingDelete.id);
                  setPendingDelete(null);
                }}
              >
                Delete ticket
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
