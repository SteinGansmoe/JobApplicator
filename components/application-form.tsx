import { ApplicationStatus } from "@/app/src/types";

type ApplicationFormProps = {
  company: string;
  position: string;
  location?: string;
  status: string;
  jobUrl: string;
  onCompanyChange: (value: string) => void;
  onPositionChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onStatusChange: (value: ApplicationStatus) => void;
  onJobUrlChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
};

export default function ApplicationForm({
  company,
  position,
  status,
  jobUrl,
  location,
  onCompanyChange,
  onPositionChange,
  onLocationChange,
  onStatusChange,
  onJobUrlChange,
  onSubmit,
  onCancel,
}: ApplicationFormProps) {
  return (
    <form
      className="
        mb-6
        space-y-4
        p-6
        rounded-xl
        border border-gray-200 dark:border-gray-800
        bg-white dark:bg-gray-900
        shadow-sm
      "
    >
      <h2 className="text-xl font-semibold">New Application</h2>

      <input
        value={company}
        onChange={(e) => onCompanyChange(e.target.value)}
        placeholder="Company"
        className="
          w-full
          px-3 py-2
          rounded-lg
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      <input
        value={position}
        onChange={(e) => onPositionChange(e.target.value)}
        placeholder="Position"
        className="
          w-full
          px-3 py-2
          rounded-lg
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      <input
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        placeholder="Location (optional)"
        className="
          w-full
          px-3 py-2
          rounded-lg
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value as ApplicationStatus)}
        className="
          w-full
          px-3 py-2
          rounded-lg
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

      <input
        value={jobUrl}
        onChange={(e) => onJobUrlChange(e.target.value)}
        placeholder="Job URL (optional)"
        className="
          w-full
          px-3 py-2
          rounded-lg
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          onClick={onSubmit}
          className="
            px-4 py-2
            rounded-lg
            bg-blue-600 text-white
            hover:bg-blue-700
            transition
          "
        >
          Add
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="
            px-4 py-2
            rounded-lg
            border border-gray-300 dark:border-gray-700
            text-gray-700 dark:text-gray-300
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition
          "
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
