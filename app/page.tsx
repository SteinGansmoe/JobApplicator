"use client";
import { mockApplications } from './src/mock/mockApplications';
import { Application, ApplicationStatus } from './src/types';
import { useState } from 'react';

export default function Home() {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [showForm, setShowForm] = useState(false);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("saved");
  const [jobUrl, setJobUrl] = useState("");


const addApplication = (app: Application) => {
    setApplications(prev => [...prev, app]);
}

const updateStatus = (id: string, newStatus: ApplicationStatus) => {
    setApplications(prev => prev.map(app => app.id === id ? {...app, status: newStatus, updated_at: new Date().toISOString()} : app));
}


const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!company.trim() || !position.trim()) {
        alert("Company and Position are required");
        return;
    }
    const newApp: Application = {
        id: (applications.length + 1).toString(),
        company: company.trim(),
        position: position.trim(),
        status: status as ApplicationStatus,
        job_url: jobUrl,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
    addApplication(newApp);
    onCancel();
}

const onCancel = () => {
    setShowForm(false);
    setCompany("");
    setPosition("");
    setStatus("saved");
    setJobUrl("");
}

const stats = {
  total: applications.length,
  saved: applications.filter(app => app.status === "saved").length,
  applied: applications.filter(app => app.status === "applied").length,
  interview: applications.filter(app => app.status === "interview").length,
  offer: applications.filter(app => app.status === "offer").length,
  rejected: applications.filter(app => app.status === "rejected").length,
  withdrawn: applications.filter(app => app.status === "withdrawn").length,
}

const statsArray = [
  { label: "Total", value: stats.total },
  { label: "Saved", value: stats.saved },
  { label: "Applied", value: stats.applied },
  { label: "Interview", value: stats.interview },
  { label: "Offer", value: stats.offer },
  { label: "Rejected", value: stats.rejected },
  { label: "Withdrawn", value: stats.withdrawn },
];

  return (
    <div className="max-w-5xl mx-auto px-4">
    <h1 className="text-3xl font-bold mb-6">Job Applications</h1>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-6 p-2">
      {statsArray.map(item => (
        <div key={item.label} className="p-4 text-center border border-gray-200 dark:border-gray-800 rounded shadow-sm bg-white dark:bg-gray-900">
          <p className="text-2xl font-bold">{item.value}</p>
          <p className="text-gray-500 dark:text-gray-400 font-medium">{item.label}</p>
        </div>
      ))}
    </div>
    <button
      onClick={() => setShowForm(!showForm)}
      className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      {showForm ? "Close Form" : "Add Application"}
    </button>
    { showForm && (
      <form
  className="
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
    onChange={(e) => setCompany(e.target.value)}
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
    onChange={(e) => setPosition(e.target.value)}
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

  <select
    value={status}
    onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
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
    onChange={(e) => setJobUrl(e.target.value)}
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
      onClick={handleSubmit}
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
    )}
      <div className="space-y-6">
    {applications.map(app => (
      <div key={app.id} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <h1>Company: {app.company}</h1>
        <h2>Position: {app.position}</h2>
        <p>Status: {app.status}</p>
        
        <p>Applied: {new Date(app.created_at).toLocaleDateString()}</p>
        <p>Last Updated: {new Date(app.updated_at).toLocaleDateString()}</p>
        <select 
        value={app.status}
        onChange={(e) => updateStatus(app.id, e.target.value as ApplicationStatus)}
        className="mt-2 p-2 border rounded"
        >
          <option value="saved">Saved</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
          <option value="withdrawn">Withdrawn</option>
        </select>
      </div>
    ))}
  </div>
  
  </div>
  );
}
