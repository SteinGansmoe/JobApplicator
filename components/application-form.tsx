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
        overflow-hidden
        rounded-[1.75rem]
        border border-white/6
        bg-[#26242c]
        shadow-[0_24px_60px_rgba(10,10,16,0.28)]
        ring-1 ring-black/10
      "
    >
      <div className="border-b border-white/6 bg-[linear-gradient(180deg,_rgba(60,58,71,0.92),_rgba(38,36,44,0.96))] px-6 py-5">
        <p className="text-xs uppercase tracking-[0.22em] text-[#8e8999]">
          New Entry
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-[#f5f3fa]">
          Add Application
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[#b7b2c1]">
          Capture the role details here so the application can be placed into
          the board and moved through the workflow later.
        </p>
      </div>

      <div
        className="
        grid
        gap-4
        p-6
        md:grid-cols-2
      "
      >
        <label className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#8c8699]">
            Company
          </span>
          <input
            value={company}
            onChange={(e) => onCompanyChange(e.target.value)}
            placeholder="Gjensidige"
            className="
              w-full
              rounded-xl
              border border-white/8
              bg-[#34323b]
              px-4 py-2
              text-sm text-[#f5f3fa]
              placeholder:text-[#8f899b]
              focus:outline-none focus:ring-2 focus:ring-[#7188ff]
            "
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#8c8699]">
            Position
          </span>
          <input
            value={position}
            onChange={(e) => onPositionChange(e.target.value)}
            placeholder="Frontend Developer"
            className="
              w-full
              rounded-xl
              border border-white/8
              bg-[#34323b]
              px-4 py-2
              text-sm text-[#f5f3fa]
              placeholder:text-[#8f899b]
              focus:outline-none focus:ring-2 focus:ring-[#7188ff]
            "
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#8c8699]">
            Location
          </span>
          <input
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Oslo (optional)"
            className="
              w-full
              rounded-xl
              border border-white/8
              bg-[#34323b]
              px-4 py-2
              text-sm text-[#f5f3fa]
              placeholder:text-[#8f899b]
              focus:outline-none focus:ring-2 focus:ring-[#7188ff]
            "
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#8c8699]">
            Status
          </span>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as ApplicationStatus)}
            className="
              w-full
              rounded-xl
              border border-white/8
              bg-[#34323b]
              px-4 py-2
              text-sm text-[#f5f3fa]
              focus:outline-none focus:ring-2 focus:ring-[#7188ff]
            "
          >
            <option value="saved">Saved</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#8c8699]">
            Job URL
          </span>
          <input
            value={jobUrl}
            onChange={(e) => onJobUrlChange(e.target.value)}
            placeholder="https://company.com/job-posting"
            className="
              w-full
              rounded-xl
              border border-white/8
              bg-[#34323b]
              px-4 py-2
              text-sm text-[#f5f3fa]
              placeholder:text-[#8f899b]
              focus:outline-none focus:ring-2 focus:ring-[#7188ff]
            "
          />
        </label>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/6 bg-[#232129] px-6 py-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="
            inline-flex items-center justify-center
            rounded-full
            border border-white/10
            bg-white/5
            px-5 py-2.5
            text-sm font-medium text-[#d0ccd8]
            transition
            hover:bg-white/10
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          onClick={onSubmit}
          className="
            inline-flex items-center justify-center
            rounded-full
            border border-[#7d89ff]/30
            bg-[linear-gradient(135deg,_rgba(128,144,255,0.95),_rgba(93,110,255,0.78))]
            px-5 py-2.5
            text-sm font-medium text-white
            shadow-[0_12px_30px_rgba(93,110,255,0.28)]
            transition
            hover:brightness-110
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-[#8ea0ff]
          "
        >
          Add Application
        </button>
      </div>
    </form>
  );
}
