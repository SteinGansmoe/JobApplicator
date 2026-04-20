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
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("saved");
  const [jobUrl, setJobUrl] = useState("");


const addApplication = (app: Application) => {
    setApplications(prev => [...prev, app]);
}

const updateStatus = (id: string, newStatus: ApplicationStatus) => {
    setApplications(prev => prev.map(app => app.id === id ? {...app, status: newStatus, updated_at: new Date().toISOString()} : app));
}

const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
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
        location: location.trim(),
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#4c4957_0%,_#2b2931_38%,_#1c1a21_100%)] px-4 py-8">
    <div className="mx-auto max-w-6xl">
    <h1 className="mb-6 text-3xl font-bold text-white">Job Applications</h1>
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
        location={location}
        onCompanyChange={setCompany}
        onPositionChange={setPosition}
        onLocationChange={setLocation}
        onStatusChange={setStatus}
        onJobUrlChange={setJobUrl}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    )}
    <ApplicationList
      applications={applications}
      onStatusChange={updateStatus}
      onDeleteApplication={deleteApplication}
    />
  
  </div>
  </div>
  );
}
