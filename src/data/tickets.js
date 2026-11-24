import { CheckCircle2, Clock3, Ticket } from "lucide-react";

const ticketStatStyles = [
  { label: "Total", status: null, icon: Ticket, iconClass: "text-amber-700", bg: "bg-[#fff1d9]" },
  { label: "Open", status: "Open", icon: Ticket, iconClass: "text-rose-500", bg: "bg-[#fff0ed]" },
  { label: "In Progress", status: "In Progress", icon: Clock3, iconClass: "text-amber-600", bg: "bg-[#fff4df]" },
  { label: "Resolved", status: "Resolved", icon: CheckCircle2, iconClass: "text-green-600", bg: "bg-[#eaf9ef]" },
];

export const tickets = [
  { id: "#RSV-7842", title: "Unable to access company account", description: "Multiple users receive an Access Denied message after entering their credentials, blocking support operations.", category: "Account Access", customer: "Mack Tech Inc.", priority: "High", status: "Open", assignee: "Erin Brooks", avatar: "EB", createdAt: "2026-06-26T10:24:00.000Z", updatedAt: "2026-06-26T10:24:00.000Z" },
  { id: "#RSV-7841", title: "Billing discrepancy on latest invoice", description: "The latest invoice total does not match the agreed plan pricing.", category: "Billing", customer: "Rivermore Solutions", priority: "Medium", status: "In Progress", assignee: "Daniel Hayes", avatar: "DH", createdAt: "2026-06-25T09:57:00.000Z", updatedAt: "2026-06-25T09:57:00.000Z" },
  { id: "#RSV-7839", title: "Feature request: admin user roles", description: "The customer would like additional role options for administrators.", category: "Feature Request", customer: "Northwind Partners", priority: "Low", status: "In Progress", assignee: "Sophia Kim", avatar: "SK", createdAt: "2026-06-25T11:42:00.000Z", updatedAt: "2026-06-25T11:42:00.000Z" },
  { id: "#RSV-7838", title: "Integration error with CRM", description: "The CRM integration fails to sync new records.", category: "Integrations", customer: "Creative Health", priority: "High", status: "Open", assignee: "Marcus Lee", avatar: "ML", createdAt: "2026-06-25T19:26:00.000Z", updatedAt: "2026-06-25T19:26:00.000Z" },
  { id: "#RSV-7836", title: "Password reset not working", description: "Password reset links are not accepted after the customer requests a reset.", category: "Account Access", customer: "Lakeshore Logistics", priority: "Urgent", status: "In Progress", assignee: "Olivia Grant", avatar: "OG", createdAt: "2026-06-25T10:15:00.000Z", updatedAt: "2026-06-25T10:15:00.000Z" },
  { id: "#RSV-7835", title: "500 internal server error", description: "The customer encounters an internal server error while loading reports.", category: "Technical Issue", customer: "Summit Retail Group", priority: "High", status: "Open", assignee: "Ryan Park", avatar: "RP", createdAt: "2026-06-25T11:02:00.000Z", updatedAt: "2026-06-25T11:02:00.000Z" },
  { id: "#RSV-7834", title: "Export report failing", description: "Exporting a report completes with an error instead of downloading a file.", category: "Technical Issue", customer: "Pinecrest Analytics", priority: "Low", status: "Resolved", assignee: "Ana Collins", avatar: "AC", createdAt: "2026-06-24T15:29:00.000Z", updatedAt: "2026-06-24T15:29:00.000Z" },
  { id: "#RSV-7832", title: "Update company contact details", description: "The customer needs the company contact information changed.", category: "Account Management", customer: "Brightshore Media", priority: "Low", status: "Resolved", assignee: "Noah Bennett", avatar: "NB", createdAt: "2026-06-24T15:12:00.000Z", updatedAt: "2026-06-24T15:12:00.000Z" },
  { id: "#RSV-7829", title: "Need help with API rate limits", description: "The customer needs guidance on API rate-limit behavior and usage.", category: "API Support", customer: "Velo Systems", priority: "Medium", status: "In Progress", assignee: "Lucas Morgan", avatar: "LM", createdAt: "2026-06-24T11:09:00.000Z", updatedAt: "2026-06-24T11:09:00.000Z" },
  { id: "#RSV-7828", title: "Unable to add new team members", description: "Inviting a new teammate fails before they can join the account.", category: "Account Management", customer: "Harborlight Capital", priority: "Medium", status: "Resolved", assignee: "Mia Carter", avatar: "MC", createdAt: "2026-06-24T10:57:00.000Z", updatedAt: "2026-06-24T10:57:00.000Z" },
];

export function getTicketStats(ticketList) {
  return ticketStatStyles.map(({ status, ...style }) => ({
    ...style,
    value: String(status ? ticketList.filter((ticket) => ticket.status === status).length : ticketList.length),
  }));
}

export function formatTicketDate(date) {
  return new Date(date).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
