import { Application, ApplicationStatus } from "@/app/src/types";
import ApplicationCard from "@/components/application-card";

type ApplicationListProps = {
  applications: Application[];
  onStatusChange: (id: string, newStatus: ApplicationStatus) => void;
};

export default function ApplicationList({
  applications,
  onStatusChange,
}: ApplicationListProps) {
  return (
    <div className="space-y-6">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
