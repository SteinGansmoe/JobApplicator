"use client";
import ApplicationForm from "@/components/application-form";
import ApplicationList from "@/components/application-list";
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

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#4c4957_0%,_#2b2931_38%,_#1c1a21_100%)] px-4 py-8">
    <div className="mx-auto max-w-[1600px]">
    <h1 className="mb-6 text-3xl font-bold text-white">Job Applications</h1>
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
      onDeleteApplication={deleteApplication}
      onToggleForm={() => setShowForm(!showForm)}
      isFormOpen={showForm}
    />
  
  </div>
  </div>
  );
}
