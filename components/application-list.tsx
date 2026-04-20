import { Application, ApplicationStatus } from "@/app/src/types";
import ApplicationCard from "@/components/application-card";

type ApplicationListProps = {
  applications: Application[];
  onStatusChange: (id: string, newStatus: ApplicationStatus) => void;
  onDeleteApplication: (id: string) => void;
  onToggleForm: () => void;
  isFormOpen: boolean;
};

export default function ApplicationList({
  applications,
  onStatusChange,
  onDeleteApplication,
  onToggleForm,
  isFormOpen,
}: ApplicationListProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/6 bg-[#26242c] p-4 shadow-[0_24px_60px_rgba(10,10,16,0.28)] ring-1 ring-black/10 md:p-6">
      <div className="mb-5 grid gap-4 border-b border-white/6 pb-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#8e8999]">
            Application Board
          </p>
          <h2 className="mt-1 text-xl font-semibold text-[#f5f3fa]">
            Open Applications
          </h2>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={onToggleForm}
            className="inline-flex items-center justify-center rounded-full border border-[#7d89ff]/30 bg-[linear-gradient(135deg,_rgba(128,144,255,0.95),_rgba(93,110,255,0.78))] px-5 py-2 text-sm font-medium text-white shadow-[0_12px_30px_rgba(93,110,255,0.28)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ea0ff]"
          >
            {isFormOpen ? "Close Application Form" : "Add Application"}
          </button>
        </div>

        <div className="flex justify-start md:justify-end">
          <div className="rounded-full border border-[#7d89ff]/20 bg-[#6d7eff]/15 px-3 py-1 text-xs font-medium text-[#cbd2ff]">
            {applications.length} tracked
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onStatusChange={onStatusChange}
            onDelete={onDeleteApplication}
          />
        ))}
      </div>
    </section>
  );
}
