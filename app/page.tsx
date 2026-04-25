"use client";
import ApplicationDetailModal from "@/components/application-detail-modal";
import ApplicationForm from "@/components/application-form";
import ApplicationList from "@/components/application-list";
import { mockApplications } from './src/mock/mockApplications';
import { Application, ApplicationStatus } from './src/types';
import { useState } from 'react';

export default function Home() {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [showForm, setShowForm] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
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
    if (selectedApplicationId === id) {
        closeDetailModal();
    }
}

const openDetailModal = (id: string) => {
    setSelectedApplicationId(id);
    requestAnimationFrame(() => {
        setIsDetailModalOpen(true);
    });
}

const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setTimeout(() => {
        setSelectedApplicationId(null);
    }, 300);
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

const selectedApplication = applications.find(
    (application) => application.id === selectedApplicationId
) ?? null;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#4c4957_0%,_#2b2931_38%,_#1c1a21_100%)] px-4 py-8">
    <div className="mx-auto max-w-[1600px]">
    <h1 className="mb-6 text-3xl font-bold text-white">Job Applications</h1>
    <div
      className={`grid transition-all duration-400 ease-out ${
        showForm
          ? "mb-6 grid-rows-[1fr] opacity-100"
          : "mb-0 grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          className={`transition-all duration-400 ease-out ${
            showForm
              ? "translate-y-0 scale-100"
              : "-translate-y-3 scale-[0.98] pointer-events-none"
          }`}
        >
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
        </div>
      </div>
    </div>
    <ApplicationList
      applications={applications}
      onDeleteApplication={deleteApplication}
      onToggleForm={() => setShowForm(!showForm)}
      isFormOpen={showForm}
      onOpenDetails={openDetailModal}
    />

    <ApplicationDetailModal
      application={selectedApplication}
      isOpen={isDetailModalOpen}
      onClose={closeDetailModal}
      onStatusChange={updateStatus}
    />
  </div>
  </div>
  );
}
