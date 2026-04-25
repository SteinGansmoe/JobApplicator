import { Application, ApplicationStatus } from "@/app/src/types";

type ApplicationDetailModalProps = {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: ApplicationStatus) => void;
};

const statusOptions: ApplicationStatus[] = [
  "saved",
  "applied",
  "interview",
  "offer",
  "rejected",
];

export default function ApplicationDetailModal({
  application,
  isOpen,
  onClose,
  onStatusChange,
}: ApplicationDetailModalProps) {
  if (!application) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ease-out ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <button
        type="button"
        aria-label="Close application details"
        onClick={onClose}
        className={`absolute inset-0 bg-[#0b0a10]/65 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`absolute right-0 top-0 h-full w-full max-w-2xl border-l border-white/8 bg-[#1d1b23] shadow-[-24px_0_60px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between border-b border-white/6 px-6 py-5">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#8e8999]">
                Application Details
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#f5f3fa]">
                {application.company}
              </h2>
              <p className="mt-1 text-sm text-[#b7b2c1]">
                {application.position}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-[#d7d2df] transition hover:bg-white/10"
            >
              Close
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
            <section className="rounded-2xl border border-white/6 bg-[#26242c] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8e8999]">
                Status
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                <label className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.18em] text-[#8e8999]">
                    Current Stage
                  </span>
                  <select
                    value={application.status}
                    onChange={(e) =>
                      onStatusChange(
                        application.id,
                        e.target.value as ApplicationStatus
                      )
                    }
                    className="w-full rounded-xl border border-white/8 bg-[#34323b] px-4 py-3 text-sm text-[#f5f3fa] focus:outline-none focus:ring-2 focus:ring-[#7188ff]"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="rounded-2xl border border-[#7d89ff]/20 bg-[#6d7eff]/15 px-4 py-3 text-center">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#9aa4ff]">
                    Card ID
                  </p>
                  <p className="mt-1 text-lg font-semibold text-[#f5f3fa]">
                    #{application.id}
                  </p>
                </div>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/6 bg-[#26242c] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8e8999]">
                  Company
                </p>
                <p className="mt-2 text-base font-medium text-[#f5f3fa]">
                  {application.company}
                </p>
              </div>

              <div className="rounded-2xl border border-white/6 bg-[#26242c] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8e8999]">
                  Position
                </p>
                <p className="mt-2 text-base font-medium text-[#f5f3fa]">
                  {application.position}
                </p>
              </div>

              <div className="rounded-2xl border border-white/6 bg-[#26242c] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8e8999]">
                  Location
                </p>
                <p className="mt-2 text-base font-medium text-[#f5f3fa]">
                  {application.location || "None specified"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/6 bg-[#26242c] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8e8999]">
                  Job URL
                </p>
                {application.job_url ? (
                  <a
                    href={application.job_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block break-all text-sm font-medium text-[#9aa4ff] underline-offset-4 hover:underline"
                  >
                    {application.job_url}
                  </a>
                ) : (
                  <p className="mt-2 text-base font-medium text-[#f5f3fa]">
                    None added
                  </p>
                )}
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/6 bg-[#26242c] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8e8999]">
                  Created
                </p>
                <p className="mt-2 text-base font-medium text-[#f5f3fa]">
                  {new Date(application.created_at).toLocaleString()}
                </p>
              </div>

              <div className="rounded-2xl border border-white/6 bg-[#26242c] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8e8999]">
                  Last Updated
                </p>
                <p className="mt-2 text-base font-medium text-[#f5f3fa]">
                  {new Date(application.updated_at).toLocaleString()}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
