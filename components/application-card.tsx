import { Application, ApplicationStatus } from "@/app/src/types";

type ApplicationCardProps = {
  application: Application;
  onStatusChange: (id: string, newStatus: ApplicationStatus) => void;
};

export default function ApplicationCard({
  application,
  onStatusChange,
}: ApplicationCardProps) {
  return (
    <div className="p-4 rounded border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Company: {application.company}
      </h1>
      <h2 className="text-base font-medium text-gray-900 dark:text-gray-100">
        Position: {application.position}
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Status: {application.status}
      </p>

      <p className="text-gray-700 dark:text-gray-300">
        Applied: {new Date(application.created_at).toLocaleDateString()}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        Last Updated: {new Date(application.updated_at).toLocaleDateString()}
      </p>
      <select
        value={application.status}
        onChange={(e) =>
          onStatusChange(application.id, e.target.value as ApplicationStatus)
        }
        className="
          mt-2
          w-full
          px-3 py-2
          rounded
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      >
        <option value="saved">Saved</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
        <option value="withdrawn">Withdrawn</option>
      </select>
    </div>
  );
}
