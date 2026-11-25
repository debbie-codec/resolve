import { ChevronDown } from "lucide-react";

function UserProfile({ compact = false }) {
  // In compact headers, hide profile details until the extra-large breakpoint.
  const detailsClass = compact ? "hidden xl:block" : "hidden sm:block";

  return (
    <button className="flex items-center gap-2 text-left" aria-label="Alex Carter, Support Manager">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#6b3b29] text-xs font-semibold text-white">AC</span>
      <span className={detailsClass}>
        <strong className="block text-xs">Alex Carter</strong>
        <small className="text-[9px] text-stone-500">Support Manager</small>
      </span>
      <ChevronDown size={12} className={detailsClass} />
    </button>
  );
}

export default UserProfile;
