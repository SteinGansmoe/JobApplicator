import { Application } from "../types";

export const mockApplications: Application[] = [
    {
        id: "1",
        company: "Gjensidige",
        job_url: "https://example.com/jobs/1",
        status: "saved",
        location: "Oslo",
        position: "Software Engineer",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "2",
        company: "Sopra Steria",
        job_url: "https://example.com/jobs/2",
        status: "applied",
        location: "Drammen",
        position: "Frontend Developer",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: "3",
        company: "Intility",
        job_url: "https://example.com/jobs/3",
        status: "interview",
        location: "Asker",
        position: "Software Engineer",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }
];