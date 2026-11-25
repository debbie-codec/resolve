// Prepare ticket data for the charts displayed on the dashboard.

// Create chart buckets for the selected time period.
// The chart ends on the newest relevant date found in the ticket list.
export function getTicketVolumeTrend(ticketList, period = "week") {
  let newestDate = null;

  for (let index = 0; index < ticketList.length; index += 1) {
    const ticket = ticketList[index];
    const createdDate = new Date(ticket.createdAt);

    if (newestDate === null || createdDate > newestDate) {
      newestDate = createdDate;
    }

    if (ticket.status === "Resolved") {
      const resolvedDate = new Date(ticket.updatedAt);
      if (newestDate === null || resolvedDate > newestDate) {
        newestDate = resolvedDate;
      }
    }
  }

  if (newestDate === null) {
    newestDate = new Date();
  }

  const buckets = [];

  if (period === "day") {
    const dateKey = newestDate.toISOString().slice(0, 10);

    for (let hour = 0; hour < 24; hour += 1) {
      const date = new Date(Date.UTC(2000, 0, 1, hour));
      buckets.push({
        dateKey,
        hour: String(hour).padStart(2, "0"),
        label: date.toLocaleTimeString(undefined, {
          hour: "numeric",
          timeZone: "UTC",
        }),
      });
    }
  } else if (period === "year") {
    // Show the newest month and the eleven months before it.
    for (let monthOffset = 11; monthOffset >= 0; monthOffset -= 1) {
      const date = new Date(Date.UTC(
        newestDate.getUTCFullYear(),
        newestDate.getUTCMonth() - monthOffset,
        1,
      ));

      buckets.push({
        monthKey: date.toISOString().slice(0, 7),
        label: date.toLocaleDateString(undefined, {
          month: "short",
          year: "2-digit",
          timeZone: "UTC",
        }),
      });
    }
  } else {
    // A week shows seven days; a month shows the latest thirty days.
    const dayCount = period === "month" ? 30 : 7;

    for (let dayOffset = dayCount - 1; dayOffset >= 0; dayOffset -= 1) {
      const date = new Date(newestDate);
      date.setUTCHours(0, 0, 0, 0);
      date.setUTCDate(date.getUTCDate() - dayOffset);

      buckets.push({
        dateKey: date.toISOString().slice(0, 10),
        label: date.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        }),
      });
    }
  }

  return buckets.map((bucket) => {
    let createdCount = 0;
    let resolvedCount = 0;

    for (let index = 0; index < ticketList.length; index += 1) {
      const ticket = ticketList[index];
      const createdMatches = period === "day"
        ? ticket.createdAt.slice(0, 10) === bucket.dateKey
          && ticket.createdAt.slice(11, 13) === bucket.hour
        : period === "year"
          ? ticket.createdAt.slice(0, 7) === bucket.monthKey
          : ticket.createdAt.slice(0, 10) === bucket.dateKey;

      if (createdMatches) {
        createdCount += 1;
      }

      if (ticket.status === "Resolved") {
        const resolvedMatches = period === "day"
          ? ticket.updatedAt.slice(0, 10) === bucket.dateKey
            && ticket.updatedAt.slice(11, 13) === bucket.hour
          : period === "year"
            ? ticket.updatedAt.slice(0, 7) === bucket.monthKey
            : ticket.updatedAt.slice(0, 10) === bucket.dateKey;

        if (resolvedMatches) {
          resolvedCount += 1;
        }
      }
    }

    return {
      day: bucket.label,
      created: createdCount,
      resolved: resolvedCount,
    };
  });
}

// Create the data array needed by the priority pie chart.
export function getOpenTicketPriorityBreakdown(ticketList) {
  const colors = {
    High: "#a9432b",
    Medium: "#e5a839",
    Low: "#e7d39b",
    Urgent: "#c98470",
  };
  const openTickets = ticketList.filter((ticket) => ticket.status === "Open");

  return Object.entries(colors).map(([name, color]) => {
    let count = 0;

    for (let index = 0; index < openTickets.length; index += 1) {
      if (openTickets[index].priority === name) {
        count += 1;
      }
    }

    return { name, color, value: count };
  });
}
