import {
  DndContext,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Application, ApplicationStatus } from "@/app/src/types";
import ApplicationCard from "@/components/application-card";
import { useState } from "react";

const boardColumns: { status: ApplicationStatus; label: string }[] = [
  { status: "saved", label: "Saved" },
  { status: "applied", label: "Applied" },
  { status: "interview", label: "Interview" },
  { status: "offer", label: "Offer" },
  { status: "rejected", label: "Rejected" },
];

type ApplicationListProps = {
  applications: Application[];
  onStatusChange: (id: string, newStatus: ApplicationStatus) => void;
  onDeleteApplication: (id: string) => void;
  onToggleForm: () => void;
  isFormOpen: boolean;
  onOpenDetails: (id: string) => void;
};

type BoardColumnProps = {
  applications: Application[];
  label: string;
  onDeleteApplication: (id: string) => void;
  onOpenDetails: (id: string) => void;
  status: ApplicationStatus;
};

function BoardColumn({
  applications,
  label,
  onDeleteApplication,
  onOpenDetails,
  status,
}: BoardColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <section
      ref={setNodeRef}
      data-status={status}
      className={`min-w-0 rounded-xl border border-white/6 bg-[#201f26] p-3 transition 2xl:min-w-[250px] ${
        isOver ? "ring-2 ring-[#8ea0ff] bg-[#26242c]" : ""
      }`}
    >
      <div className="mb-3 flex items-center justify-between rounded-xl bg-[#302e37] px-3 py-2">
        <h3 className="text-sm font-semibold text-[#f5f3fa]">{label}</h3>
        <span className="rounded-full border border-white/8 bg-white/5 px-2 py-0.5 text-xs font-medium text-[#c8c4d1]">
          {applications.length}
        </span>
      </div>

      <div className="space-y-3">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onDelete={onDeleteApplication}
            onOpenDetails={onOpenDetails}
          />
        ))}

        {applications.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/10 px-3 py-8 text-center text-sm text-[#8e8999]">
            No applications
          </div>
        )}
      </div>
    </section>
  );
}

export default function ApplicationList({
  applications,
  onStatusChange,
  onDeleteApplication,
  onToggleForm,
  isFormOpen,
  onOpenDetails,
}: ApplicationListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const [activeApplicationId, setActiveApplicationId] = useState<string | null>(
    null
  );

  const activeApplication =
    applications.find((application) => application.id === activeApplicationId) ??
    null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveApplicationId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const applicationId = String(event.active.id);
    const nextStatus = event.over?.id as ApplicationStatus | undefined;

    setActiveApplicationId(null);

    if (!nextStatus) {
      return;
    }

    const draggedApplication = applications.find(
      (application) => application.id === applicationId
    );

    if (!draggedApplication || draggedApplication.status === nextStatus) {
      return;
    }

    onStatusChange(applicationId, nextStatus);
  };

  const handleDragCancel = () => {
    setActiveApplicationId(null);
  };

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
          <div className="rounded-2xl border border-[#7d89ff]/20 bg-[#6d7eff]/15 px-4 py-2 text-right">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9aa4ff]">
              Total
            </p>
            <p className="text-2xl font-semibold text-[#f5f3fa]">
              {applications.length}
            </p>
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="grid gap-4 pb-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
          {boardColumns.map((column) => {
            const columnApplications = applications.filter(
              (application) => application.status === column.status
            );

            return (
              <BoardColumn
                key={column.status}
                applications={columnApplications}
                label={column.label}
                onDeleteApplication={onDeleteApplication}
                onOpenDetails={onOpenDetails}
                status={column.status}
              />
            );
          })}
        </div>

        <DragOverlay>
          {activeApplication ? (
            <div className="z-[100] rotate-[1.5deg]">
              <ApplicationCard
                application={activeApplication}
                onDelete={onDeleteApplication}
                onOpenDetails={onOpenDetails}
                draggable={false}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}
