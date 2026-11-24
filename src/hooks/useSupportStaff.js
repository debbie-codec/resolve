import { useEffect, useState } from "react";

const STAFF_API_URL = "https://jsonplaceholder.typicode.com/users";

function useSupportStaff() {
  const [staff, setStaff] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStaff() {
      setStatus("loading");
      setError("");

      try {
        const response = await fetch(STAFF_API_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Staff request failed with status ${response.status}.`);
        }

        const users = await response.json();
        if (!Array.isArray(users)) {
          throw new Error("The staff service returned an unexpected response.");
        }

        setStaff(users.filter((user) => (
          user
          && (typeof user.id === "string" || typeof user.id === "number")
          && typeof user.name === "string"
          && typeof user.email === "string"
        )).map((user) => ({
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: "Support Specialist",
        })));
        // An empty valid response is displayed as an empty staff directory by the page.
        setStatus("loaded");
      } catch (requestError) {
        if (requestError.name === "AbortError") return;
        console.error("Could not load support staff.", requestError);
        setError(requestError.message || "Could not load support staff.");
        setStatus("error");
      }
    }

    loadStaff();
    return () => controller.abort();
  }, [attempt]);

  return { staff, status, error, retry: () => setAttempt((current) => current + 1) };
}

export default useSupportStaff;
