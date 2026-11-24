import { Bell, Search } from "lucide-react";
import UserProfile from "./UserProfile";

function PageHeader({ title = "Good afternoon, Alex 👋", description = "Here's what's happening with your support operations today." }) {
  return (
    <header className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
      <div className="min-w-0">
        <h1 className="text-lg font-bold sm:text-xl">{title}</h1>
        {description && <p className="mt-1 text-xs text-stone-500">{description}</p>}
      </div>
      <div className="flex min-w-0 items-center gap-2 md:justify-end">
        <label className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 text-stone-400 md:w-48 md:flex-none lg:w-56">
          <Search size={15} className="shrink-0" />
          <input aria-label="Search tickets or customers" className="min-w-0 flex-1 text-[11px] text-stone-700 outline-none placeholder:text-stone-400" placeholder="Search tickets..." />
        </label>
        <button className="relative grid h-9 w-9 shrink-0 place-items-center rounded-lg text-stone-600 hover:bg-white" aria-label="Notifications">
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-600" />
        </button>
        <UserProfile compact />
      </div>
    </header>
  );
}

export default PageHeader;
