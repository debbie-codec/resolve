import { useState } from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import PageHeader from "../components/PageHeader";

const categories = [
  "Account Access",
  "Account Management",
  "API Support",
  "Billing",
  "Feature Request",
  "Integrations",
  "Technical Issue",
  "Other",
];
const priorities = ["Urgent", "High", "Medium", "Low"];
const statuses = ["Open", "In Progress", "Resolved"];

function Field({ id, label, error, children }) {
  return (
    <div className="grid gap-1.5 text-[10px] font-semibold text-stone-600">
      <label htmlFor={id}>{label}<span className="ml-1 text-red-600" aria-hidden="true">*</span></label>
      {children}
      {error && <p id={`${id}-error`} className="font-normal text-rose-700" role="alert">{error}</p>}
    </div>
  );
}

function TicketCreate({
  onBack,
  onSubmit,
  initialTicket,
  staff,
  staffStatus,
  staffError,
  onRetryStaff,
}) {
  const [values, setValues] = useState(() => ({
    title: initialTicket?.title ?? "",
    description: initialTicket?.description ?? "",
    category: initialTicket?.category ?? "",
    priority: initialTicket?.priority ?? "Medium",
    status: initialTicket?.status ?? "Open",
    customer: initialTicket?.customer ?? "",
    assignee: initialTicket?.assignee ?? "",
  }));
  const [errors, setErrors] = useState({});
  const editing = Boolean(initialTicket);

  const updateField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    ["title", "description", "category", "priority", "status"].forEach((field) => {
      if (!values[field].trim()) nextErrors[field] = "This field is required.";
    });
    if (values.title.trim().length > 120) {
      nextErrors.title = "Title must be 120 characters or fewer.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category.trim(),
      customer: values.customer.trim(),
    });
  };

  return (
    <>
      <PageHeader
        title={editing ? "Edit Ticket" : "Create New Ticket"}
        description={editing ? "Update the ticket details and assignment." : "Create a support ticket for your customer."}
      />
      <button onClick={onBack} className="mb-4 flex items-center gap-1 text-xs font-medium text-[#a34b32]" type="button">
        <ArrowLeft size={14} /> Back to tickets
      </button>

      <form onSubmit={handleSubmit} noValidate className="grid gap-4 lg:grid-cols-[1fr_270px]">
        <div className="grid content-start gap-4">
          <section className="surface-panel grid gap-4 p-4">
            <h2 className="border-b border-stone-100 pb-2 text-xs font-bold">Ticket Information</h2>
            <Field id="ticket-title" label="Title" error={errors.title}>
              <input id="ticket-title" name="title" value={values.title} onChange={updateField} maxLength={120} required className="form-control w-full" aria-invalid={Boolean(errors.title)} aria-describedby={errors.title ? "ticket-title-error" : undefined} />
            </Field>
            <Field id="ticket-description" label="Description" error={errors.description}>
              <textarea id="ticket-description" name="description" value={values.description} onChange={updateField} rows={5} required className="form-control w-full py-2" aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? "ticket-description-error" : undefined} />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field id="ticket-category" label="Category" error={errors.category}>
                <select id="ticket-category" name="category" value={values.category} onChange={updateField} className="form-control w-full" aria-invalid={Boolean(errors.category)}>
                  <option value="">Select category</option>
                  {categories.map((category) => <option key={category}>{category}</option>)}
                </select>
              </Field>
              <Field id="ticket-customer" label="Customer (optional)">
                <input id="ticket-customer" name="customer" value={values.customer} onChange={updateField} className="form-control w-full" />
              </Field>
              <Field id="ticket-priority" label="Priority" error={errors.priority}>
                <select id="ticket-priority" name="priority" value={values.priority} onChange={updateField} className="form-control w-full" aria-invalid={Boolean(errors.priority)}>
                  {priorities.map((priority) => <option key={priority}>{priority}</option>)}
                </select>
              </Field>
              <Field id="ticket-status" label="Status" error={errors.status}>
                <select id="ticket-status" name="status" value={values.status} onChange={updateField} className="form-control w-full" aria-invalid={Boolean(errors.status)}>
                  {statuses.map((status) => <option key={status}>{status}</option>)}
                </select>
              </Field>
            </div>
          </section>

          <section className="surface-panel grid gap-3 p-4">
            <h2 className="text-xs font-bold">Assignment</h2>
            {staffStatus === "loading" && <p role="status" className="text-xs text-stone-500">Loading support staff...</p>}
            {staffStatus === "error" && (
              <div role="alert" className="flex flex-wrap items-center justify-between gap-2 text-xs text-rose-700">
                <span>Could not load support staff: {staffError}</span>
                <button type="button" onClick={onRetryStaff} className="secondary-button"><RefreshCw size={12} /> Retry</button>
              </div>
            )}
            {staffStatus === "loaded" && staff.length === 0 && (
              <p role="status" className="text-xs text-stone-600">No staff members were returned. This ticket can be left unassigned.</p>
            )}
            <label htmlFor="ticket-assignee" className="grid gap-1.5 text-[10px] font-semibold text-stone-600">
              Assignee
              <select id="ticket-assignee" name="assignee" value={values.assignee} onChange={updateField} className="form-control w-full">
                <option value="">Unassigned</option>
                {values.assignee && !staff.some((member) => member.name === values.assignee) && <option>{values.assignee}</option>}
                {staff.map((member) => <option key={member.id} value={member.name}>{member.name} — {member.role}</option>)}
              </select>
            </label>
          </section>
        </div>

        <aside className="surface-panel h-fit p-4">
          <h2 className="mb-3 text-xs font-bold">Ticket requirements</h2>
          <p className="text-[10px] leading-5 text-stone-600">Title, description, category, priority and status are required. Tickets are saved in this browser and remain after refresh.</p>
          <div className="mt-5 flex flex-wrap justify-end gap-2">
            <button type="button" onClick={onBack} className="secondary-button">Cancel</button>
            <button type="submit" className="primary-button">{editing ? "Save Changes" : "Create Ticket"}</button>
          </div>
        </aside>
      </form>
    </>
  );
}

export default TicketCreate;
