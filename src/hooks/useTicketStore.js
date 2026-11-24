import { useEffect, useState } from "react";
import { tickets as seedTickets } from "../data/tickets";

const STORAGE_KEY = "resolve.tickets.v1";

function readStoredTickets() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // Use sample data on a first visit; subsequent visits restore the saved ticket array.
    if (stored === null) return { tickets: seedTickets, notice: "" };

    const parsed = JSON.parse(stored);
    const validTickets = Array.isArray(parsed) && parsed.every((ticket) => (
      ticket
      && typeof ticket.id === "string"
      && typeof ticket.title === "string"
      && typeof ticket.description === "string"
      && typeof ticket.category === "string"
      && ["Urgent", "High", "Medium", "Low"].includes(ticket.priority)
      && ["Open", "In Progress", "Resolved"].includes(ticket.status)
      && typeof ticket.createdAt === "string"
      && typeof ticket.updatedAt === "string"
    ));
    if (!validTickets) throw new Error("Stored ticket data has an invalid shape.");

    return { tickets: parsed, notice: "" };
  } catch (error) {
    console.error("Could not load saved tickets.", error);
    return {
      tickets: seedTickets,
      notice: "Saved ticket data could not be read. Showing the sample tickets instead.",
    };
  }
}

function useTicketStore() {
  const [stored] = useState(readStoredTickets);
  const [tickets, setTickets] = useState(stored.tickets);
  const [notice, setNotice] = useState(stored.notice);

  // Persist immediately after every create, edit, status and delete operation.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
    } catch (error) {
      console.error("Could not save tickets to local storage.", error);
      // Mutations are still visible in memory; the console records persistence failure.
    }
  }, [tickets]);

  const createTicket = (ticket) => {
    setTickets((current) => [ticket, ...current]);
    setNotice("Ticket created successfully.");
  };

  const updateTicket = (updatedTicket) => {
    setTickets((current) => current.map((ticket) => (
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    )));
    setNotice("Ticket updated successfully.");
  };

  const deleteTicket = (id) => {
    deleteTickets([id]);
  };

  const deleteTickets = (ids) => {
    setTickets((current) => current.filter((ticket) => !ids.includes(ticket.id)));
    setNotice(ids.length === 1 ? "Ticket deleted successfully." : `${ids.length} tickets deleted successfully.`);
  };

  const updateStatuses = (ids, status) => {
    const updatedAt = new Date().toISOString();
    setTickets((current) => current.map((ticket) => (
      ids.includes(ticket.id) ? { ...ticket, status, updatedAt } : ticket
    )));
    setNotice(ids.length === 1
      ? `Ticket status changed to ${status}.`
      : `${ids.length} tickets moved to ${status}.`);
  };

  const updateStatus = (id, status) => {
    updateStatuses([id], status);
  };

  return { tickets, notice, setNotice, createTicket, updateTicket, deleteTicket, deleteTickets, updateStatus, updateStatuses };
}

export default useTicketStore;
