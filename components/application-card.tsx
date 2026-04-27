import { useDraggable } from "@dnd-kit/core";
import { Application, ApplicationStatus } from "@/app/src/types";

type ApplicationCardProps = {
  application: Application;
  onDelete: (id: string) => void;
  onOpenDetails: (id: string) => void;
  draggable?: boolean;
};

const statusStyles: Record<ApplicationStatus, string> = {
  saved: "bg-slate-500/20 text-slate-200 ring-slate-400/30",
  applied: "bg-blue-500/20 text-blue-200 ring-blue-400/30",
  interview: "bg-cyan-500/20 text-cyan-200 ring-cyan-400/30",
  offer: "bg-emerald-500/20 text-emerald-200 ring-emerald-400/30",
  rejected: "bg-rose-500/20 text-rose-200 ring-rose-400/30",
};

function formatStatusLabel(status: ApplicationStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function ApplicationCard({
  application,
  onDelete,
  onOpenDetails,
  draggable = true,
}: ApplicationCardProps) {
  const draggableState = useDraggable({
    id: application.id,
    data: {
      applicationId: application.id,
      status: application.status,
    },
    disabled: !draggable,
  });

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    draggableState;

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      `Delete ${application.position} at ${application.company}? This action cannot be undone.`
    );

    if (shouldDelete) {
      onDelete(application.id);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        touchAction: "none",
      }}
      className={`relative rounded-md border border-white/6 bg-[#2f2d35] p-4 text-white shadow-[0_18px_40px_rgba(10,10,16,0.22)] ring-1 ring-black/10 ${
        isDragging ? "opacity-0 ring-2 ring-[#8ea0ff]" : ""
      }`}
      {...attributes}
      {...listeners}
    >
      <button
        type="button"
        onClick={handleDelete}
        onPointerDown={(e) => e.stopPropagation()}
        aria-label={`Delete ${application.company} application`}
        className="cursor-pointer absolute right-1 top-1 z-10 rounded p-2 text-[#e6e2f0]/80 transition hover:bg-[#4d4a57] hover:text-[#ff8f9f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8f9f]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
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
      <div className="mb-4 flex items-start gap-3 pr-12">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8aa2ff] to-[#596dff] text-lg font-semibold text-white shadow-[0_10px_24px_rgba(89,109,255,0.35)]">
          {application.company.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={() => onOpenDetails(application.id)}
            onPointerDown={(e) => e.stopPropagation()}
            className="cursor-pointer text-left text-[1rem] font-semibold tracking-[0.01em] text-white transition hover:text-[#9aa4ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ea0ff]"
          >
            {application.company}
          </button>
          <p className="mt-1 text-sm text-[#b4b0bf]">
            {application.position}
          </p>
          
          <span
            className={`mt-3 tracking-wider absolute right-1 top-14 inline-flex rounded-full px-2 py-1 text-[11px] font-medium ring-1 ${statusStyles[application.status]}`}
          >
            {formatStatusLabel(application.status)}
          </span>
        
        </div>
      </div>

      <div className="space-y-2 mt-12">
        <p className="text-sm text-[#8c8699]">
          <span className="uppercase tracking-[0.18em] text-[11px] mr-2">
            Applied
          </span>
          <span className="text-[#f3f1f8] font-medium">
            {new Date(application.created_at).toLocaleDateString()}
          </span>
        </p>
        <p className="text-sm text-[#8c8699]">
          <span className="uppercase tracking-[0.18em] text-[11px] mr-2">
            Location
          </span>
          <span className="text-[#f3f1f8] font-medium">
            {application.location || "None specified"}
          </span>
        </p>
      </div>
    </div>
  );
}
