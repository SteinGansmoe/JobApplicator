import { Application, ApplicationStatus } from "@/app/src/types";

type ApplicationCardProps = {
  application: Application;
  onStatusChange: (id: string, newStatus: ApplicationStatus) => void;
  onDelete: (id: string) => void;
};

const statusStyles: Record<ApplicationStatus, string> = {
  saved: "bg-slate-500/20 text-slate-200 ring-slate-400/30",
  applied: "bg-blue-500/20 text-blue-200 ring-blue-400/30",
  interview: "bg-cyan-500/20 text-cyan-200 ring-cyan-400/30",
  offer: "bg-emerald-500/20 text-emerald-200 ring-emerald-400/30",
  rejected: "bg-rose-500/20 text-rose-200 ring-rose-400/30",
  withdrawn: "bg-amber-500/20 text-amber-200 ring-amber-400/30",
};

function formatStatusLabel(status: ApplicationStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function ApplicationCard({
  application,
  onStatusChange,
  onDelete,
}: ApplicationCardProps) {
  const handleDelete = () => {
    const shouldDelete = window.confirm(
      `Delete ${application.position} at ${application.company}? This action cannot be undone.`
    );

    if (shouldDelete) {
      onDelete(application.id);
    }
  };

  return (
    <div className="relative rounded-[1.35rem] border border-white/6 bg-[#2f2d35] p-4 text-white shadow-[0_18px_40px_rgba(10,10,16,0.22)] ring-1 ring-black/10">
      <button
        type="button"
        onClick={handleDelete}
        aria-label={`Delete ${application.company} application`}
        className="absolute right-3 top-3 rounded-lg p-2 text-[#e6e2f0]/80 transition hover:bg-[#4d4a57] hover:text-[#ff8f9f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8f9f]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </button>
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8aa2ff] to-[#596dff] text-lg font-semibold text-white shadow-[0_10px_24px_rgba(89,109,255,0.35)]">
          {application.company.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[1rem] font-semibold tracking-[0.01em] text-white">
                {application.company}
              </p>
              <p className="mt-1 text-sm text-[#b4b0bf]">
                {application.position}
              </p>
            </div>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${statusStyles[application.status]}`}
            >
              {formatStatusLabel(application.status)}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-white/5 bg-[#3a3741] px-3 py-2.5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8c8699]">
            Applied
          </p>
          <p className="mt-1 text-sm font-medium text-[#f3f1f8]">
            {new Date(application.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="rounded-xl border border-white/5 bg-[#3a3741] px-3 py-2.5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8c8699]">
            Location
          </p>
          <p className="mt-1 text-sm font-medium text-[#f3f1f8]">
            {application.location || "None specified"}
          </p>
        </div>
      </div>


{/* Status Dropdown this is a temp solution until Kanban with drag and drop is implemented. */}
      <select
        value={application.status}
        onChange={(e) =>
          onStatusChange(application.id, e.target.value as ApplicationStatus)
        }
        className="
          mt-4
          w-full
          px-3 py-2
          rounded-xl
          border border-white/8
          bg-[#3a3741]
          text-[#f4f2f8]
          focus:outline-none focus:ring-2 focus:ring-[#7188ff]
        "
      >
        <option value="saved">Saved</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
        <option value="withdrawn">Withdrawn</option>
      </select>
      <div className="mt-4 px-3 py-2.5">
          <p className="text-[11px] text-right uppercase tracking-[0.18em] text-[#8c8699]">
            Last Updated
          </p>
          <p className="mt-1 text-right text-sm font-medium text-[#f3f1f8]">
            {new Date(application.updated_at).toLocaleDateString()}
          </p>
        </div>
    </div>
  );
}
