import { X } from "lucide-react";

function NewTicketModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-stone-900/30 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="New ticket"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold">Create New Ticket</h2>
          <button onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="grid gap-3">
          <input
            className="rounded-md border border-stone-200 px-3 py-2 text-sm outline-none"
            placeholder="Ticket subject"
          />
          <input
            className="rounded-md border border-stone-200 px-3 py-2 text-sm outline-none"
            placeholder="Customer / company"
          />
          <textarea
            className="min-h-24 rounded-md border border-stone-200 px-3 py-2 text-sm outline-none"
            placeholder="Describe the issue..."
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border border-stone-200 px-3 py-2 text-xs"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="rounded-md bg-[#a34b32] px-3 py-2 text-xs font-semibold text-white"
          >
            Create Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewTicketModal;
