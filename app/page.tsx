"use client";
import ApplicationForm from "@/components/application-form";
import ApplicationList from "@/components/application-list";
import ApplicationStats from "@/components/application-stats";
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
    <ApplicationStats stats={statsArray} />
    <button
      onClick={() => setShowForm(!showForm)}
      className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      {showForm ? "Close Form" : "Add Application"}
    </button>
    { showForm && (
      <ApplicationForm
        company={company}
        position={position}
        status={status}
        jobUrl={jobUrl}
        onCompanyChange={setCompany}
        onPositionChange={setPosition}
        onStatusChange={setStatus}
        onJobUrlChange={setJobUrl}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    )}
    <ApplicationList
      applications={applications}
      onStatusChange={updateStatus}
    />
  
  </div>
  );
}
